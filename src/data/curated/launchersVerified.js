/**
 * Verified launcher overlay — web-verified specs for the strategic core (~30).
 * Merged OVER the ETL data in src/data/index.js (verified fields win, confidence
 * = 'verified'). Figures are widely-published representative values; `sources`
 * shows provenance in the confidence tooltip. Keys match ETL slug ids.
 */
export const launchersVerified = {
  // ── Europe ────────────────────────────────────────────────────────────────
  'ariane-62': {
    name: 'Ariane 6 (A62)', abbreviation: 'A62', category: 'Heavy', status: 'Operational', trl: 9,
    capLEO: 10300, capSSO: 6450, capGTO: 4500, manufacturer: 'ArianeGroup', manufacturerCountry: 'France / Germany',
    reusability: 'Expendable', maidenLaunch: '2024-07-09', priceCatalogueMUSD: 78,
    propStage1: 'Vulcain 2.1 (LOX/LH₂)', propStage2: 'Vinci (LOX/LH₂, ré-allumable)', booster: '2 × P120C (solide)',
    summary: 'Configuration 2-boosters du lanceur lourd européen. Vol inaugural VA262 le 9 juil. 2024 depuis ELA-4.',
    sources: ['ESA', 'Arianespace'],
  },
  'ariane-64': {
    name: 'Ariane 6 (A64)', abbreviation: 'A64', category: 'Heavy', status: 'Operational', trl: 9,
    capLEO: 21650, capSSO: 14900, capGTO: 11500, manufacturer: 'ArianeGroup', manufacturerCountry: 'France / Germany',
    reusability: 'Expendable', maidenLaunch: '2025', priceCatalogueMUSD: 115,
    propStage1: 'Vulcain 2.1 (LOX/LH₂)', propStage2: 'Vinci (LOX/LH₂, ré-allumable)', booster: '4 × P120C (solide)',
    summary: 'Configuration 4-boosters pour charges lourdes / GTO (ex. Galileo, Kuiper). Boosters P120C communs avec Vega-C.',
    sources: ['ESA', 'Arianespace'],
  },
  'vega-c': {
    name: 'Vega-C', category: 'Small', status: 'Operational', trl: 9,
    capLEO: 3300, capSSO: 2300, manufacturer: 'Avio', manufacturerCountry: 'Italy',
    reusability: 'Expendable', maidenLaunch: '2022-07-13', priceCatalogueMUSD: 42,
    propStage1: 'P120C (solide)', propStage2: 'Zefiro-40 (solide)', propStage3: 'Zefiro-9 (solide) + AVUM+ (liquide)',
    summary: 'Petit lanceur européen. Retour en vol déc. 2024 (Sentinel-1C). Commercialisé en direct par Avio.',
    sources: ['ESA', 'Avio'],
  },
  'vega-e': {
    name: 'Vega-E', category: 'Small', status: 'In development', trl: 6,
    capLEO: 3000, capSSO: 2600, manufacturer: 'Avio', manufacturerCountry: 'Italy',
    reusability: 'Expendable', maidenLaunch: '≈2027', propStage1: 'P120C (solide)', propStage2: 'Zefiro-40 (solide)',
    propStage3: 'M10 (LOX/méthane, ré-allumable)',
    summary: 'Évolution de Vega-C : étage supérieur méthane M10 remplaçant Zefiro-9 + AVUM. Simplification & autonomie.',
    sources: ['ESA', 'Avio'],
  },
  'maia': {
    name: 'Maia', category: 'Small', status: 'In development', trl: 6,
    capLEO: 1500, capSSO: 500, manufacturer: 'MaiaSpace', manufacturerCountry: 'France',
    reusability: 'Réutilisable (1er étage, retour propulsif)', maidenLaunch: '≈2027',
    propStage1: 'Prometheus (LOX/méthane)', summary: 'Microlanceur réutilisable (filiale ArianeGroup), depuis l’ex-pad Soyouz (ELS) au CSG. ~500 kg réutilisable / ~1,5 t en expendable.',
    sources: ['MaiaSpace', 'European Spaceflight'],
  },
  'spectrum': {
    name: 'Spectrum', category: 'Small', status: 'In development', trl: 7,
    capLEO: 1000, capSSO: 700, manufacturer: 'Isar Aerospace', manufacturerCountry: 'Germany',
    reusability: 'Expendable (récupération étudiée)', maidenLaunch: '2025-03-30 (échec)',
    propStage1: '9 × Aquila (LOX/propane)', propStage2: '1 × Aquila (vac)',
    summary: '1ᵉʳ tir orbital depuis l’Europe continentale (Andøya, 30 mars 2025, échec ~30 s). 2ᵉ vol juin 2026.',
    sources: ['Isar Aerospace', 'European Spaceflight'],
  },
  'miura-5': {
    name: 'Miura 5', category: 'Small', status: 'In development', trl: 6,
    capLEO: 1080, capSSO: 540, manufacturer: 'PLD Space', manufacturerCountry: 'Spain',
    reusability: 'Réutilisation partielle prévue', maidenLaunch: '≈2026',
    propStage1: '5 × TEPREL-C (LOX/RP-1)', propStage2: '1 × TEPREL-C (vac)',
    summary: 'Microlanceur espagnol, tir depuis le CSG (ELM/Diamant). Miura 1 suborbital réussi (2023). Levée 209 M$ (2026).',
    sources: ['PLD Space', 'Spaceflight Now'],
  },
  'rfa-one': {
    name: 'RFA ONE', category: 'Small', status: 'In development', trl: 5,
    capLEO: 1300, capSSO: 1100, manufacturer: 'Rocket Factory Augsburg', manufacturerCountry: 'Germany',
    reusability: 'Expendable', maidenLaunch: 'TBD (post-incident)', propStage1: '9 × Helix (LOX/RP-1, staged combustion)',
    summary: 'Reconstruction après l’explosion au sol de SaxaVord (août 2024). Étage à combustion étagée.',
    sources: ['RFA', 'European Spaceflight'],
  },
  'zephyr': {
    name: 'Zephyr', category: 'Small', status: 'In development', trl: 5,
    capLEO: 200, manufacturer: 'Latitude', manufacturerCountry: 'France',
    reusability: 'Expendable', maidenLaunch: '≈2026', propStage1: '9 × Navier (LOX/RP-1)',
    summary: 'Microlanceur français (Reims), tir visé depuis le CSG.', sources: ['Latitude', 'European Spaceflight'],
  },
  'prime': {
    name: 'Prime', category: 'Micro', status: 'Withdrawn', trl: 5,
    capLEO: 150, manufacturer: 'Orbex', manufacturerCountry: 'United Kingdom',
    reusability: 'Expendable', propStage1: '7 × engines (bio-propane/LOX)',
    summary: '⚠️ Orbex en redressement & retiré du European Launcher Challenge (fév. 2026).',
    sources: ['European Spaceflight'],
  },

  // ── Monde (référence / benchmark) ──────────────────────────────────────────
  'falcon-9-v1-2': {
    name: 'Falcon 9 (Block 5)', category: 'Heavy', status: 'Operational', trl: 9,
    capLEO: 22800, capGTO: 8300, manufacturer: 'SpaceX', manufacturerCountry: 'United States',
    reusability: 'Réutilisable (1er étage, ~17,4 t en réutilisable)', maidenLaunch: '2018-05-11', priceCatalogueMUSD: 70,
    propStage1: '9 × Merlin 1D (LOX/RP-1)', propStage2: '1 × Merlin Vac',
    summary: 'Référence mondiale du coût/kg et de la réutilisabilité — benchmark de compétitivité pour l’UE.',
    sources: ['SpaceX'],
  },
  'falcon-heavy': {
    name: 'Falcon Heavy', category: 'Super heavy', status: 'Operational', trl: 9,
    capLEO: 63800, capGTO: 26700, manufacturer: 'SpaceX', manufacturerCountry: 'United States',
    reusability: 'Réutilisable (boosters latéraux)', maidenLaunch: '2018-02-06', priceCatalogueMUSD: 97,
    propStage1: '27 × Merlin 1D (3 cœurs)', summary: 'Triple-corps dérivé de Falcon 9.', sources: ['SpaceX'],
  },
  'starship': {
    name: 'Starship', category: 'Super heavy', status: 'In development', trl: 6,
    capLEO: 150000, manufacturer: 'SpaceX', manufacturerCountry: 'United States',
    reusability: 'Entièrement réutilisable (objectif)', maidenLaunch: '2023-04-20 (essai)',
    propStage1: '33 × Raptor (LOX/méthane) — Super Heavy', propStage2: '6 × Raptor — Starship',
    summary: 'Lanceur super-lourd entièrement réutilisable en développement. Change l’échelle du coût/kg.',
    sources: ['SpaceX'],
  },
  'electron': {
    name: 'Electron', category: 'Micro', status: 'Operational', trl: 9,
    capLEO: 320, capSSO: 200, manufacturer: 'Rocket Lab', manufacturerCountry: 'United States / NZ',
    reusability: 'Récupération partielle (étudiée)', maidenLaunch: '2017-05-25', priceCatalogueMUSD: 8,
    propStage1: '9 × Rutherford (LOX/RP-1, pompes électriques)', summary: 'Microlanceur de référence du marché smallsat.',
    sources: ['Rocket Lab'],
  },
  'neutron': {
    name: 'Neutron', category: 'Medium', status: 'In development', trl: 6,
    capLEO: 13000, manufacturer: 'Rocket Lab', manufacturerCountry: 'United States',
    reusability: 'Réutilisable (1er étage)', maidenLaunch: '≈2025-26', propStage1: '9 × Archimedes (LOX/méthane)',
    summary: 'Lanceur médium réutilisable concurrent direct de Falcon 9.', sources: ['Rocket Lab'],
  },
  'new-glenn': {
    name: 'New Glenn', category: 'Heavy', status: 'Operational', trl: 9,
    capLEO: 45000, capGTO: 13000, manufacturer: 'Blue Origin', manufacturerCountry: 'United States',
    reusability: 'Réutilisable (1er étage)', maidenLaunch: '2025-01-16', propStage1: '7 × BE-4 (LOX/méthane)',
    summary: 'Lanceur lourd réutilisable de Blue Origin. Vol inaugural janv. 2025.', sources: ['Blue Origin'],
  },
  'vulcan': {
    name: 'Vulcan Centaur', category: 'Heavy', status: 'Operational', trl: 9,
    capLEO: 27200, capGTO: 14000, manufacturer: 'ULA', manufacturerCountry: 'United States',
    reusability: 'Expendable', maidenLaunch: '2024-01-08', propStage1: '2 × BE-4 (LOX/méthane) + 0-6 GEM-63XL',
    propStage2: 'Centaur V (LOX/LH₂)', summary: 'Lanceur lourd ULA (remplace Atlas V / Delta IV).', sources: ['ULA'],
  },
  'long-march-5': {
    name: 'Long March 5', category: 'Heavy', status: 'Operational', trl: 9,
    capLEO: 25000, capGTO: 14000, manufacturer: 'CASC', manufacturerCountry: 'China',
    reusability: 'Expendable', maidenLaunch: '2016-11-03', propStage1: '2 × YF-77 (LOX/LH₂) + 4 boosters YF-100 (kérolox)',
    summary: 'Lanceur lourd chinois (stations, sondes lunaires/martiennes).', sources: ['CNSA'],
  },
  'long-march-8': {
    name: 'Long March 8', category: 'Medium', status: 'Operational', trl: 9,
    capLEO: 8100, capSSO: 5000, manufacturer: 'CASC', manufacturerCountry: 'China',
    reusability: 'Réutilisation prévue', maidenLaunch: '2020-12-22', propStage1: 'YF-100 (kérolox) + 2 boosters',
    summary: 'Lanceur médium chinois pour constellations (Guowang/Qianfan).', sources: ['CNSA'],
  },
  'h3': {
    id: 'h3', name: 'H3', category: 'Heavy', status: 'Operational', trl: 9, isEU: false,
    capLEO: 11900, capGTO: 6500, manufacturer: 'MHI / JAXA', manufacturerCountry: 'Japan',
    reusability: 'Expendable', maidenLaunch: '2023 (1er échec) / 2024 (succès)',
    propStage1: '2-3 × LE-9 (LOX/LH₂) + 0-4 SRB-3', summary: 'Lanceur lourd japonais, successeur de H-IIA.', sources: ['JAXA'],
  },
  'lvm3': {
    id: 'lvm3', name: 'LVM3 (GSLV Mk III)', category: 'Heavy', status: 'Operational', trl: 9, isEU: false,
    capLEO: 10000, capGTO: 4000, manufacturer: 'ISRO', manufacturerCountry: 'India',
    reusability: 'Expendable', maidenLaunch: '2017-06-05', propStage1: '2 × S200 (solide) + L110 (hypergolique)',
    propStage2: 'C25 (LOX/LH₂)', summary: 'Lanceur lourd indien (Chandrayaan-3, Gaganyaan). Coût très compétitif.', sources: ['ISRO'],
  },
  'pslv-xl': {
    id: 'pslv-xl', name: 'PSLV-XL', category: 'Medium', status: 'Operational', trl: 9, isEU: false,
    capLEO: 3800, capSSO: 1750, manufacturer: 'ISRO', manufacturerCountry: 'India',
    reusability: 'Expendable', maidenLaunch: '2008', propStage1: 'S139 (solide) + 6 PSOM-XL (solide)',
    summary: 'Cheval de bataille indien — alternance étages solides/liquides, coût très bas.', sources: ['ISRO'],
  },
  'soyuz': {
    name: 'Soyuz-2', category: 'Medium', status: 'Operational', trl: 9,
    capLEO: 8200, capGTO: 3250, manufacturer: 'Progress / Roscosmos', manufacturerCountry: 'Russia',
    reusability: 'Expendable', maidenLaunch: '2004', propStage1: 'RD-107A/108A (LOX/kérosène)',
    summary: 'Lanceur médium russe. Plus tiré depuis le CSG (arrêt 2022, ex-pad ELS repris par MaiaSpace).',
    sources: ['Roscosmos'],
  },
};
