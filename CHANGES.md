# CHANGES — Space Expert

## Session 4 — 17 juil. 2026 · Claude Opus 4.8 — CRM & REACH/PFAS (v0.4)

Chaîne de valeur matières au niveau « décision-grade » : deux nouveaux modules séparés
(→ 13 entrées sidebar, nouveau groupe **Matières & chaîne de valeur**). L'ancien module
« Matières critiques » (ergols) est renommé **Ergols & chimie**.

- **Module CRM & matières critiques** (`materials/CRMModule.jsx`, `curated/crm.js`) :
  ~21 matériaux avancés (Ti, fibres C, superalliages Ni, Re, Hf, Nb, Ta, Be, Ga, Ge, In,
  SiC, GaN, terres rares/aimants, Sm, W, graphite, UHTC, carbone-phénolique, quartz).
  4 onglets : **Carte & dépendances** (choroplèthe mondiale — pays colorés par intensité
  de dépendance, bulles, clic pays → matériaux dominés, légende/%), **Tableau** (drapeau
  source + risque + dépendance + CRMA), **Chaîne de valeur** (raw→processed→advanced→
  recyclé), **Insights UE** (scorecard CRMA 10/40/25/65 · timeline contrôles export Chine ·
  mapping matière→capacité spatiale). Fiche `crm` cross-linkée dans le drawer.
- **Module REACH / PFAS** (`materials/PFASModule.jsx`, `curated/pfas.js`) : liste de ~250
  composants fluorés satellites **nettoyée + dédupliquée + classée par règles regex** →
  ~15 familles (PTFE, PVDF, ETFE, FEP, PFA, PFPE, FKM, FFKM…). 4 onglets : **Familles**,
  **Analyses** (recharts par fonction/famille + exposition substitution), **Inventaire**
  (filtrable famille/fonction), **Réglementation** (timeline restriction universelle REACH,
  avis RAC 2 mars 2026 / SEAC 26 mars 2026, dérogations aéro/défense, enjeu autonomie).
- **Carte** : `maps/WorldMap.jsx` étendu (prop `fillFor(geo)` rétro-compatible → choroplèthe).
- **Faits web-vérifiés (juil. 2026)** tagués `✓ vérifié` + sources : CRMA (Règl. (UE)
  2024/1252, 10/40/25/65) ; domination Chine (>80 % TR, ~90 % aimants, >90 % Ga) +
  contrôles export 2024-2025 ; niobium Brésil ~85-90 % ; RAC/SEAC PFAS 2026. La table CRM
  utilisateur reste `~ DB interne` ; parts (%) fines non re-vérifiées.
- **Cross-links** : CRM/PFAS indexés dans la recherche globale (Ctrl-K) ; PFAS → module
  Politique. 13 modules, build OK.

## Session 3 — 19 juin 2026 · Claude Opus 4.8 — Expansion (v0.3)

Restitution complète de l'Excel + nouveaux modules visuels (visual-learner).

- **Markers de cartes corrigés** : taille visuelle constante au zoom (`r = base/zoom` +
  `vector-effect: non-scaling-stroke`) sur toutes les cartes.
- **Module Lancements** (`launches/LaunchModule.jsx`) : **timeline visuelle** par année,
  passés + à venir, filtres programme (Galileo/Copernicus/IRIS²/Défense/Commercial) & période.
  `launches.js` enrichi (Galileo sur Falcon 9 = dépendance SpaceX, IRIS² 2029).
- **Module Statistiques** (`stats/StatsModule.jsx`) : satellites par orbite/opérateur/type
  (pie/bars recharts), débris, **coûts** (Excel), **matrice classes de lanceurs** (Micro→Super-heavy :
  payload, coût, acteurs, marché, caractéristiques, analyse autonomie EU) depuis `Launchers Class`.
  Données 2026 web-vérifiées (≈14 500 sat. actifs, 88 % LEO, Starlink ≈10 400) + `curated/stats.js`.
- **CSG en profondeur** (`curated/csg.js`) : onglets **Vue · Pas de tir (tableau) · Infrastructures
  (criticité) · Cheminements (lanceur + satellite) · Dossier**. Facilités vérifiées (EPCU S1/S3/S5,
  BAL, BAF, UPG, ELA-4, Jupiter…) + points critiques uniques. Cheminements ordonnés avec criticité.
- **Test facilities** : dossier narratif (`Other Facilities`) affiché dans Spaceports.
- **Tableaux + drapeaux** : `flagCode()` + `<FlagIcon>` dans le tableau lanceurs (122 drapeaux),
  tableau Matières (CRM : REACH/PFAS/risque), tableau Pas de tir CSG.
- **Sidebar repliable** (240→56 px, persistée). 11 modules, build OK, 0 erreur runtime.

## Session 2 — 19 juin 2026 · Claude Opus 4.8 — Refinement & Hardening (v0.2)

Passe « décision-grade » sur retour utilisateur (DG DEFIS).

- **Tableaux comparatifs** : nouveau `common/DataTable.jsx` (tri colonne, sticky, dense type Excel).
  Onglets **Tableau / Cartes** sur Lanceurs & Spaceports.
- **Lanceurs TRL 3-9** : le défaut ne cache plus les lanceurs en développement ; filtre TRL + colonne ;
  filtre « ✓ Vérifié ». Les 141 lanceurs EU s'affichent (851 mondiaux).
- **Modèle de fiabilité** : badges `✓ vérifié (source)` · `~ DB interne` · `⚠ à confirmer` (`Confidence` dans ui.jsx).
- **Overlay vérifié** `curated/launchersVerified.js` : ~30 lanceurs (Ariane 62/64, Vega-C/E, Maia, Spectrum,
  Miura 5, RFA, Falcon 9/Heavy, Starship, Electron, New Glenn, Vulcan, Long March, H3, LVM3, PSLV, Soyuz-2) — specs web-vérifiées + sources.
- **ETL** : parser `bullets()` (restructure les champs « — » en listes propres) ; `dedupe_ids()` (corrige
  les ids dupliqués `ariane-44p-h10` → warnings React supprimés).
- **Carte spaceport corrigée** : projection sphérique → `maps/WorldMap.jsx` plat partagé (cohérent avec la stratégique).
- **Lancements** : `curated/launches.js` (log vérifié VA262→VA269, VV24→VV29, Spectrum F1/F2…) + timeline dashboard ;
  feuille Excel « Launch » = roadmap Copernicus séparée.
- **ECF = European Competitiveness Fund** (MFF 2028-2034, fenêtre défense & espace ≈ 131 Md€) ; `policy.js` réécrit + viz budget.
- **Pays** : `curated/countries.js` re-vérifié (ESA 2025 : DE 1,17 / FR 1,05 / IT 0,80 Md€) + 9 pays ajoutés (BE/NL/CH/SE/NO/LU/PL/JP/IN/RU) ; grille pays cliquable sur la carte.
- **2 recherches** : palette **globale Ctrl-K** (`common/GlobalSearch.jsx`, indexe toutes les entités) + recherche-filtre interne aux Lanceurs.
- Store `version: 2` (purge des filtres persistés v0.1). Build prod OK ; 9 modules, 0 erreur runtime.

## Session 1 — 18–19 juin 2026 · Claude Opus 4.8 (Claude Code)

**Création complète du portail (v0.1).**

### Socle
- Scaffold Vite + React 18 + Tailwind 3.4 + Zustand (port 3200), design system OSINT
  dark-mode calqué sur `eu-expert`.
- Store `useAppStore` : `viewMode`, `selectedEntity` + `entityStack` (cross-link),
  filtres lanceurs, calques carte.

### Données
- **ETL** `scripts/etl_excel_to_json.py` (openpyxl) : `Database.xlsx` (15 feuilles) →
  `src/data/*.json`. Nettoyage : `#NAME?/#VALUE!`, `\xa0`, notes `[n]`, regroupement
  des launchpads multi-lignes, parsing coords GPS, fusion monde/EU (849 lanceurs / 141 EU).
- **Curated** (`src/data/curated/`) : `geo.js`, `ecosystem.js` (institutions + industrie),
  `policy.js`, `countries.js`, `process.js`.

### Vérification factuelle (web, juin 2026) appliquée
- Orbex retiré du ELC / redressement (fév. 2026) ; ELC ≈ 902 M€ (nov. 2025) ;
  Isar Spectrum 2ᵉ vol (~18 juin 2026, Andøya) ; PLD Miura 5 (CSG/ELM, levée 209 M$) ;
  MaiaSpace Maia (ex-pad Soyouz, inaugural ~2027) ; CSG : ELA-4=Ariane 6, ZLV=Vega-C,
  ELA-3→Vega-E, ELM (ex-Diamant) ; EU Space Act proposé 25 juin 2025 (3 piliers).

### Modules (9)
Dashboard · Lanceurs & Propulsion (grille + filtres + comparateur Recharts + fiches +
propulsion) · Spaceports (carte Europe + cartes + infra + tests) · CSG (schéma SVG GPS +
fiches pads + Ariane 6) · Carte stratégique (calques + fiches pays cliquables) ·
Gouvernance (triangle EC/ESA/EUSPA + agences + industrie) · Politique (Space Act + Art. 65
+ FFPA + ELC) · Matières critiques (REACH/PFAS) · Cycle de vie (8 phases).

### Vérifié
- 9 modules rendent sans erreur runtime ; cross-link drawer (Ariane 6 → ELA-4) OK ;
  clic carte → fiche pays OK ; build prod OK (8.4 s).

### À faire (prochaines sessions)
- Brancher les chiffres budgétaires réels (ECF / Art. 65 / FFPA) depuis les Excel internes.
- Enrichir fiches pays & journal de lancements ; option bilingue FR/EN.
- Assets PNG propres de l'utilisateur dans `public/` (remplacent les fetch Wikimedia).
