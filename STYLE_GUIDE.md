# Style Guide — Space Expert

Esthétique **aérospatial / OSINT**, dark-mode par défaut, info-dense.

## Palette (Tailwind)

| Rôle | Classe | Hex |
|---|---|---|
| Fond app | `bg-slate-950` | #020617 |
| Surface carte (`.panel`) | `bg-slate-900`/#0f172a | #0f172a |
| Surface élevée (`.panel-raised`) | `bg-slate-800` | #1e293b |
| Bordure | `border-slate-700/800` | #334155 / #1e293b |
| Texte | `text-white` / `text-slate-300` / `text-slate-500` | |
| Accent bleu | `text-blue-400` | #60a5fa |
| Accent or (EU) | `text-amber-400` | #fbbf24 |
| Succès / danger | `text-green-400` / `text-red-400` | |
| Océan (cartes) | — | #071525 / #1e3a5f land |

## Tokens & primitives

- `.panel`, `.panel-raised`, `.grid-bg` (fond grillagé), `.tabular` (chiffres mono) → `index.css`.
- Composants réutilisables → `src/components/common/ui.jsx` :
  `Badge` (tones: blue/amber/green/red/indigo/slate/gold), `StatCard`, `SectionHeader`,
  `Pill`, `KeyVal`, `Chip` (lien relationnel), `MultiLine`, `statusTone()`.
- Cartes : `rounded-2xl`/`rounded-xl`, `shadow-xl`. Badges : `rounded-full`.

## Typo

- Titres : `text-xl font-bold text-white`. Sections : `text-[11px] uppercase tracking-wider text-slate-500 font-bold`.
- Corps : `text-sm text-slate-300 leading-relaxed`. Données : `.tabular` (JetBrains Mono).
- Police : Inter (UI) + JetBrains Mono (chiffres).

## Couleurs de statut

`statusTone(status)` (ui.jsx) : vert = opérationnel/actif, ambre = dev/licence,
rouge = retiré/annulé/withdrawn, slate = concept/étude.

## Cartes (markers)

Or `#fbbf24` = spaceports · rose `#f472b6` = bancs d'essai · bleu `#60a5fa` =
institutions · vert `#34d399` = industriels. Pays cliquables = fill `#27508a`.

## Règle

Pas de nouvelle dépendance UI sans l'inscrire dans `CLAUDE.md` + `CHANGES.md`.
Icônes : **lucide-react uniquement**.
