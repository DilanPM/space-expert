/**
 * Curated space statistics — web-verified (début 2026). Sources : ESA, KeepTrack,
 * Orbital Radar, WorldAtlas. Les chiffres "DB interne" (Excel) sont datés ;
 * on affiche les deux avec leur badge de fiabilité.
 */

export const satPopulation = {
  totalActive: 14500, confidence: 'verified', sources: ['ESA', 'Orbital Radar (2026)'],
  note: '≈ 14 500 satellites actifs (début 2026) — dominé par les méga-constellations.',
};

// Répartition par orbite (actifs, ordre de grandeur 2026)
export const byOrbit = [
  { key: 'LEO', label: 'LEO (orbite basse)', value: 13200, color: '#60a5fa', note: '≈ 88 % — Starlink, OneWeb, Kuiper' },
  { key: 'MEO', label: 'MEO (navigation)', value: 150, color: '#fbbf24', note: 'GPS, Galileo (30), GLONASS, BeiDou' },
  { key: 'GEO', label: 'GEO (géostationnaire)', value: 600, color: '#34d399', note: 'Télécom, météo, broadcast' },
  { key: 'HEO', label: 'HEO / autres', value: 550, color: '#a78bfa', note: 'Scientifique, Molniya…' },
];

// Par opérateur / constellation (actifs)
export const byOperator = [
  { key: 'Starlink', value: 10400, color: '#60a5fa', confidence: 'verified', note: '≈ 69 % de tous les satellites actifs' },
  { key: 'OneWeb', value: 650, color: '#34d399' },
  { key: 'Kuiper (Amazon)', value: 300, color: '#fbbf24', note: 'En déploiement (Ariane 6, Atlas, F9)' },
  { key: 'Autres (US gov/com)', value: 1200, color: '#f472b6' },
  { key: 'Chine', value: 1000, color: '#ef4444' },
  { key: 'Reste du monde', value: 950, color: '#94a3b8' },
];

// Par type d'application (ordre de grandeur ; Com dominé par Starlink)
export const byType = [
  { key: 'Communications', value: 11500, color: '#60a5fa' },
  { key: 'Observation Terre', value: 1500, color: '#34d399' },
  { key: 'Tech / démo', value: 800, color: '#a78bfa' },
  { key: 'Navigation', value: 150, color: '#fbbf24' },
  { key: 'Science', value: 200, color: '#f472b6' },
  { key: 'Militaire', value: 350, color: '#ef4444' },
];

export const debris = {
  confidence: 'verified', sources: ['ESA Space Debris Office'],
  tiers: [
    { size: '> 10 cm', count: '≈ 36 000', note: 'Suivis & catalogués (DISCOS)' },
    { size: '1 – 10 cm', count: '≈ 1 000 000', note: 'Estimés — non suivis individuellement' },
    { size: '< 1 cm', count: '≈ 130 000 000', note: 'Estimés' },
  ],
};

// EU constellations institutionnelles (vérifié)
export const euConstellations = [
  { name: 'Galileo', orbit: 'MEO (23 222 km)', count: '31 sat. (≈30 actifs)', use: 'Navigation (PNT)', status: 'Opérationnel', note: '1er lancement sur Ariane 6 (VA266, déc. 2025).', confidence: 'verified', sources: ['ESA', 'EUSPA'] },
  { name: 'Copernicus (Sentinels)', orbit: 'LEO / SSO', count: '~10+ satellites', use: 'Observation de la Terre', status: 'Opérationnel', note: 'Sentinel-1/2/3/4/5/6 ; lancés sur Vega-C / Ariane 6.', confidence: 'verified', sources: ['ESA', 'Copernicus'] },
  { name: 'EGNOS', orbit: 'GEO', count: '3 GEO', use: 'Augmentation Galileo/GPS', status: 'Opérationnel', confidence: 'verified', sources: ['EUSPA'] },
  { name: 'GOVSATCOM', orbit: 'multi', count: 'pooling', use: 'Comm. gouvernementales sécurisées', status: 'En déploiement', confidence: 'verified', sources: ['EUSPA'] },
  { name: 'IRIS²', orbit: 'LEO (264) + MEO (18)', count: '≈ 290 satellites', use: 'Connectivité sécurisée souveraine', status: 'En développement', note: '≈ 10,6 Md€ · consortium SpaceRISE · 1er lancement ~2029, complet ~2030.', confidence: 'verified', sources: ['EC', 'European Spaceflight'] },
];
