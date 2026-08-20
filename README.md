# 🛰️ Space Expert — EU Access to Space

Portail SSOT (Single Source of Truth) interactif pour la **DG DEFIS – D1**
(politique spatiale européenne). Lanceurs, propulsion, spaceports, CSG,
infrastructures critiques, politique/droit & gouvernance — en un seul outil
dark-mode, info-dense et hautement interactif.

## Démarrage

```bash
npm install
npm run dev        # → http://localhost:3200
```

Mettre à jour les données depuis l'Excel source :

```bash
npm run etl        # Database.xlsx → src/data/*.json  (Python + openpyxl)
```

## Modules

| | Module | Contenu |
|---|---|---|
| 🛰️ | **Tour de contrôle** | KPIs, bandeau live, journal de lancements, tracker Space Act |
| 🚀 | **Lancements** | Timeline visuelle passés + à venir (Galileo, Copernicus, IRIS²) |
| 📊 | **Statistiques** | Satellites (orbite/type/opérateur), débris, coûts, classes de lanceurs |
| 🚀 | **Lanceurs & Propulsion** | Base mondiale + EU, filtres, **comparateur**, fiches reliées, propulsion |
| 🌍 | **Spaceports & Infra** | 10 ports européens, carte, ground infra, bancs d'essai |
| 🇬🇫 | **CSG — Kourou** | Schéma interactif (GPS) des pas de tir, Ariane 6, dossier |
| 🗺️ | **Carte stratégique** | Calques : sites · tests · institutions · industriels · **fiches pays** |
| 🏛️ | **Gouvernance** | Triangle EC/ESA/EUSPA, agences nationales, industrie |
| ⚖️ | **Politique & Budget** | EU Space Act, Programme/Art. 65, FFPA, ELC |
| ⛏️ | **CRM & matières critiques** | 21 matériaux, **carte mondiale des dépendances**, chaîne de valeur, CRMA |
| 🧴 | **REACH / PFAS** | Familles fluoropolymères, inventaire composants, restriction REACH |
| 🧪 | **Ergols & chimie** | Ergols (hydrazine, HAN, ADN, LOX), REACH, autonomie |
| 🛠️ | **Cycle de vie** | Design → fabrication → lancement → opérations → fin de vie |

## Données

- **Brutes** : `Database.xlsx` → `src/data/*.json` via `scripts/etl_excel_to_json.py`.
- **Curées** (web-vérifiées) : `src/data/curated/*.js`.
- ⚠️ Certains champs budgétaires sont des placeholders à brancher sur les docs internes.

Voir `CLAUDE.md` (architecture) et `STYLE_GUIDE.md` (design).
