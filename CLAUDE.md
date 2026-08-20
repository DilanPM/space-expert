# CLAUDE.md — Space Expert

Guidance for Claude Code / Antigravity working in this repo.

## Projet

**Space Expert** — portail SSOT (Single Source of Truth) interactif pour la
**DG DEFIS – Unité D1 (Space Policy)** de la Commission européenne. Couvre
l'accès à l'espace européen : lanceurs, propulsion, spaceports, infrastructures
critiques, test facilities, CSG, politique/droit (EU Space Act, Art. 65, ECF,
FFPA), gouvernance (EC/ESA/EUSPA) et matières critiques.

SPA dark-mode, esthétique « aérospatial/OSINT », info-dense, cartes interactives,
bases de données filtrables, comparateurs, et **fiches reliées entre elles**
(cliquer Ariane 6 → ELA-4 → ArianeGroup → propulsion). **Français d'abord.**

## Stack

React 18 · Vite 5 · Tailwind 3.4 · Zustand 4.5 (persist) · react-simple-maps 3
(cartes) · recharts 2 (graphes) · framer-motion (transitions/drawer) ·
lucide-react (icônes) · flag-icons. Pas de backend — tout est statique/JSON.

## Commandes

```bash
npm install
npm run dev        # http://localhost:3200
npm run build      # -> dist/
npm run etl        # Database.xlsx -> src/data/*.json (Python + openpyxl)
```

## Pipeline de données (IMPORTANT)

La source de vérité brute est **`Database.xlsx`** (15 feuilles, fournie par
l'utilisateur). Le script **`scripts/etl_excel_to_json.py`** la nettoie et écrit
`src/data/*.json`. Si l'utilisateur met à jour l'Excel → relancer `npm run etl`.

Le nettoyage gère : erreurs de formules `#NAME?/#VALUE!`, lignes fusionnées des
launchpads, colonnes dupliquées, parsing des coordonnées GPS (`5.2°N 52.7°W` →
`[lon, lat]`), fusion monde/EU des lanceurs.

**Données curées (hors Excel)** dans `src/data/curated/*.js` — hand-authored,
web-vérifiées : `geo.js` (coords spaceports/test), `ecosystem.js`
(institutions/industrie), `policy.js` (Space Act, **ECF = European Competitiveness
Fund**, FFPA), `countries.js` (17 pays + chiffres ESA vérifiés), `process.js`
(cycle de vie), `launchersVerified.js` (~30 lanceurs héros vérifiés, mergés sur
l'ETL par `id`), `launches.js` (log de lancements EU vérifié), `crm.js` (~21 matières
premières critiques + sourcing par stade + agrégats pays pour la choroplèthe + CRMA),
`pfas.js` (~15 familles de fluoropolymères + inventaire ~250 composants classés par regex
+ restriction REACH).
⚠️ Champs budgétaires (ECF/Art. 65/FFPA montants fins) = placeholders à confirmer.
⚠️ Table CRM = `~ DB interne` (fournie par l'utilisateur) ; seuls CRMA, domination Chine
(TR/Ga/Ge), niobium Brésil et le calendrier RAC/SEAC PFAS sont `✓ vérifié` + sources. Les
parts (%) fines restent à confirmer.

**Modèle de fiabilité** : chaque enregistrement porte `confidence`
(`verified` | `internalDB` | `toConfirm`) + `sources?`. Badge `<Confidence>` (ui.jsx).
ETL → `internalDB` ; overlays curés → `verified`. Ne jamais inventer un fait
« vérifié » sans source réelle.

`src/data/index.js` = couche centrale : charge JSON + curated, dérive des champs
(`propType`, `statusGroup`, `wiki`), construit les index (`launcherById`,
`spaceportById`, `countryByMapName`…) et les helpers relationnels
(`companyForLauncher`, `padForLauncher`). **Importer les données depuis ce fichier.**

## Architecture

```
src/
  App.jsx                  # shell : sidebar 13 modules + header + router viewMode
  store/useAppStore.js     # Zustand (viewMode, selectedEntity, filtres, mapLayers)
  data/
    index.js               # couche données centrale (ETL + curated + helpers)
    *.json                 # sortie ETL (NE PAS éditer à la main → éditer l'Excel)
    curated/*.js           # données hand-authored (éditables)
  components/
    Dashboard.jsx
    common/   SpaceImage · ui.jsx (Badge/StatCard/Pill/Chip/Confidence/BulletList) ·
              FlagIcon · EntityDrawer · DataTable (tri/sticky) · GlobalSearch (Ctrl-K)
    launchers/ LaunchersModule (onglets Tableau/Cartes) · Comparator · PropulsionTab
    maps/     WorldMap (base plate partagée) · StrategicMap
    spaceports/ · csg/ · governance/ · policy/ · materials/ · process/
```

## Patterns clés

1. **Navigation** : `useAppStore.viewMode` ↔ `App.jsx` `MODULES` map. `setViewMode(mode)`.
2. **Fiches reliées (drawer)** : `openEntity(type, id)` ouvre `EntityDrawer` qui
   dispatche selon `type` (`launcher|spaceport|pad|company|institution|material|country`).
   Pile `entityStack` pour le retour. Tout cross-link passe par là.
3. **Images** : `<SpaceImage query="Ariane 6" />` — fetch Wikimedia REST lazy +
   cache + placeholder fallback. `query` = titre de page Wikipédia.
4. **Cartes** : react-simple-maps `ComposableMap/Geographies/Marker/ZoomableGroup`,
   geojson world-atlas via CDN. Markers `onClick` → `openEntity`. Le CSG utilise une
   projection SVG custom (coords GPS réelles des pads).
5. **Design** : voir `STYLE_GUIDE.md`. Dark slate-950, accents bleu + or, `panel`/
   `panel-raised` (index.css), composants dans `common/ui.jsx`.

## Conventions

- Ne JAMAIS éditer `src/data/*.json` à la main (régénérés par l'ETL) — éditer
  `Database.xlsx` puis `npm run etl`, OU les overlays dans `curated/`.
- Toute nouvelle entité reliable → ajouter un cas dans `EntityDrawer.jsx`.
- Icônes : lucide-react uniquement. Pas de nouvelle lib sans l'inscrire ici + CHANGES.md.
- Facteur de vérité factuelle : préférer les corrections web-vérifiées (cf. CHANGES.md)
  quand l'Excel est daté.
