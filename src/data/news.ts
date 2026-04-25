export type NewsItem = {
  date: string;
  outlet: string;
  title: string;
  url: string;
};

// Outlet → city coordinate map for the globe view.
export const outletCity: Record<string, { lat: number; lon: number; city: string }> = {
  'Financial Times':                { lat: 51.514, lon: -0.142, city: 'London' },
  'Wired':                          { lat: 37.776, lon: -122.417, city: 'San Francisco' },
  'The Verge':                      { lat: 40.748, lon: -73.985, city: 'New York' },
  'Le Monde':                       { lat: 48.857, lon: 2.352, city: 'Paris' },
  'BBC':                            { lat: 51.518, lon: -0.144, city: 'London' },
  'National Geographic':            { lat: 38.905, lon: -77.039, city: 'Washington, DC' },
  'UW News':                        { lat: 47.6553, lon: -122.3035, city: 'Seattle' },
  'UW Geography':                   { lat: 47.6553, lon: -122.3035, city: 'Seattle' },
  'Foreign Policy':                 { lat: 38.905, lon: -77.039, city: 'Washington, DC' },
  'GeekWire':                       { lat: 47.6062, lon: -122.3321, city: 'Seattle' },
  'Seattle Times':                  { lat: 47.6062, lon: -122.3321, city: 'Seattle' },
  'King 5 / CNBC':                  { lat: 47.6062, lon: -122.3321, city: 'Seattle' },
  'TheGrio':                        { lat: 40.748, lon: -73.985, city: 'New York' },
  'The Hindu':                      { lat: 13.083, lon: 80.270, city: 'Chennai' },
  'Yahoo / TechCrunch':             { lat: 37.422, lon: -122.084, city: 'Mountain View' },
  'VOA':                            { lat: -6.200, lon: 106.846, city: 'Jakarta' },
  'Northwest Asian Weekly':         { lat: 47.6062, lon: -122.3321, city: 'Seattle' },
  'Anadolu Agency':                 { lat: 39.927, lon: 32.866, city: 'Ankara' },
  'Terra (Oregon State)':           { lat: 44.564, lon: -123.275, city: 'Corvallis' },
  'CEOAS News':                     { lat: 44.564, lon: -123.275, city: 'Corvallis' },
  'ScienceDaily · BBC World News':  { lat: 51.518, lon: -0.144, city: 'London' },
  '凤凰网 · Phoenix New Media':     { lat: 22.319, lon: 114.169, city: 'Hong Kong' },
  '华商网 · HuaShang Media':        { lat: 34.272, lon: 108.948, city: "Xi'an" },
  'Microsoft Virtual Earth':        { lat: 47.640, lon: -122.130, city: 'Redmond' },
};

export const news: NewsItem[] = [
  { date: '2026-03-09', outlet: 'Financial Times', title: 'How AI fakes are turning satellite images into war misinformation', url: 'https://www.ft.com/content/0badb6c5-bce2-4948-9d3b-164bdb55ecf4' },
  { date: '2025-06-20', outlet: 'UW Geography', title: 'Announcing Our 2025 Halmo Geography Scholars!', url: 'https://geography.washington.edu/news/2025/06/20/announcing-our-2025-halmo-geography-scholars' },
  { date: '2025-06-11', outlet: 'UW Geography', title: '2025 Awards, Honors and Achievements', url: 'https://geography.washington.edu/news/2025/06/11/2025-awards-honors-and-achievements' },
  { date: '2024-10-22', outlet: 'UW Geography', title: 'GeoAI Prompt Contest 2024', url: 'https://geography.washington.edu/news/2024/10/22/geoai-prompt-contest-2024' },
  { date: '2024-10-01', outlet: 'UW Geography', title: 'Humanistic GIS Lab Research Internship Opportunity', url: 'https://geography.washington.edu/news/2024/10/01/humanistic-gis-lab-research-internship-opportunity' },
  { date: '2024-06-10', outlet: 'UW Geography', title: '2024 Awards, Honors and Achievements', url: 'https://geography.washington.edu/news/2024/06/10/2024-awards-honors-and-achievements' },
  { date: '2023-11-16', outlet: 'UW Geography', title: 'Announcement: Winners of the GeoAI Prompt Contest', url: 'https://geography.washington.edu/news/2023/11/16/announcement-winners-geoai-prompt-contest' },
  { date: '2023-10-24', outlet: 'UW Geography', title: 'GeoAI Prompt Contest: Visioning Grand Challenges for Humanity and Earth', url: 'https://geography.washington.edu/news/2023/10/24/geoai-prompt-contest-visioning-grand-challenges-humanity-and-earth' },
  { date: '2023-05-22', outlet: 'UW Geography', title: "Thousands of Amazon staffers are pouring into its Seattle offices. Will it restore the downtown's fortunes?", url: 'https://geography.washington.edu/news/2023/05/22/thousands-amazon-staffers-are-pouring-its-seattle-offices-will-it-restore-downtowns' },
  { date: '2023-04-05', outlet: 'UW Geography', title: 'Announcing Our 2023 Halmo Geography Scholar: Kels Rizzo!', url: 'https://geography.washington.edu/news/2023/04/05/announcing-our-2023-halmo-geography-scholar-kels-rizzo' },
  { date: '2023-04-03', outlet: 'UW Geography', title: 'Humanistic GIS Lab Brings Together Students and Faculty for Innovative Research Opportunities', url: 'https://geography.washington.edu/news/2023/04/03/humanistic-gis-lab-brings-together-students-and-faculty-innovative-research' },
  { date: '2022-10-27', outlet: 'UW Geography', title: 'In 2020, consumers turned to Black-owned businesses. But where has that support gone?', url: 'https://geography.washington.edu/news/2022/10/27/2020-consumers-turned-black-owned-businesses-where-has-support-gone' },
  { date: '2022-06-15', outlet: 'UW Geography', title: '2022 Awards, Honors and Achievements', url: 'https://geography.washington.edu/news/2022/06/15/2022-awards-honors-and-achievements' },
  { date: '2022-03-25', outlet: 'UW Geography', title: 'Announcing Our 2022 Halmo Geography Scholars!', url: 'https://geography.washington.edu/news/2022/03/25/announcing-our-2022-halmo-geography-scholars' },
  { date: '2021-03-22', outlet: 'UW Geography', title: 'Announcing Our 2021 Halmo Geography Scholar: Elizabeth Theirl!', url: 'https://geography.washington.edu/news/2021/03/22/announcing-our-2021-halmo-geography-scholar-elizabeth-theirl' },
  { date: '2021-03-15', outlet: 'UW Geography', title: 'New Publications from Geography Faculty and Graduate Students!', url: 'https://geography.washington.edu/news/2021/03/15/new-publications-geography-faculty-and-graduate-students' },
  { date: '2020-12-01', outlet: 'UW Geography', title: 'First Annual GIS Day at UW Is a Resounding, Remote Success!', url: 'https://geography.washington.edu/news/2020/12/01/first-annual-gis-day-uw-resounding-remote-success' },
  { date: '2019-10-24', outlet: 'UW Geography', title: 'Introducing New Faculty in the Department of Geography', url: 'https://geography.washington.edu/news/2019/10/24/introducing-new-faculty-department-geography' },
  { date: '2022-12-07', outlet: 'TheGrio', title: "Does the 'Black-owned' label help or hurt Black businesses?", url: 'https://thegrio.com/2022/12/07/does-the-black-owned-label-help-or-hurt-black-businesses/' },
  { date: '2022-09-03', outlet: 'Seattle Times', title: 'Boost in support for Black-owned restaurants short-lived, UW study finds', url: 'https://www.seattletimes.com/seattle-news/boost-in-support-for-black-owned-restaurants-short-lived-uw-study-finds/' },
  { date: '2022-09-01', outlet: 'King 5 / CNBC', title: 'UW study finds Black-owned restaurants were disproportionately impacted during pandemic', url: 'https://www.king5.com/article/news/local/uw-study-black-owned-restaurants-disproportionately-impacted-pandemic/281-6d4a9148-e59e-45ee-adb3-8715cea49e5e' },
  { date: '2022-08-29', outlet: 'UW News', title: 'Black-owned restaurants disproportionately impacted during pandemic', url: 'https://www.washington.edu/news/2022/08/29/black-owned-restaurants-disproportionately-impacted-during-pandemic/' },
  { date: '2021-10-08', outlet: 'Le Monde', title: "Deepfakes géographiques : l'intelligence artificielle menace-t-elle la crédibilité de l'imagerie satellite ?", url: 'https://www.lemonde.fr/pixels/article/2021/10/13/deepfakes-geographiques-l-intelligence-artificielle-menace-t-elle-la-credibilite-de-l-imagerie-satellite_6098191_4408996.html' },
  { date: '2021-09-07', outlet: 'Wired', title: 'Deepfake Maps Could Really Mess with Your Sense of the World', url: 'https://www.wired.com/story/deepfake-maps-mess-sense-world' },
  { date: '2021-04-27', outlet: 'The Verge', title: 'Deepfake satellite imagery poses a not-so-distant threat, warn geographers', url: 'https://www.theverge.com/2021/4/27/22403741/deepfake-geography-satellite-imagery-ai-generated-fakes-threat' },
  { date: '2021-04-24', outlet: 'The Hindu', title: 'Question Corner: Can there be fake satellite images?', url: 'https://www.thehindu.com/sci-tech/science/fake-images/article34402185.ece' },
  { date: '2021-04-22', outlet: 'Yahoo / TechCrunch', title: 'Deepfake tech takes on satellite maps', url: 'https://news.yahoo.com/deepfake-tech-takes-satellite-maps-204612330.html' },
  { date: '2021-04-21', outlet: 'GeekWire', title: "Why 'deepfake geography' presents significant risks — and how researchers are detecting it", url: 'https://www.geekwire.com/2021/deepfake-geography-presents-significant-risks-researchers-detecting/' },
  { date: '2021-04-21', outlet: 'UW News', title: "A growing problem of 'deepfake geography': How AI falsifies satellite images", url: 'https://www.washington.edu/news/2021/04/21/a-growing-problem-of-deepfake-geography-how-ai-falsifies-satellite-images/' },
  { date: '2021-02-08', outlet: 'VOA', title: 'Deepfakes Are Getting Harder to Detect, But Reliable for Voiceovers', url: 'https://www.voaindonesia.com/a/deepfake-makin-sulit-dideteksi-tapi-diandalkan-untuk-sulih-suara-/5987413.html' },
  { date: '2020-03-26', outlet: 'Northwest Asian Weekly', title: 'UW Professor Zhao maps the coronavirus', url: 'http://nwasianweekly.com/2020/03/uw-professor-zhao-maps-the-coronavirus/' },
  { date: '2020-03-24', outlet: 'BBC', title: 'Coronavírus: os sites em tempo real que mostram dados de mortes, curvas de contágio e mutações', url: 'https://www.bbc.com/portuguese/internacional-51987873' },
  { date: '2020-03-24', outlet: 'National Geographic', title: 'Los mapas y gráficos de infección del coronavirus en todo el mundo', url: 'https://www.nationalgeographic.com.es/ciencia/mapas-y-graficos-infeccion-coronavirus-todo-mundo_15356' },
  { date: '2020-03-20', outlet: 'Anadolu Agency', title: 'Coronavirus Infection Map', url: 'https://www.aa.com.tr/en/p/coronavirus-infection-map' },
  { date: '2020-02-07', outlet: 'UW News', title: 'UW Produces Dynamic Coronavirus Map', url: 'https://www.uw.edu/news/2020/02/07/interactive-map-shows-worldwide-spread-of-coronavirus/' },
  { date: '2017-10-09', outlet: 'Terra (Oregon State)', title: 'The Great Escape: Migration spurred by rising seas could reshape the country', url: 'http://terra.oregonstate.edu/2017/10/the-great-escape' },
  { date: '2017-05-31', outlet: 'Foreign Policy', title: 'The convenient disappearance of climate change denial in China', url: 'https://foreignpolicy.com/2017/05/31/the-convenient-disappearance-of-climate-change-denial-in-china' },
  { date: '2017-04-02', outlet: 'CEOAS News', title: 'The Message in a Map', url: 'http://ceoas.oregonstate.edu/features/message' },
  { date: '2014-12-02', outlet: 'ScienceDaily · BBC World News', title: 'Fighting air pollution in China with social media', url: 'https://www.sciencedaily.com/releases/2014/12/141202120014.htm' },
  { date: '2013-10-16', outlet: '凤凰网 · Phoenix New Media', title: "西安历史地理信息系统 (Xi'an Historical Geographic Information System)", url: 'https://jakobzhao.github.io/cv/xagis.pdf' },
  { date: '2011-02-14', outlet: '华商网 · HuaShang Media', title: '微博打拐地图 (Helping Chinese child-street-beggars using web maps)', url: 'http://jakobzhao.github.io/cv/child-street-beggars' },
  { date: '2009-04-29', outlet: 'Microsoft Virtual Earth', title: 'Visualizing Swine Flu on Virtual Earth', url: 'https://blogs.msdn.microsoft.com/virtualearth/2009/04/29/visualizing-swine-flu-on-virtual-earth' },
];

export function sortedNews(): NewsItem[] {
  return [...news].sort((a, b) => b.date.localeCompare(a.date));
}
