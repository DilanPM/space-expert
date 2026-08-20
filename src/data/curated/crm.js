/**
 * CRM — Critical Raw Materials for the European space & defence industries.
 *
 * Base = table fournie par l'utilisateur (DG DEFIS), tagguée `internalDB` (« peut être
 * fausse »). Faits web-vérifiés (juil. 2026) remontés à `verified` + sources :
 *   - CRMA (Règlement (UE) 2024/1252) : objectifs 2030 10/40/25 %, ≤65 % pays tiers.
 *   - Chine : >80 % transformation terres rares, ~90 % aimants, >90 % gallium ;
 *     contrôles export Ga/Ge (déc. 2024), 7 TR moyennes/lourdes (avr. 2025), régime
 *     0,1 %/licences techno (oct. 2025, suspendu partiellement).
 *   - Niobium : Brésil (CBMM) ~85-90 % de l'offre mondiale.
 * Les parts (%) fines non re-vérifiées restent `internalDB` / `⚠ à confirmer`.
 *
 * `dominantCountry` = source la plus critique (goulot) → sert d'agrégat pour la carte.
 * La table/fiche montrent le sourcing complet par stade (raw / processed / advanced).
 */

// ── Pays sources : nom world-atlas (property.name) + centroïde [lon,lat] + bloc ──────
export const CRM_COUNTRY = {
  China:         { name: 'Chine',        iso2: 'cn', centroid: [104, 35],   bloc: 'competitor' },
  'United States of America': { name: 'États-Unis', iso2: 'us', centroid: [-98, 39], bloc: 'ally' },
  Brazil:        { name: 'Brésil',       iso2: 'br', centroid: [-51, -10],  bloc: 'partner' },
  Japan:         { name: 'Japon',        iso2: 'jp', centroid: [138, 37],   bloc: 'ally' },
  'Dem. Rep. Congo': { name: 'RD Congo', iso2: 'cd', centroid: [23, -2],    bloc: 'risk' },
  Rwanda:        { name: 'Rwanda',       iso2: 'rw', centroid: [29.9, -1.9], bloc: 'risk' },
  Kazakhstan:    { name: 'Kazakhstan',   iso2: 'kz', centroid: [67, 48],    bloc: 'partner' },
  Indonesia:     { name: 'Indonésie',    iso2: 'id', centroid: [117, -2],   bloc: 'partner' },
  Australia:     { name: 'Australie',    iso2: 'au', centroid: [134, -25],  bloc: 'ally' },
  Canada:        { name: 'Canada',       iso2: 'ca', centroid: [-106, 56],  bloc: 'ally' },
  Chile:         { name: 'Chili',        iso2: 'cl', centroid: [-71, -35],  bloc: 'partner' },
  France:        { name: 'France',       iso2: 'fr', centroid: [2.5, 46.5], bloc: 'eu' },
  Germany:       { name: 'Allemagne',    iso2: 'de', centroid: [10.4, 51.2], bloc: 'eu' },
  Vietnam:       { name: 'Vietnam',      iso2: 'vn', centroid: [106, 16],   bloc: 'partner' },
  Myanmar:       { name: 'Myanmar',      iso2: 'mm', centroid: [96, 21],    bloc: 'risk' },
  'South Korea': { name: 'Corée du Sud', iso2: 'kr', centroid: [127.8, 36.5], bloc: 'ally' },
  Taiwan:        { name: 'Taïwan',       iso2: 'tw', centroid: [121, 23.7], bloc: 'ally' },
};

export const BLOC_LABEL = {
  competitor: 'Concurrent stratégique', ally: 'Allié', partner: 'Partenaire',
  risk: 'Zone à risque (gouvernance/conflit)', eu: 'UE',
};

// ── CRMA — cadre décisionnel (web-vérifié) ──────────────────────────────────────────
export const crmaBenchmarks = {
  reg: 'Règlement (UE) 2024/1252 (CRMA)',
  inForce: 'en vigueur mai 2024',
  extraction: 10, processing: 40, recycling: 25, singleCountryCap: 65,
  note: "Objectifs 2030 pour la conso annuelle UE ; le règlement cite explicitement « défense et espace ».",
  confidence: 'verified',
  refs: ['Commission européenne — CRMA', 'Règlement (UE) 2024/1252'],
};

// ── Matériaux ───────────────────────────────────────────────────────────────────────
export const crmMaterials = [
  {
    id: 'ti-aero', name: 'Alliages de titane aérospatial', symbol: 'Ti', category: 'Structure',
    strategicRelevance: 'Structures d’avions, lanceurs, satellites, systèmes navals.',
    launcherUse: 'Réservoirs, structures primaires, fixations haute tenue.',
    satelliteUse: 'Structures, réservoirs, éléments mécaniques.',
    supplyRisk: 'Toute rupture affecte fortement la production aéro/défense.',
    riskLevel: 'high',
    importDependency: 'Minerai : Kazakhstan. Éponge de titane : Japon. Alliages/semi-produits : Japon (historiquement Russie).',
    dominantCountry: 'Japan', dominantShare: null,
    sources: {
      raw: [{ country: 'Kazakhstan' }],
      processed: [{ country: 'Japan', note: 'éponge de titane' }],
      advanced: [{ country: 'Japan' }, { country: 'United States of America' }],
    },
    crmaListed: true, confidence: 'internalDB', refs: ['DB interne DG DEFIS'],
  },
  {
    id: 'carbon-fibre', name: 'Fibres de carbone (qualité aérospatiale)', symbol: 'C', category: 'Structure',
    strategicRelevance: 'Avions, missiles, satellites, réservoirs sous pression.',
    launcherUse: 'Coiffes, structures composites, carters de moteurs à propergol solide.',
    satelliteUse: 'Panneaux, structures composites légères, réflecteurs.',
    supplyRisk: 'Très peu de producteurs qualifiés dans le monde.',
    riskLevel: 'critical',
    importDependency: 'Advanced : Japon (>50 % de la capacité mondiale qualité aéro). Dépendance secondaire : États-Unis.',
    dominantCountry: 'Japan', dominantShare: 50,
    sources: {
      raw: [], processed: [{ country: 'Japan' }],
      advanced: [{ country: 'Japan', share: 50 }, { country: 'United States of America' }],
    },
    crmaListed: false, confidence: 'internalDB', refs: ['DB interne DG DEFIS'],
  },
  {
    id: 'prepregs', name: 'Préimprégnés composites (prepregs)', symbol: '—', category: 'Structure',
    strategicRelevance: 'Composites haute performance défense & aérospatial.',
    launcherUse: 'Coiffes, inter-étages, structures composites.',
    satelliteUse: 'Structures, bras, panneaux composites.',
    supplyRisk: 'Exigences de certification → changement de fournisseur très difficile.',
    riskLevel: 'high',
    importDependency: 'Advanced : États-Unis et Japon dominent la production de prepregs aéro haut de gamme.',
    dominantCountry: 'United States of America', dominantShare: null,
    sources: { raw: [], processed: [], advanced: [{ country: 'United States of America' }, { country: 'Japan' }] },
    crmaListed: false, confidence: 'internalDB', refs: ['DB interne DG DEFIS'],
  },
  {
    id: 'ni-superalloys', name: 'Superalliages base nickel', symbol: 'Ni', category: 'Propulsion',
    strategicRelevance: 'Turboréacteurs, turbines à gaz, moteurs-fusées.',
    launcherUse: 'Turbopompes, chambres de combustion, pièces chaudes moteurs.',
    satelliteUse: 'Propulsion, éléments à haute température.',
    supplyRisk: 'Indispensable au fonctionnement haute température ; substitution difficile.',
    riskLevel: 'high',
    importDependency: 'Minerai (nickel) : Indonésie, Australie, Canada. Superalliages : États-Unis & producteurs UE.',
    dominantCountry: 'Indonesia', dominantShare: null,
    sources: {
      raw: [{ country: 'Indonesia', note: 'nickel' }, { country: 'Australia' }, { country: 'Canada' }],
      processed: [{ country: 'United States of America' }],
      advanced: [{ country: 'United States of America' }],
    },
    crmaListed: true, confidence: 'internalDB', refs: ['DB interne DG DEFIS'],
  },
  {
    id: 'rhenium', name: 'Rhénium', symbol: 'Re', category: 'Propulsion',
    strategicRelevance: 'Aubes de turbine, propulsion avancée.',
    launcherUse: 'Superalliages monocristallins des pièces chaudes.',
    satelliteUse: 'Propulsion (tuyères, injecteurs haute température).',
    supplyRisk: 'Extrêmement rare, souvent sous-produit (cuivre/molybdène).',
    riskLevel: 'high',
    importDependency: 'Minerai : Chili, États-Unis, Kazakhstan. Transformation : États-Unis.',
    dominantCountry: 'Chile', dominantShare: null,
    sources: {
      raw: [{ country: 'Chile' }, { country: 'United States of America' }, { country: 'Kazakhstan' }],
      processed: [{ country: 'United States of America' }], advanced: [],
    },
    crmaListed: false, confidence: 'internalDB', refs: ['DB interne DG DEFIS'],
  },
  {
    id: 'hafnium', name: 'Hafnium', symbol: 'Hf', category: 'Propulsion',
    strategicRelevance: 'Moteurs-fusées, hypersonique, systèmes nucléaires & spatiaux.',
    launcherUse: 'Alliages réfractaires, revêtements de tuyères.',
    satelliteUse: 'Électronique durcie, éléments haute température.',
    supplyRisk: 'Marché mondial très petit et concentré.',
    riskLevel: 'high',
    importDependency: 'Minerai : France, États-Unis. Métal hafnium : États-Unis & Chine. (Atout UE : la France est un producteur notable via le zirconium.)',
    dominantCountry: 'United States of America', dominantShare: null,
    sources: {
      raw: [{ country: 'France' }, { country: 'United States of America' }],
      processed: [{ country: 'United States of America' }, { country: 'China' }], advanced: [],
    },
    crmaListed: false, confidence: 'internalDB', refs: ['DB interne DG DEFIS'],
  },
  {
    id: 'niobium', name: 'Niobium', symbol: 'Nb', category: 'Propulsion',
    strategicRelevance: 'Superalliages aérospatiaux, systèmes de lanceurs, aciers avancés.',
    launcherUse: 'Superalliages (pièces chaudes), aciers HSLA de structure.',
    satelliteUse: 'Alliages haute température, condensateurs (Nb).',
    supplyRisk: 'Structure de production quasi-monopolistique — aucune alternative réaliste à court/moyen terme pour l’UE.',
    riskLevel: 'critical',
    importDependency: 'Minerai : Brésil (>85 % de l’offre mondiale). Ferroniobium transformé : Brésil (CBMM).',
    dominantCountry: 'Brazil', dominantShare: 85,
    sources: {
      raw: [{ country: 'Brazil', share: 85 }], processed: [{ country: 'Brazil' }], advanced: [],
    },
    crmaListed: true, confidence: 'verified', refs: ['IEA — Critical Minerals', 'USGS'],
  },
  {
    id: 'tantalum', name: 'Tantale', symbol: 'Ta', category: 'Électronique-RF',
    strategicRelevance: 'Condensateurs, systèmes de guidage, satellites.',
    launcherUse: 'Électronique avionique, condensateurs haute fiabilité.',
    satelliteUse: 'Condensateurs Ta, électronique de charge utile.',
    supplyRisk: 'Exposé à l’instabilité géopolitique et à la concentration du raffinage (minerais de conflit).',
    riskLevel: 'high',
    importDependency: 'Minerai : Rwanda et RD Congo. Poudres/produits transformés : Chine.',
    dominantCountry: 'China', dominantShare: null,
    sources: {
      raw: [{ country: 'Rwanda' }, { country: 'Dem. Rep. Congo' }],
      processed: [{ country: 'China' }], advanced: [],
    },
    crmaListed: true, confidence: 'internalDB', refs: ['DB interne DG DEFIS'],
  },
  {
    id: 'beryllium', name: 'Béryllium', symbol: 'Be', category: 'Optique-capteurs',
    strategicRelevance: 'Miroirs de satellites, capteurs, systèmes de visée.',
    launcherUse: 'Structures légères de guidage (limité).',
    satelliteUse: 'Miroirs optiques (télescopes spatiaux), structures ultra-rigides.',
    supplyRisk: 'Très peu de producteurs qualifiés et permis environnementaux difficiles.',
    riskLevel: 'high',
    importDependency: 'Minerai et matériau transformé : États-Unis.',
    dominantCountry: 'United States of America', dominantShare: null,
    sources: { raw: [{ country: 'United States of America' }], processed: [{ country: 'United States of America' }], advanced: [] },
    crmaListed: false, confidence: 'internalDB', refs: ['DB interne DG DEFIS'],
  },
  {
    id: 'gallium', name: 'Gallium', symbol: 'Ga', category: 'Électronique-RF',
    strategicRelevance: 'Semi-conducteurs GaN, radars, communications satellites.',
    launcherUse: 'Électronique de commande (limité).',
    satelliteUse: 'Cellules solaires GaAs, amplificateurs RF, charges utiles télécom.',
    supplyRisk: 'Les restrictions à l’export peuvent affecter très vite la production défense.',
    riskLevel: 'critical',
    importDependency: 'Gallium métal transformé : Chine (>90 %). Wafers/composants GaN avancés : États-Unis, Taïwan, Europe.',
    dominantCountry: 'China', dominantShare: 90,
    sources: {
      raw: [], processed: [{ country: 'China', share: 90 }],
      advanced: [{ country: 'United States of America' }, { country: 'Taiwan' }],
    },
    crmaListed: true, confidence: 'verified', refs: ['IEA', 'Parlement européen — contrôles export Chine (2025)'],
  },
  {
    id: 'germanium', name: 'Germanium', symbol: 'Ge', category: 'Optique-capteurs',
    strategicRelevance: 'Optiques infrarouges, vision nocturne, capteurs spatiaux.',
    launcherUse: 'Optiques de suivi (limité).',
    satelliteUse: 'Substrat des cellules solaires triple-jonction, optiques IR d’observation.',
    supplyRisk: 'Raffinage concentré dans un petit nombre de pays ; sous contrôle export chinois.',
    riskLevel: 'critical',
    importDependency: 'Germanium transformé : Chine (>60 %). Optiques IR avancées : Allemagne, États-Unis, France.',
    dominantCountry: 'China', dominantShare: 60,
    sources: {
      raw: [], processed: [{ country: 'China', share: 60 }],
      advanced: [{ country: 'Germany' }, { country: 'United States of America' }, { country: 'France' }],
    },
    crmaListed: true, confidence: 'verified', refs: ['IEA', 'Parlement européen — contrôles export Chine (2025)'],
  },
  {
    id: 'indium', name: 'Indium', symbol: 'In', category: 'Électronique-RF',
    strategicRelevance: 'Électronique, optoélectronique, capteurs.',
    launcherUse: 'Électronique (limité).',
    satelliteUse: 'ITO (revêtements conducteurs), détecteurs, optoélectronique.',
    supplyRisk: 'Offre en sous-produit → faible flexibilité.',
    riskLevel: 'high',
    importDependency: 'Indium transformé : Chine. Composés/composants avancés : Corée du Sud, Japon.',
    dominantCountry: 'China', dominantShare: null,
    sources: {
      raw: [], processed: [{ country: 'China' }],
      advanced: [{ country: 'South Korea' }, { country: 'Japan' }],
    },
    crmaListed: false, confidence: 'internalDB', refs: ['DB interne DG DEFIS'],
  },
  {
    id: 'sic', name: 'Carbure de silicium (SiC)', symbol: 'SiC', category: 'Électronique-RF',
    strategicRelevance: 'Électronique de puissance des radars, satellites, véhicules militaires.',
    launcherUse: 'Électronique de puissance (avionique).',
    satelliteUse: 'Électronique de puissance, gestion thermique, miroirs SiC.',
    supplyRisk: 'La croissance de la demande dépasse la capacité de substrats de haute qualité.',
    riskLevel: 'high',
    importDependency: 'Substrats/wafers avancés : États-Unis. Matériaux transformés : Chine.',
    dominantCountry: 'United States of America', dominantShare: null,
    sources: {
      raw: [], processed: [{ country: 'China' }], advanced: [{ country: 'United States of America' }],
    },
    crmaListed: false, confidence: 'internalDB', refs: ['DB interne DG DEFIS'],
  },
  {
    id: 'gan', name: 'Nitrure de gallium (GaN)', symbol: 'GaN', category: 'Électronique-RF',
    strategicRelevance: 'Radars AESA, guerre électronique, communication satellite.',
    launcherUse: 'Électronique RF (limité).',
    satelliteUse: 'Amplificateurs de puissance RF, charges utiles télécom, radars embarqués.',
    supplyRisk: 'Capacité de fabrication avancée concentrée ; matière première gallium chinoise.',
    riskLevel: 'high',
    importDependency: 'Matière première gallium : Chine. Composants GaN avancés : États-Unis et Taïwan.',
    dominantCountry: 'United States of America', dominantShare: null,
    sources: {
      raw: [{ country: 'China', note: 'gallium' }], processed: [],
      advanced: [{ country: 'United States of America' }, { country: 'Taiwan' }],
    },
    crmaListed: false, confidence: 'internalDB', refs: ['DB interne DG DEFIS'],
  },
  {
    id: 'ree-magnets', name: 'Terres rares (Nd, Pr, Dy, Tb)', symbol: 'REE', category: 'Aimants',
    strategicRelevance: 'Aimants permanents pour missiles, avions, satellites — l’une des plus grandes vulnérabilités stratégiques de l’Europe.',
    launcherUse: 'Actionneurs, moteurs de vannes, TVC (vérins électromécaniques).',
    satelliteUse: 'Roues à réaction / CMG, actionneurs, moteurs de mécanismes.',
    supplyRisk: 'Domination chinoise à tous les stades ; recyclage encore très limité en Europe. Sous contrôle export (avr./oct. 2025).',
    riskLevel: 'critical',
    importDependency: 'Minerais : Chine et Myanmar (surtout terres rares lourdes). Oxydes/métaux transformés : Chine. Aimants avancés : Chine (>85 %).',
    dominantCountry: 'China', dominantShare: 85,
    sources: {
      raw: [{ country: 'China' }, { country: 'Myanmar', note: 'TR lourdes' }],
      processed: [{ country: 'China' }],
      advanced: [{ country: 'China', share: 85, note: 'aimants permanents' }],
    },
    crmaListed: true, confidence: 'verified', refs: ['IEA', 'Parlement européen (2025)', 'Commission — CRMA'],
  },
  {
    id: 'samarium', name: 'Samarium', symbol: 'Sm', category: 'Aimants',
    strategicRelevance: 'Aimants permanents haute température (SmCo).',
    launcherUse: 'Actionneurs haute température.',
    satelliteUse: 'Aimants SmCo (moteurs, capteurs) stables en température.',
    supplyRisk: 'Peu de substituts dans les systèmes militaires ; ajouté aux contrôles export chinois (avr. 2025).',
    riskLevel: 'critical',
    importDependency: 'Matériau transformé : Chine. Production d’aimants avancés : Chine.',
    dominantCountry: 'China', dominantShare: null,
    sources: { raw: [{ country: 'China' }], processed: [{ country: 'China' }], advanced: [{ country: 'China' }] },
    crmaListed: true, confidence: 'verified', refs: ['Parlement européen — contrôles export Chine (2025)'],
  },
  {
    id: 'tungsten', name: 'Tungstène', symbol: 'W', category: 'Propulsion',
    strategicRelevance: 'Munitions perforantes, applications aérospatiales et de blindage.',
    launcherUse: 'Masses d’équilibrage, tuyères/gorges (haute température).',
    satelliteUse: 'Blindage, lests, éléments haute densité.',
    supplyRisk: 'Extraction et raffinage très concentrés.',
    riskLevel: 'high',
    importDependency: 'Minerai : Chine et Vietnam. Produits de tungstène transformés : Chine.',
    dominantCountry: 'China', dominantShare: null,
    sources: {
      raw: [{ country: 'China' }, { country: 'Vietnam' }], processed: [{ country: 'China' }], advanced: [],
    },
    crmaListed: true, confidence: 'internalDB', refs: ['DB interne DG DEFIS'],
  },
  {
    id: 'graphite', name: 'Graphite synthétique (haute pureté)', symbol: 'C', category: 'Thermique',
    strategicRelevance: 'Protections thermiques, batteries, applications aérospatiales.',
    launcherUse: 'Cols de tuyère, protections thermiques, éléments de propulsion solide.',
    satelliteUse: 'Éléments thermiques, batteries.',
    supplyRisk: 'Capacité de transformation concentrée dans un seul pays ; recyclage négligeable.',
    riskLevel: 'high',
    importDependency: 'Graphite transformé/avancé : Chine (>80 %).',
    dominantCountry: 'China', dominantShare: 80,
    sources: { raw: [{ country: 'China' }], processed: [{ country: 'China', share: 80 }], advanced: [] },
    crmaListed: true, confidence: 'internalDB', refs: ['DB interne DG DEFIS'],
  },
  {
    id: 'uhtc', name: 'Céramiques ultra-hautes températures (UHTC)', symbol: '—', category: 'Thermique',
    strategicRelevance: 'Systèmes hypersoniques et protection thermique.',
    launcherUse: 'Bords d’attaque, protections thermiques, cols de tuyère.',
    satelliteUse: 'Protection thermique de rentrée.',
    supplyRisk: 'Production à l’échelle industrielle limitée dans le monde.',
    riskLevel: 'medium',
    importDependency: 'Matériaux avancés : États-Unis, Japon et Chine.',
    dominantCountry: 'United States of America', dominantShare: null,
    sources: { raw: [], processed: [], advanced: [{ country: 'United States of America' }, { country: 'Japan' }, { country: 'China' }] },
    crmaListed: false, confidence: 'internalDB', refs: ['DB interne DG DEFIS'],
  },
  {
    id: 'carbon-phenolic', name: 'Carbone-phénolique ablatif', symbol: '—', category: 'Thermique',
    strategicRelevance: 'Tuyères de fusées, lanceurs et systèmes de rentrée.',
    launcherUse: 'Cols et divergents de tuyère (propulsion solide), protections ablatives.',
    satelliteUse: 'Boucliers de rentrée (capsules).',
    supplyRisk: 'Cycles de qualification longs et peu de fournisseurs.',
    riskLevel: 'high',
    importDependency: 'Matériaux avancés : États-Unis et Japon. (Dépendance critique : rayonne/précurseurs textiles.)',
    dominantCountry: 'United States of America', dominantShare: null,
    sources: { raw: [], processed: [], advanced: [{ country: 'United States of America' }, { country: 'Japan' }] },
    crmaListed: false, confidence: 'internalDB', refs: ['DB interne DG DEFIS'],
  },
  {
    id: 'quartz-optics', name: 'Quartz haute pureté & verres optiques', symbol: 'SiO₂', category: 'Optique-capteurs',
    strategicRelevance: 'Lasers, optiques, satellites et capteurs.',
    launcherUse: 'Optiques de guidage (limité).',
    satelliteUse: 'Optiques d’instruments, lasers, fibres, capteurs.',
    supplyRisk: 'Les exigences de très haute pureté créent une concentration de l’offre.',
    riskLevel: 'medium',
    importDependency: 'Quartz ultra-pur brut : États-Unis. Verre optique avancé : Allemagne et Japon.',
    dominantCountry: 'United States of America', dominantShare: null,
    sources: {
      raw: [{ country: 'United States of America', note: 'quartz ultra-pur' }],
      processed: [], advanced: [{ country: 'Germany' }, { country: 'Japan' }],
    },
    crmaListed: false, confidence: 'internalDB', refs: ['DB interne DG DEFIS'],
  },
];

// ── Dépendances par stade de chaîne (table utilisateur) ─────────────────────────────
export const crmStages = [
  {
    id: 'raw', label: 'Matières premières', tone: 'blue',
    items: [
      { country: 'Brazil', what: 'Niobium' }, { country: 'Indonesia', what: 'Nickel' },
      { country: 'Kazakhstan', what: 'Titane (charge), Rhénium' }, { country: 'China', what: 'Minerais de terres rares, Tungstène' },
      { country: 'Rwanda', what: 'Tantale (concentrés)' }, { country: 'Dem. Rep. Congo', what: 'Tantale (concentrés)' },
      { country: 'United States of America', what: 'Béryllium' }, { country: 'Chile', what: 'Rhénium' },
    ],
  },
  {
    id: 'processed', label: 'Matériaux transformés', tone: 'amber',
    items: [
      { country: 'China', what: 'Oxydes de terres rares, gallium, germanium, tungstène, graphite, samarium, tantale' },
      { country: 'Japan', what: 'Éponge de titane' },
      { country: 'United States of America', what: 'Béryllium, hafnium, raffinage du rhénium' },
    ],
  },
  {
    id: 'advanced', label: 'Matériaux & composants avancés', tone: 'indigo',
    items: [
      { country: 'Japan', what: 'Fibres de carbone, prepregs, céramiques avancées' },
      { country: 'United States of America', what: 'Substrats SiC, composants GaN, composites aéro' },
      { country: 'Taiwan', what: 'Fabrication de semi-conducteurs GaN avancés' },
      { country: 'China', what: 'Aimants permanents à base de terres rares' },
    ],
  },
  {
    id: 'recycled', label: 'Matériaux recyclés', tone: 'slate',
    items: [
      { country: null, what: 'Pour la plupart des matériaux avancés défense/espace, le recyclage couvre < 25 % de la demande européenne → la vulnérabilité tient aux imports (brut/transformé/avancé), pas au recyclage.' },
    ],
  },
];

// ── Insights décideur (web-vérifiés) ────────────────────────────────────────────────
export const crmInsights = [
  {
    id: 'china-dominance', title: 'Domination chinoise du raffinage & des aimants', tone: 'red',
    body: 'La Chine transforme >80 % des terres rares, produit ~90 % des aimants permanents haute performance et >90 % du gallium. Contrôles export : Ga/Ge/antimoine vers les US (déc. 2024) ; 7 terres rares moyennes/lourdes — dont le samarium — ajoutées (avr. 2025) ; régime le plus large (règle 0,1 % + licences technologiques) en oct. 2025, partiellement suspendu depuis.',
    confidence: 'verified', refs: ['IEA', 'Parlement européen (2025)'],
  },
  {
    id: 'niobium', title: 'Niobium : quasi-monopole brésilien', tone: 'amber',
    body: 'Le Brésil (CBMM) fournit ~85-90 % du niobium mondial, indispensable aux superalliages aérospatiaux et aciers avancés. Aucune source alternative réaliste à court/moyen terme — dépendance « alliée » mais point unique de défaillance au sens du plafond CRMA de 65 %.',
    confidence: 'verified', refs: ['IEA', 'USGS'],
  },
  {
    id: 'two-most-dangerous', title: 'Les deux dépendances les plus critiques', tone: 'red',
    body: '1) La domination chinoise sur les terres rares transformées (oxydes, métaux, aimants). 2) Le quasi-monopole brésilien du niobium. Ce sont les cas les plus clairs où l’UE manque d’alternative réaliste à court/moyen terme.',
    confidence: 'verified', refs: ['DB interne DG DEFIS', 'IEA'],
  },
  {
    id: 'recycling-gap', title: 'Le recyclage ne couvre pas (encore) le risque', tone: 'slate',
    body: 'Pour la plupart des matériaux avancés défense/espace, le recyclage reste < 25 % de la demande européenne : la résilience passe d’abord par la diversification amont (extraction/transformation) et les projets stratégiques CRMA, pas par la boucle secondaire.',
    confidence: 'internalDB', refs: ['DB interne DG DEFIS'],
  },
];

// ── Mapping matière → capacité spatiale (interconnexions) ────────────────────────────
export const crmCapability = [
  { capability: 'Aimants & mécanismes (roues à réaction, CMG, actionneurs, TVC)', materials: ['ree-magnets', 'samarium'], tone: 'red' },
  { capability: 'Cellules solaires & électronique RF (radars AESA, SATCOM)', materials: ['gallium', 'germanium', 'gan', 'indium', 'tantalum'], tone: 'amber' },
  { capability: 'Propulsion & pièces chaudes (tuyères, chambres, turbopompes)', materials: ['ni-superalloys', 'rhenium', 'hafnium', 'niobium', 'tungsten', 'graphite', 'carbon-phenolic'], tone: 'amber' },
  { capability: 'Structures lanceurs & satellites', materials: ['ti-aero', 'carbon-fibre', 'prepregs'], tone: 'blue' },
  { capability: 'Optiques & capteurs (IR, miroirs, lasers)', materials: ['beryllium', 'germanium', 'quartz-optics', 'sic'], tone: 'blue' },
  { capability: 'Protection thermique & rentrée', materials: ['graphite', 'uhtc', 'carbon-phenolic'], tone: 'indigo' },
];

// ── Agrégat pays (pour la choroplèthe + bulles) ─────────────────────────────────────
// Score = présence de chaque pays à TOUS les stades (raw/processed/advanced), pondérée
// par la criticité. Le pays « dominant » (goulot) reçoit le poids plein ; les autres
// apparitions un poids partiel → colore l'ensemble des sources, pas seulement le goulot.
const RISK_WEIGHT = { critical: 3, high: 2, medium: 1 };
export const crmCountryDominance = (() => {
  const acc = {};
  const add = (country, weight, matId) => {
    if (!country || !CRM_COUNTRY[country]) return;
    (acc[country] ||= { geoName: country, ...CRM_COUNTRY[country], _mats: new Set(), score: 0 });
    acc[country]._mats.add(matId);
    acc[country].score += weight;
  };
  for (const m of crmMaterials) {
    const w = RISK_WEIGHT[m.riskLevel] || 1;
    add(m.dominantCountry, w, m.id);
    for (const stage of ['raw', 'processed', 'advanced']) {
      for (const s of m.sources?.[stage] || []) {
        if (s.country !== m.dominantCountry) add(s.country, w * 0.5, m.id);
      }
    }
  }
  return Object.fromEntries(Object.entries(acc).map(([k, v]) => {
    const { _mats, ...rest } = v;
    return [k, { ...rest, materials: [..._mats] }];
  })); // keyed by world-atlas geoName
})();
export const crmMaxScore = Math.max(1, ...Object.values(crmCountryDominance).map((c) => c.score));
export const crmById = Object.fromEntries(crmMaterials.map((m) => [m.id, m]));
