/**
 * Central data layer. Loads ETL output (Excel→JSON) + curated overlays,
 * derives fields, and exposes relational lookups for cross-linked fiches.
 */
import launchersRaw from './launchers.json';
import spaceportsRaw from './spaceports.json';
import csgLaunchpads from './csgLaunchpads.json';
import propulsion from './propulsion.json';
import criticalMaterials from './criticalMaterials.json';
import groundInfra from './groundInfra.json';
import spaceStats from './spaceStats.json';
import launchLog from './launchLog.json';
import narratives from './narratives.json';
import launcherClass from './launcherClass.json';

import { spaceportCoords, worldSpaceports, testCentres } from './curated/geo.js';
import { institutions, companies, governanceTriangle } from './curated/ecosystem.js';
import { countries } from './curated/countries.js';
import { launchersVerified } from './curated/launchersVerified.js';
import { launches, launchStats } from './curated/launches.js';
import { satPopulation, byOrbit, byOperator, byType, debris as debrisStats, euConstellations } from './curated/stats.js';
import {
  crmMaterials, crmById, crmaBenchmarks, crmStages, crmInsights, crmCapability,
  crmCountryDominance, crmMaxScore, CRM_COUNTRY, BLOC_LABEL,
} from './curated/crm.js';
import {
  pfasFamilies, pfasFamilyById, pfasFunctions, pfasFunctionById, pfasComponents,
  pfasByFamily, pfasByFunction, pfasRestriction,
} from './curated/pfas.js';

// Canonical reconciliation of source pad labels → real ELA designations
const PAD_CANON = {
  'ensemble-de-lancement-ariane-4': { code: 'ELA-4', sub: 'Ariane 6', note: 'Complexe Ariane 6 (actif depuis juil. 2024)' },
  'ensemble-de-lancement-vega': { code: 'ZLV', sub: 'Vega-C', note: 'Zone de Lancement Vega (ex-ELA-1)' },
  'ensemble-de-lancement-multilanceurs': { code: 'ELM', sub: 'Microlanceurs', note: 'Multi-lanceurs (ex-site Diamant) — Maia, Miura 5, RFA…' },
  'ensemble-de-lancement-soyouz': { code: 'ELS', sub: 'Soyouz → Maia', note: 'Ex-pad Soyouz (Sinnamary) repris par MaiaSpace' },
  'ensemble-de-lancement-ariane-3': { code: 'ELA-3', sub: '→ Vega-E', note: 'Ex-Ariane 5 — rénové pour Vega-E' },
  'ensemble-de-lancement-ariane-2': { code: 'ELA-2', sub: 'historique', note: 'Historique Ariane 2/3/4' },
  'ensemble-de-lancement-fusées-sondes': { code: 'ZFS', sub: 'Fusées-sondes', note: 'Zone fusées-sondes' },
};

// ── Derivations ─────────────────────────────────────────────────────────────
export function propType(l) {
  const t = `${l.propStage1 || ''} ${l.booster || ''} ${l.propStage2 || ''}`.toLowerCase();
  if (/methane|ch4|lox ?\/ ?meth|lng/.test(t)) return 'methane';
  if (/lh2|hydrolox|lox ?\/ ?lh2|cryo/.test(t)) return 'cryo';
  if (/solid|htpb|p120|p80|zefiro|ap\/al|composite/.test(t)) return 'solid';
  if (/rp-?1|kerosene|propane|lpg|hybrid|paraffin|lox ?\/ ?rp/.test(t)) return 'liquid';
  return null;
}

export function statusGroup(status = '') {
  const s = status.toLowerCase();
  if (/operational|active|orbit reached|in operation/.test(s)) return 'active';
  if (/development|planned|introduction|licensed|opening|construction|pending/.test(s)) return 'dev';
  if (/retired|cancelled|withdrawn|inactive|suspended|failed|administration/.test(s)) return 'retired';
  return 'other';
}

const WIKI_OVERRIDE = {
  'ariane-62': 'Ariane 6', 'ariane-64': 'Ariane 6', 'ariane-62-astris': 'Ariane 6',
  'ariane-64-astris': 'Ariane 6', 'vega-c': 'Vega C', 'vega-e': 'Vega (rocket)',
  'falcon-9-v1-2': 'Falcon 9', 'falcon-heavy': 'Falcon Heavy', 'starship': 'SpaceX Starship',
  'miura-5': 'Miura 5', 'spectrum': 'Spectrum (rocket)', 'maia': 'MaiaSpace',
  'rfa-one': 'RFA One', 'zephyr': 'Latitude (company)', 'electron': 'Electron (rocket)',
  'new-glenn': 'New Glenn', 'long-march-5': 'Long March 5', 'long-march-8': 'Long March 8',
  'vulcan': 'Vulcan Centaur', 'neutron': 'Neutron (rocket)', 'h3': 'H3 (rocket)',
  'lvm3': 'LVM3', 'soyuz': 'Soyuz-2',
};

// Merge verified overlay over the ETL data (verified fields win, tag confidence)
const mergedRaw = launchersRaw.map((l) => {
  const v = launchersVerified[l.id];
  return v ? { ...l, ...v, confidence: 'verified' } : l;
});
const presentIds = new Set(mergedRaw.map((l) => l.id));
Object.values(launchersVerified).forEach((v) => {
  if (v.id && !presentIds.has(v.id)) mergedRaw.push({ ...v, confidence: 'verified' });
});

const launchers = mergedRaw.map((l) => ({
  ...l,
  propType: propType(l),
  statusGroup: statusGroup(l.status || ''),
  wiki: WIKI_OVERRIDE[l.id] || l.name,
}));

// Attach coordinates + ids to European spaceports
const spaceports = spaceportsRaw.map((sp) => ({
  ...sp,
  coords: spaceportCoords[sp.id] || null,
  statusGroup: statusGroup(sp.status2025 || sp.status || ''),
}));

// Enrich CSG pads with canonical ELA designations (shared CSG view ↔ drawer)
const csgPads = csgLaunchpads.map((p) => ({ ...p, ...(PAD_CANON[p.id] || {}) }));

// ── Lookup indices ──────────────────────────────────────────────────────────
const byId = (arr) => Object.fromEntries(arr.map((x) => [x.id, x]));
export const launcherById = byId(launchers);
export const spaceportById = byId(spaceports);
export const companyById = byId(companies);
export const institutionById = byId(institutions);
export const padById = byId(csgPads);
export const countryById = byId(countries);
export const countryByMapName = Object.fromEntries(countries.filter((c) => c.mapName).map((c) => [c.mapName, c]));

// ── Relational helpers ──────────────────────────────────────────────────────
export function companyForLauncher(launcherId) {
  return companies.find((c) => (c.launchers || []).includes(launcherId)) || null;
}
export function companiesForSpaceport(spaceport) {
  // crude name match against partners text
  const t = (spaceport?.partners || '').toLowerCase();
  return companies.filter((c) => t.includes(c.name.toLowerCase().split(' ')[0]));
}
export function launchersForSpaceportText(spaceport) {
  const t = `${spaceport?.compatibility || ''}`.toLowerCase();
  return launchers.filter((l) => l.name && t.includes(l.name.toLowerCase()));
}
export function padForLauncher(launcher) {
  const t = (launcher?.spaceportPad || '').toLowerCase();
  if (/ela-?4|ariane 6|ariane 4 complex/.test(t)) return padById['ensemble-de-lancement-ariane-4'];
  if (/elv|ela-?1|vega/.test(t)) return padById['ensemble-de-lancement-vega'];
  if (/elm|multilanceur|diamant/.test(t)) return padById['ensemble-de-lancement-multilanceurs'];
  if (/els|soyouz|soyuz/.test(t)) return padById['ensemble-de-lancement-soyouz'];
  return null;
}

// ── Exports ─────────────────────────────────────────────────────────────────
export {
  launchers, spaceports, csgPads as csgLaunchpads, propulsion, criticalMaterials,
  groundInfra, spaceStats, launchLog, narratives, launcherClass,
  worldSpaceports, testCentres, institutions, companies, governanceTriangle, countries,
  launches, launchStats,
  satPopulation, byOrbit, byOperator, byType, debrisStats, euConstellations,
  // CRM — matières premières critiques
  crmMaterials, crmById, crmaBenchmarks, crmStages, crmInsights, crmCapability,
  crmCountryDominance, crmMaxScore, CRM_COUNTRY, BLOC_LABEL,
  // REACH / PFAS
  pfasFamilies, pfasFamilyById, pfasFunctions, pfasFunctionById, pfasComponents,
  pfasByFamily, pfasByFunction, pfasRestriction,
};
