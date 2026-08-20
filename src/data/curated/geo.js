/**
 * Curated geographic data — NOT in the source Excel (which has no spaceport coords).
 * Hand-authored & web-verified (approx. coordinates, [lon, lat] = GeoJSON order).
 * Keys for European spaceports match the slug ids in src/data/spaceports.json.
 */

// ── European spaceports: id (from ETL) -> [lon, lat] ────────────────────────
export const spaceportCoords = {
  'guiana-space-centre-csg': [-52.768, 5.239],
  'esrange-space-center': [21.106, 67.893],
  'and-ya-spaceport-nordmela': [15.99, 69.08],
  'saxavord-spaceport-lamba-ness': [-0.78, 60.82],
  'sutherland-space-hub-sutherland-a-mh-ine': [-4.42, 58.52],
  'spaceport-cornwall-newquay': [-5.00, 50.44],
  'santa-maria-spaceport-azores-malbusca': [-25.13, 36.93],
  'north-sea-german-offshore-gosa-related-projects': [8.58, 53.54],
  'el-hierro-canary-islands-spain-proposals': [-18.00, 27.74],
  'el-arenosillo-test-range-cedea-inta': [-6.74, 37.10],
};

// ── Major non-European spaceports (world map context layer) ─────────────────
export const worldSpaceports = [
  { id: 'ksc-canaveral', name: 'Cape Canaveral / KSC', country: 'United States', coords: [-80.60, 28.49], operator: 'NASA / SpaceX / ULA', launchers: 'Falcon 9/Heavy, Starship (pad), Vulcan, New Glenn' },
  { id: 'vandenberg', name: 'Vandenberg SFB', country: 'United States', coords: [-120.61, 34.74], operator: 'USSF / SpaceX', launchers: 'Falcon 9 (polar)' },
  { id: 'starbase', name: 'Starbase (Boca Chica)', country: 'United States', coords: [-97.18, 25.99], operator: 'SpaceX', launchers: 'Starship / Super Heavy' },
  { id: 'wallops', name: 'Wallops / MARS', country: 'United States', coords: [-75.48, 37.83], operator: 'NASA / Rocket Lab', launchers: 'Antares, Electron, Minotaur' },
  { id: 'baikonur', name: 'Baikonur Cosmodrome', country: 'Kazakhstan (RU lease)', coords: [63.34, 45.96], operator: 'Roscosmos', launchers: 'Soyuz, Proton' },
  { id: 'plesetsk', name: 'Plesetsk Cosmodrome', country: 'Russia', coords: [40.68, 62.93], operator: 'Roscosmos / VKS', launchers: 'Soyuz, Angara' },
  { id: 'vostochny', name: 'Vostochny Cosmodrome', country: 'Russia', coords: [128.33, 51.88], operator: 'Roscosmos', launchers: 'Soyuz-2, Angara' },
  { id: 'wenchang', name: 'Wenchang', country: 'China', coords: [110.95, 19.61], operator: 'CNSA', launchers: 'Long March 5/7/8' },
  { id: 'jiuquan', name: 'Jiuquan', country: 'China', coords: [100.29, 40.96], operator: 'CNSA', launchers: 'Long March, commercial' },
  { id: 'xichang', name: 'Xichang', country: 'China', coords: [102.03, 28.25], operator: 'CNSA', launchers: 'Long March 2/3' },
  { id: 'tanegashima', name: 'Tanegashima', country: 'Japan', coords: [130.97, 30.40], operator: 'JAXA', launchers: 'H3, H-IIA' },
  { id: 'sriharikota', name: 'Satish Dhawan (Sriharikota)', country: 'India', coords: [80.23, 13.73], operator: 'ISRO', launchers: 'PSLV, GSLV, LVM3' },
  { id: 'mahia', name: 'Rocket Lab LC-1 (Mahia)', country: 'New Zealand', coords: [177.86, -39.26], operator: 'Rocket Lab', launchers: 'Electron' },
];

// ── Propulsion / engine / structural test facilities ────────────────────────
export const testCentres = [
  { id: 'dlr-lampoldshausen', name: 'DLR Lampoldshausen (P5/P4/P2.x)', country: 'Germany', coords: [9.34, 49.30], role: "Bancs d'essai moteurs cryogéniques Vulcain 2.1 & Vinci (P5), étages supérieurs", operator: 'DLR / ArianeGroup / ESA' },
  { id: 'arianegroup-vernon', name: 'ArianeGroup Vernon (PF20)', country: 'France', coords: [1.47, 49.09], role: 'Essais propulsion liquide ; Prometheus, Vinci ; site MaiaSpace', operator: 'ArianeGroup / MaiaSpace' },
  { id: 'avio-colleferro', name: 'Avio — Colleferro (BET)', country: 'Italy', coords: [13.00, 41.73], role: 'Production & essais moteurs solides P120C, Zefiro ; banc M10 (méthane)', operator: 'Avio' },
  { id: 'esa-estec-prop', name: 'ESA Propulsion Lab — ESTEC', country: 'Netherlands', coords: [4.42, 52.22], role: 'Laboratoire propulsion ESA, essais composants', operator: 'ESA' },
  { id: 'pld-teruel', name: 'PLD Space — Teruel test site', country: 'Spain', coords: [-1.22, 40.40], role: 'Essais TEPREL / étages Miura', operator: 'PLD Space' },
  { id: 'isar-esrange-test', name: 'Isar / Esrange test stands', country: 'Sweden', coords: [21.10, 67.89], role: 'Essais à feu étages microlanceurs', operator: 'SSC / Isar' },
];

// helper
export function spaceportLonLat(id) {
  return spaceportCoords[id] || null;
}
