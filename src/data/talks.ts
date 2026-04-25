// Curated invited talks / keynotes with venue coordinates.
// Sourced from CV (Invited Talks, Keynotes & Presentations).

export type Talk = {
  year: number;
  title: string;
  host: string;
  place: string;
  lat: number;
  lon: number;
};

export const talks: Talk[] = [
  { year: 2025, title: 'Humanistic GIS Revisited: Digital Mindfulness, Ethics of Care, and Posthuman Cartographies', host: 'Oklahoma State University', place: 'Stillwater, OK', lat: 36.117, lon: -97.058 },
  { year: 2025, title: '人文主义GIS再出发', host: 'Guangzhou Institute of Geography, CAS', place: 'Guangzhou, China', lat: 23.129, lon: 113.264 },
  { year: 2025, title: 'Digital Twins Literacy', host: 'Harvard Center for Geographic Analysis', place: 'Cambridge, MA', lat: 42.374, lon: -71.118 },
  { year: 2025, title: 'Humanistic GIS: Theories, Care Ethics, and Practices', host: 'Seattle University', place: 'Seattle, WA', lat: 47.609, lon: -122.318 },
  { year: 2025, title: 'Humanistic GIS: Theories, Care Ethics, and Practices', host: 'TU Dortmund', place: 'Dortmund, Germany', lat: 51.514, lon: 7.466 },
  { year: 2025, title: 'Humanistic GIS', host: 'USC Spatial Science Institute', place: 'Los Angeles, CA', lat: 34.022, lon: -118.286 },
  { year: 2024, title: 'Five Dimensions of GeoAI Uncertainty and Ethical Considerations', host: 'University of Vienna', place: 'Vienna, Austria', lat: 48.210, lon: 16.372 },
  { year: 2024, title: 'Five Dimensions of GeoAI Uncertainty', host: 'Harvard Center for Geographic Analysis', place: 'Cambridge, MA', lat: 42.374, lon: -71.118 },
  { year: 2024, title: 'Humanistic Rewire of GIS', host: 'Shenzhen University', place: 'Shenzhen, China', lat: 22.541, lon: 114.057 },
  { year: 2024, title: 'Humanistic Rewire of GIS', host: 'Hong Kong University', place: 'Hong Kong', lat: 22.284, lon: 114.137 },
  { year: 2023, title: 'GeoAI and Digital Resilience (panel)', host: 'National Academies', place: 'Washington, DC', lat: 38.895, lon: -77.037 },
  { year: 2023, title: 'Humanistic GIS: Towards a Research Agenda', host: 'Penn State', place: 'State College, PA', lat: 40.793, lon: -77.860 },
  { year: 2023, title: 'A Glimpse into Digital Twins', host: 'ASU SPARC', place: 'Tempe, AZ', lat: 33.428, lon: -111.940 },
  { year: 2022, title: 'Ethics in Mapping (Plenary Panel)', host: 'CaGIS AutoCarto', place: 'Redlands, CA', lat: 34.056, lon: -117.183 },
  { year: 2022, title: 'Humanistic GIS', host: 'University of Tennessee', place: 'Knoxville, TN', lat: 35.957, lon: -83.920 },
  { year: 2022, title: 'Crypto Place', host: 'University of Melbourne', place: 'Parkville, Australia', lat: -37.798, lon: 144.961 },
  { year: 2022, title: 'Geoprivacy and Deepfake Geography', host: 'University of Connecticut', place: 'Storrs, CT', lat: 41.808, lon: -72.250 },
  { year: 2022, title: 'Humanistic GIS', host: 'SUNY Binghamton', place: 'Binghamton, NY', lat: 42.089, lon: -75.969 },
  { year: 2021, title: 'Humanistic GIS', host: 'Simon Fraser University', place: 'Burnaby, BC', lat: 49.279, lon: -122.917 },
  { year: 2021, title: 'Deepfake Geography: When AI Encounters Geospatial Data', host: 'Seoul National University', place: 'Seoul, South Korea', lat: 37.460, lon: 126.952 },
  { year: 2019, title: 'Humanistic GIS', host: 'George Mason University', place: 'Fairfax, VA', lat: 38.831, lon: -77.310 },
  { year: 2018, title: 'Humanistic GIS: Towards a Research Agenda', host: 'University of Oregon', place: 'Eugene, OR', lat: 44.045, lon: -123.072 },
  { year: 2015, title: 'Trojan horse, geo-piracy, and cyber-espionage', host: 'Harvard Center for Geographic Analysis', place: 'Cambridge, MA', lat: 42.374, lon: -71.118 },
  { year: 2015, title: 'Location spoofing in social media', host: 'Nanjing University', place: 'Nanjing, China', lat: 32.060, lon: 118.796 },
  { year: 2015, title: 'Location spoofing', host: 'Chinese Academy of Sciences IGSNRR', place: 'Beijing, China', lat: 39.904, lon: 116.407 },
];
