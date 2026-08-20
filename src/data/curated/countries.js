/**
 * Curated country space-fiches. Web-verified (ESA 2025 budget figures: DE 1,17 Md€,
 * FR 1,05 Md€, IT 0,80 Md€, UK 320 M€ ; budget ESA 2025 ≈ 7,68 Md€). Figures plus
 * fines approximatives. `mapName` matches world-atlas property.name (map click).
 */
export const countries = [
  {
    id: 'fr', mapName: 'France', name: 'France', flag: 'fr', tier: 'eu-major', confidence: 'verified', sources: ['ESA', 'CNES'],
    esa: '≈ 1,05 Md€ (2025) — 2ᵉ contributeur ESA, 1er sur les lanceurs', agency: 'cnes',
    actors: ['arianegroup', 'arianespace', 'maiaspace', 'latitude', 'tas', 'airbus-ds'],
    launchers: ['ariane-62', 'ariane-64', 'maia', 'zephyr'], spaceports: ['CSG (Kourou)'],
    position: "Championne de l'accès autonome à l'espace ; opère le CSG via le CNES ; cœur industriel d'Ariane.",
    notes: 'Pilier souverain : CSG en Guyane = territoire UE. Forte intégration ESA + UE.',
  },
  {
    id: 'de', mapName: 'Germany', name: 'Allemagne', flag: 'de', tier: 'eu-major', confidence: 'verified', sources: ['ESA', 'DLR'],
    esa: '≈ 1,17 Md€ (2025) — 1er contributeur ESA (≈ 23 % sur 3 ans)', agency: 'dlr',
    actors: ['isar', 'rfa', 'ohb', 'arianegroup'], launchers: ['spectrum', 'rfa-one'], spaceports: ['GOSA (offshore, projet)'],
    position: 'Moteur du New Space européen (Isar, RFA) ; pousse la concurrence commerciale & le European Launcher Challenge.',
    notes: "Bancs d'essai de Lampoldshausen (DLR) ; débat sur un spaceport national/offshore.",
  },
  {
    id: 'it', mapName: 'Italy', name: 'Italie', flag: 'it', tier: 'eu-major', confidence: 'verified', sources: ['ESA', 'ASI'],
    esa: '≈ 0,80 Md€ (2025) — 3ᵉ contributeur ESA', agency: 'asi',
    actors: ['avio', 'tas'], launchers: ['vega-c', 'vega-e'], spaceports: ['CSG (ZLV)'],
    position: 'Championne de Vega & de la propulsion solide (Avio, P120C). Autonomie sur le segment petit/moyen.',
    notes: 'Avio commercialise désormais Vega en direct (hors Arianespace).',
  },
  {
    id: 'es', mapName: 'Spain', name: 'Espagne', flag: 'es', tier: 'eu', confidence: 'verified', sources: ['ESA', 'PLD Space'],
    esa: 'Contributeur ESA moyen ; agence AEE créée en 2023', agency: null, actors: ['pld'], launchers: ['miura-5'],
    spaceports: ['El Arenosillo (INTA)', 'El Hierro (projet)'],
    position: 'Montée en puissance via PLD Space (Miura). Nouvelle agence spatiale espagnole (AEE).',
    notes: 'Miura 1 suborbital réussi ; Miura 5 orbital depuis le CSG.',
  },
  {
    id: 'gb', mapName: 'United Kingdom', name: 'Royaume-Uni', flag: 'gb', tier: 'non-eu', confidence: 'verified', sources: ['ESA', 'UKSA'],
    esa: '≈ 320 M€ (2025, en baisse) — membre ESA hors UE (Brexit)', agency: 'uksa',
    actors: ['orbex'], launchers: ['prime'], spaceports: ['SaxaVord', 'Sutherland', 'Cornwall'],
    position: 'Hub de spaceports (1ers tirs orbitaux depuis le sol UK visés) ; hors mécanismes UE mais membre ESA.',
    notes: 'Orbex en difficulté (retrait ELC, fév. 2026). CAA = régulateur spaceports.',
  },
  {
    id: 'be', mapName: 'Belgium', name: 'Belgique', flag: 'be', tier: 'eu', confidence: 'internalDB',
    esa: 'Contributeur ESA notable (par habitant élevé)', agency: null, actors: [], launchers: [], spaceports: [],
    position: "Siège de la Commission (DG DEFIS) à Bruxelles ; industrie (propulsion, optique, structures).",
    notes: 'Acteur diplomatique central de la politique spatiale UE.',
  },
  {
    id: 'nl', mapName: 'Netherlands', name: 'Pays-Bas', flag: 'nl', tier: 'eu', confidence: 'internalDB',
    esa: 'Hôte de l’ESTEC (centre technique principal de l’ESA)', agency: null, actors: [], launchers: [], spaceports: [],
    position: "Cœur technique de l'ESA (ESTEC, Noordwijk) ; observation de la Terre, instruments.",
    notes: 'ESTEC = plus grand site de l’ESA.',
  },
  {
    id: 'ch', mapName: 'Switzerland', name: 'Suisse', flag: 'ch', tier: 'non-eu', confidence: 'internalDB',
    esa: 'Membre fondateur ESA (hors UE)', agency: null, actors: [], launchers: [], spaceports: [],
    position: 'Coiffes & structures (RUAG/Beyond Gravity) ; horlogerie de précision spatiale.',
    notes: 'Fournisseur critique de coiffes pour Ariane/Vega.',
  },
  {
    id: 'se', mapName: 'Sweden', name: 'Suède', flag: 'se', tier: 'eu', confidence: 'internalDB',
    esa: 'Membre ESA ; opère Esrange', agency: null, actors: [], launchers: [], spaceports: ['Esrange (Kiruna)'],
    position: "Spaceport d'Esrange (SSC) — complexe orbital pour microlanceurs (Isar).",
    notes: 'Premier site orbital potentiel d’Europe continentale (avec Andøya).',
  },
  {
    id: 'no', mapName: 'Norway', name: 'Norvège', flag: 'no', tier: 'non-eu', confidence: 'internalDB',
    esa: 'Membre ESA (hors UE)', agency: null, actors: [], launchers: [], spaceports: ['Andøya Spaceport'],
    position: "Andøya Spaceport — site du 1er tir orbital depuis l'Europe continentale (Isar, mars 2025).",
    notes: 'Position polaire idéale pour orbites héliosynchrones.',
  },
  {
    id: 'lu', mapName: 'Luxembourg', name: 'Luxembourg', flag: 'lu', tier: 'eu', confidence: 'internalDB',
    esa: 'Membre ESA ; politique New Space proactive', agency: null, actors: [], launchers: [], spaceports: [],
    position: 'Loi sur les ressources spatiales ; hub financier & SES (télécom).',
    notes: 'Pionnier réglementaire (space mining).',
  },
  {
    id: 'pl', mapName: 'Poland', name: 'Pologne', flag: 'pl', tier: 'eu', confidence: 'internalDB',
    esa: 'Membre ESA depuis 2012 ; secteur en croissance', agency: null, actors: [], launchers: [], spaceports: [],
    position: 'Écosystème New Space émergent (composants, smallsats).',
    notes: 'Agence POLSA.',
  },
  {
    id: 'eu', mapName: null, name: 'Union européenne', flag: 'eu', tier: 'eu', confidence: 'verified', sources: ['EC'],
    esa: "L'UE (≠ ESA) finance le Programme spatial et délègue à l'ESA/EUSPA via FFPA",
    agency: 'ec-defis', actors: ['arianegroup', 'avio'], launchers: ['ariane-62', 'ariane-64', 'vega-c'], spaceports: ['CSG'],
    position: "Souveraineté & autonomie stratégique : EU Space Act, préférence aux lanceurs UE (Access to Space), agrégation de la demande institutionnelle.",
    notes: '27 États membres. DG DEFIS pilote la politique ; EUSPA exploite ; ESA développe. ECF (2028-34) à venir.',
  },
  {
    id: 'us', mapName: 'United States of America', name: 'États-Unis', flag: 'us', tier: 'world', confidence: 'verified', sources: ['NASA', 'SpaceX'],
    esa: '—', agency: null, actors: [], launchers: ['falcon-9-v1-2', 'falcon-heavy', 'starship', 'new-glenn', 'vulcan'],
    spaceports: ['Cape Canaveral / KSC', 'Vandenberg', 'Starbase'],
    position: "Référence mondiale : domination SpaceX (réutilisabilité, coût/kg), NASA, ULA, Blue Origin. Benchmark de compétitivité pour l'UE.",
    notes: "Modèle commercial (services de lancement) que l'UE cherche à répliquer.",
  },
  {
    id: 'cn', mapName: 'China', name: 'Chine', flag: 'cn', tier: 'world', confidence: 'verified', sources: ['CNSA'],
    esa: '—', agency: null, actors: [], launchers: ['long-march-5', 'long-march-8'], spaceports: ['Wenchang', 'Jiuquan', 'Xichang'],
    position: 'Programme étatique massif (CNSA, Long March) + montée de lanceurs commerciaux. Concurrent stratégique.',
    notes: 'Cadence élevée ; constellations Guowang / Qianfan.',
  },
  {
    id: 'jp', mapName: 'Japan', name: 'Japon', flag: 'jp', tier: 'world', confidence: 'verified', sources: ['JAXA'],
    esa: '—', agency: null, actors: [], launchers: ['h3'], spaceports: ['Tanegashima'],
    position: 'JAXA + MHI : lanceur H3 opérationnel, partenaire de l’Occident (Artemis).',
    notes: 'H3 successeur de H-IIA.',
  },
  {
    id: 'in', mapName: 'India', name: 'Inde', flag: 'in', tier: 'world', confidence: 'verified', sources: ['ISRO'],
    esa: '—', agency: null, actors: [], launchers: ['lvm3', 'pslv-xl'], spaceports: ['Satish Dhawan (Sriharikota)'],
    position: 'ISRO : coûts très compétitifs (PSLV/LVM3), Chandrayaan-3, programme habité Gaganyaan.',
    notes: 'Réforme New Space (IN-SPACe).',
  },
  {
    id: 'ru', mapName: 'Russia', name: 'Russie', flag: 'ru', tier: 'world', confidence: 'verified', sources: ['Roscosmos'],
    esa: '—', agency: null, actors: [], launchers: ['soyuz'], spaceports: ['Baïkonour', 'Plessetsk', 'Vostotchny'],
    position: 'Roscosmos : Soyouz/Angara. Coopération ESA suspendue depuis 2022 (départ du CSG).',
    notes: 'Soyouz retiré du CSG ; ex-pad ELS repris par MaiaSpace.',
  },
];
