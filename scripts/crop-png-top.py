#!/usr/bin/env python3
"""Top-crop a PNG to a target width and height using only stdlib.

Usage:
    crop-png-top.py <input.png> <output.png> <target_w> <target_h>

Why this exists: macOS sips's `--cropOffset` fills out-of-bounds areas
with black, which leaves a black band at the top of our thumbnails.
This script reconstructs the top N rows of a non-interlaced 8-bit
RGB/RGBA PNG and writes a clean cropped PNG with no fill.
"""
import sys
import struct
import zlib


def paeth(a, b, c):
    p = a + b - c
    pa, pb, pc = abs(p - a), abs(p - b), abs(p - c)
    if pa <= pb and pa <= pc:
        return a
    if pb <= pc:
        return b
    return c


def crop_top(src_path, dst_path, target_w, target_h):
    with open(src_path, 'rb') as f:
        data = f.read()

    sig = data[:8]
    assert sig == b'\x89PNG\r\n\x1a\n', f'not a PNG: {src_path}'

    # IHDR
    assert data[12:16] == b'IHDR'
    w, h, bit_depth, color_type, comp, filt, interlace = struct.unpack('>IIBBBBB', data[16:29])
    bpp = {0: 1, 2: 3, 3: 1, 4: 2, 6: 4}[color_type]
    assert bit_depth == 8 and interlace == 0, 'only 8-bit non-interlaced supported'
    assert target_w <= w and target_h <= h, f'crop exceeds source: {target_w}x{target_h} > {w}x{h}'

    # Concatenate IDAT chunks
    idat = b''
    i = 8
    while i < len(data):
        length = struct.unpack('>I', data[i:i+4])[0]
        ctype = data[i+4:i+8]
        if ctype == b'IDAT':
            idat += data[i+8:i+8+length]
        if ctype == b'IEND':
            break
        i += 8 + length + 4

    raw = zlib.decompress(idat)
    row_size = 1 + w * bpp

    # Reconstruct only the top target_h rows (defiltered)
    prev = bytearray(w * bpp)
    out_rows = []
    for y in range(target_h):
        s = y * row_size
        filt_byte = raw[s]
        line = raw[s+1:s+1+w*bpp]
        cur = bytearray(w * bpp)
        for x in range(w * bpp):
            a = cur[x-bpp] if x >= bpp else 0
            b = prev[x]
            c = prev[x-bpp] if x >= bpp else 0
            v = line[x]
            if filt_byte == 0:   cur[x] = v
            elif filt_byte == 1: cur[x] = (v + a) & 0xff
            elif filt_byte == 2: cur[x] = (v + b) & 0xff
            elif filt_byte == 3: cur[x] = (v + (a + b) // 2) & 0xff
            elif filt_byte == 4: cur[x] = (v + paeth(a, b, c)) & 0xff
        prev = cur
        out_rows.append(cur)

    # Re-emit with all rows using filter type 0 (None) — encoder is simple,
    # zlib still compresses well enough for thumbnails.
    new_raw = b''.join(b'\x00' + bytes(r[:target_w * bpp]) for r in out_rows)

    def chunk(t, d):
        cs = zlib.crc32(t + d)
        return struct.pack('>I', len(d)) + t + d + struct.pack('>I', cs)

    ihdr = struct.pack('>IIBBBBB', target_w, target_h, 8, color_type, 0, 0, 0)
    idat_out = zlib.compress(new_raw, 6)
    out = sig + chunk(b'IHDR', ihdr) + chunk(b'IDAT', idat_out) + chunk(b'IEND', b'')
    with open(dst_path, 'wb') as f:
        f.write(out)


if __name__ == '__main__':
    if len(sys.argv) != 5:
        print(__doc__, file=sys.stderr)
        sys.exit(1)
    crop_top(sys.argv[1], sys.argv[2], int(sys.argv[3]), int(sys.argv[4]))
