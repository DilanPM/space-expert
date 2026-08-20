/**
 * European orbital launch log 2024-2026 — web-verified (Arianespace / ESA / Avio
 * / European Spaceflight). outcome: success | partial | failure | upcoming.
 * confidence 'verified'. The Excel "Launch" sheet (Copernicus/Sentinel roadmap)
 * is shown separately as missions, not here.
 */
export const launches = [
  { id: 'va262', date: '2024-07-09', flight: 'VA262', launcher: 'ariane-62', launcherName: 'Ariane 6 (A62)',
    payload: 'Vol inaugural — cubesats & démonstrateurs', operator: 'Arianespace / ESA', site: 'CSG · ELA-4',
    outcome: 'partial', note: 'Succès partiel — anomalie APU sur l’étage supérieur en fin de mission.', sources: ['ESA'] },
  { id: 'vv24', date: '2024-09-04', flight: 'VV24', launcher: 'vega', launcherName: 'Vega',
    payload: 'Sentinel-2C (Copernicus)', operator: 'Arianespace / Avio', site: 'CSG · ZLV', outcome: 'success',
    note: 'Dernier vol du lanceur Vega (historique).', sources: ['ESA', 'Arianespace'] },
  { id: 'vv25', date: '2024-12-05', flight: 'VV25', launcher: 'vega-c', launcherName: 'Vega-C',
    payload: 'Sentinel-1C (Copernicus)', operator: 'Avio', site: 'CSG · ZLV', outcome: 'success',
    note: 'Retour en vol de Vega-C après l’échec de déc. 2022.', sources: ['ESA', 'Avio'] },
  { id: 'va263', date: '2025-03-06', flight: 'VA263', launcher: 'ariane-64', launcherName: 'Ariane 6 (A64)',
    payload: 'CSO-3 (renseignement, Armées françaises)', operator: 'Arianespace', site: 'CSG · ELA-4', outcome: 'success',
    note: '1er vol commercial d’Ariane 6.', sources: ['Arianespace'] },
  { id: 'spectrum-f1', date: '2025-03-30', flight: 'Flight 1', launcher: 'spectrum', launcherName: 'Spectrum',
    payload: 'Vol d’essai (sans charge)', operator: 'Isar Aerospace', site: 'Andøya (Norvège)', outcome: 'failure',
    note: '1er tir orbital depuis l’Europe continentale — échec à ~30 s (données précieuses recueillies).', sources: ['Isar Aerospace'] },
  { id: 'vv26', date: '2025-04-29', flight: 'VV26', launcher: 'vega-c', launcherName: 'Vega-C',
    payload: 'Biomass (ESA — Earth Explorer)', operator: 'Avio', site: 'CSG · ZLV', outcome: 'success', sources: ['ESA'] },
  { id: 'vv27', date: '2025-07-25', flight: 'VV27', launcher: 'vega-c', launcherName: 'Vega-C',
    payload: 'CO3D (Airbus) + MicroCarb (CNES)', operator: 'Avio', site: 'CSG · ZLV', outcome: 'success', sources: ['Arianespace'] },
  { id: 'va264', date: '2025-08-12', flight: 'VA264', launcher: 'ariane-62', launcherName: 'Ariane 6 (A62)',
    payload: 'MetOp-SGA1 (EUMETSAT, météo)', operator: 'Arianespace', site: 'CSG · ELA-4', outcome: 'success', sources: ['ArianeGroup'] },
  { id: 'va265', date: '2025-11-04', flight: 'VA265', launcher: 'ariane-62', launcherName: 'Ariane 6 (A62)',
    payload: 'Sentinel-1D (Copernicus)', operator: 'Arianespace', site: 'CSG · ELA-4', outcome: 'success', sources: ['ESA'] },
  { id: 'vv28', date: '2025-11-30', flight: 'VV28', launcher: 'vega-c', launcherName: 'Vega-C',
    payload: 'KOMPSAT-7 (Corée)', operator: 'Avio', site: 'CSG · ZLV', outcome: 'success', sources: ['Arianespace'] },
  { id: 'va266', date: '2025-12-17', flight: 'VA266', launcher: 'ariane-64', launcherName: 'Ariane 6 (A64)',
    payload: 'Galileo L14 (SAT 33 & 34)', operator: 'Arianespace', site: 'CSG · ELA-4', outcome: 'success', sources: ['Arianespace'] },
  { id: 'va268', date: '2026-04-30', flight: 'VA268', launcher: 'ariane-64', launcherName: 'Ariane 6 (A64)',
    payload: 'Amazon Leo / Kuiper (broadband)', operator: 'Arianespace', site: 'CSG · ELA-4', outcome: 'success',
    note: '4 boosters P120C — déploiement constellation.', sources: ['Arianespace'] },
  { id: 'va269', date: '2026-06-17', flight: 'VA269', launcher: 'ariane-64', launcherName: 'Ariane 6 (A64)',
    payload: 'Amazon Leo / Kuiper (broadband)', operator: 'Arianespace', site: 'CSG · ELA-4', outcome: 'success', sources: ['Arianespace'] },
  { id: 'spectrum-f2', date: '2026-06-18', flight: 'Flight 2', launcher: 'spectrum', launcherName: 'Spectrum',
    payload: 'Vol d’essai 2', operator: 'Isar Aerospace', site: 'Andøya (Norvège)', outcome: 'upcoming',
    note: '2ᵉ tentative orbitale (à venir).', sources: ['Isar Aerospace'] },
  { id: 'vv29', date: '2026', flight: 'VV29', launcher: 'vega-c', launcherName: 'Vega-C',
    payload: 'Smile (ESA / Académie chinoise des sciences)', operator: 'Avio', site: 'CSG · ZLV', outcome: 'upcoming', sources: ['ESA'] },
  { id: 'miura5-m1', date: '2026', flight: 'Maiden', launcher: 'miura-5', launcherName: 'Miura 5',
    payload: 'Vol inaugural', operator: 'PLD Space', site: 'CSG · ELM', outcome: 'upcoming', sources: ['PLD Space'] },
  { id: 'maia-m1', date: '2027', flight: 'Maiden', launcher: 'maia', launcherName: 'Maia',
    payload: 'Vol inaugural (réutilisable)', operator: 'MaiaSpace', site: 'CSG · ELS', outcome: 'upcoming', sources: ['MaiaSpace'] },
  // Dépendance temporaire SpaceX : Galileo lancé sur Falcon 9 (Soyuz indisponible, Ariane 6 pas prête)
  { id: 'galileo-l12', date: '2024-04-28', flight: 'Galileo L12', launcher: 'falcon-9-v1-2', launcherName: 'Falcon 9',
    payload: 'Galileo FOC (2 sat.) — UE sur lanceur US', operator: 'SpaceX (pour UE/ESA)', site: 'Cape Canaveral', outcome: 'success',
    note: '⚠️ Souveraineté : l’UE a dû recourir à SpaceX faute de lanceur européen disponible.', sources: ['ESA', 'EUSPA'] },
  { id: 'galileo-l13', date: '2024-09-17', flight: 'Galileo L13', launcher: 'falcon-9-v1-2', launcherName: 'Falcon 9',
    payload: 'Galileo FOC (2 sat.) — UE sur lanceur US', operator: 'SpaceX (pour UE/ESA)', site: 'Cape Canaveral', outcome: 'success',
    note: '⚠️ 2ᵉ recours à SpaceX pour Galileo en 2024.', sources: ['ESA'] },
  { id: 'iris2-first', date: '2029', flight: '1er lancement', launcher: 'ariane-64', launcherName: 'Ariane 6 (prévu)',
    payload: 'IRIS² — constellation souveraine (≈290 sat. d’ici 2030)', operator: 'EC / SpaceRISE', site: 'CSG · ELA-4', outcome: 'upcoming',
    note: 'Programme ≈ 10,6 Md€. Retour à l’autonomie de lancement européenne.', sources: ['EC', 'European Spaceflight'] },
];

export const launchStats = (() => {
  const done = launches.filter((l) => l.outcome !== 'upcoming');
  return {
    total: done.length,
    success: done.filter((l) => l.outcome === 'success').length,
    partial: done.filter((l) => l.outcome === 'partial').length,
    failure: done.filter((l) => l.outcome === 'failure').length,
    upcoming: launches.filter((l) => l.outcome === 'upcoming').length,
  };
})();
