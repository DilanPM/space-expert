/**
 * REACH / PFAS dans le spatial — familles de fluoropolymères & fluorochimiques utilisés
 * dans les satellites (liste de composants fournie par l'utilisateur, DG DEFIS).
 *
 * Méthode : la liste brute (`PFAS_RAW`) est nettoyée, dédupliquée et **classée par règles
 * regex documentées** (`FAMILY_RULES` / `FUNC_RULES`) → `pfasComponents`. Les compteurs par
 * famille/fonction sont donc DÉRIVÉS (pas saisis à la main).
 *   - Identité chimique des familles = `verified` (chimie stable).
 *   - Rattachement fonction spatiale = heuristique (`internalDB`).
 *   - Cadre réglementaire (restriction universelle REACH, avis RAC/SEAC 2026) = `verified`
 *     (ECHA, mars 2026).
 */

// ── Fonctions dans un engin spatial (taxonomie) ─────────────────────────────────────
export const pfasFunctions = [
  { id: 'wire', label: 'Isolation câbles & fils', desc: 'Isolants/gaines de câblage, connecteurs, harnais.', substituteRisk: 'difficile' },
  { id: 'seal', label: 'Joints & étanchéité', desc: "Joints toriques, joints EMI, étanchéité (ergols, fluides).", substituteRisk: 'difficile' },
  { id: 'lubrication', label: 'Lubrification', desc: 'Graisses/huiles de mécanismes, roulements, paliers.', substituteRisk: 'difficile' },
  { id: 'thermal', label: 'Contrôle thermique', desc: 'Miroirs seconde surface (OSR) FEP, peintures, MLI.', substituteRisk: 'difficile' },
  { id: 'rf', label: 'Substrats RF / PCB', desc: 'Laminés hyperfréquence PTFE-verre/céramique.', substituteRisk: 'moyenne' },
  { id: 'coating', label: 'Revêtements & films', desc: 'Revêtements, films, gaines thermorétractables.', substituteRisk: 'moyenne' },
  { id: 'solvent', label: 'Solvants de nettoyage', desc: 'Dégraissage de précision (HFE).', substituteRisk: 'moyenne' },
  { id: 'additive', label: 'Additifs / légués', desc: 'Agents mouillants/épitaxie (PFOS/PFOA — traces).', substituteRisk: 'possible' },
  { id: 'other', label: 'Autres / non classé', desc: 'Composés fluorés divers.', substituteRisk: 'variable' },
];
export const pfasFunctionById = Object.fromEntries(pfasFunctions.map((f) => [f.id, f]));

// ── Familles de fluoropolymères / fluorochimiques ───────────────────────────────────
export const pfasFamilies = [
  { id: 'ptfe', name: 'Polytétrafluoroéthylène', abbr: 'PTFE', chemClass: 'Fluoropolymère perfluoré', functions: ['wire', 'rf', 'seal', 'coating'], examples: 'Teflon, PTFE vierge/modifié/expansé (ePTFE), PTFE chargé', reachStatus: 'PFAS — dans le champ de la restriction universelle REACH', substitutability: 'difficile', confidence: 'verified' },
  { id: 'pvdf', name: 'Polyfluorure de vinylidène', abbr: 'PVDF · Kynar', chemClass: 'Fluoropolymère partiellement fluoré', functions: ['coating', 'wire'], examples: 'Kynar, gaines thermorétractables, films', reachStatus: 'PFAS — champ restriction REACH', substitutability: 'moyenne', confidence: 'verified' },
  { id: 'etfe', name: 'Éthylène-tétrafluoroéthylène', abbr: 'ETFE · Tefzel', chemClass: 'Fluoropolymère partiellement fluoré', functions: ['wire'], examples: 'Tefzel, isolants réticulés/irradiés (harnais)', reachStatus: 'PFAS — champ restriction REACH', substitutability: 'difficile', confidence: 'verified' },
  { id: 'fep', name: 'Éthylène propylène fluoré', abbr: 'FEP', chemClass: 'Fluoropolymère perfluoré', functions: ['thermal', 'wire'], examples: 'Miroirs seconde surface (OSR) Ag/Inconel, isolants', reachStatus: 'PFAS — champ restriction REACH', substitutability: 'difficile', confidence: 'verified' },
  { id: 'pfa', name: 'Perfluoroalcoxy', abbr: 'PFA', chemClass: 'Fluoropolymère perfluoré', functions: ['wire', 'coating'], examples: 'Gaines de câbles, tubing', reachStatus: 'PFAS — champ restriction REACH', substitutability: 'difficile', confidence: 'verified' },
  { id: 'ectfe', name: 'Éthylène-chlorotrifluoroéthylène', abbr: 'ECTFE · Halar', chemClass: 'Fluoropolymère', functions: ['coating'], examples: 'Films, revêtements', reachStatus: 'PFAS — champ restriction REACH', substitutability: 'moyenne', confidence: 'verified' },
  { id: 'pfpe', name: 'Perfluoropolyéthers (huiles/graisses)', abbr: 'PFPE', chemClass: 'Fluide perfluoré (PFAS)', functions: ['lubrication'], examples: 'Braycote 815Z, Brayco, type Fomblin', reachStatus: 'PFAS — champ restriction REACH', substitutability: 'difficile', confidence: 'verified' },
  { id: 'fkm', name: 'Fluoroélastomères', abbr: 'FKM · Viton', chemClass: 'Élastomère fluoré (PFAS)', functions: ['seal'], examples: 'Joints toriques Viton, FKM chargés', reachStatus: 'PFAS — champ restriction REACH', substitutability: 'difficile', confidence: 'verified' },
  { id: 'ffkm', name: 'Perfluoroélastomères', abbr: 'FFKM · Kalrez', chemClass: 'Élastomère perfluoré (PFAS)', functions: ['seal'], examples: 'Kalrez 7745 (joints haute performance)', reachStatus: 'PFAS — champ restriction REACH', substitutability: 'difficile', confidence: 'verified' },
  { id: 'fluorosilicone', name: 'Fluorosilicones', abbr: 'FVMQ', chemClass: 'Élastomère fluoré', functions: ['seal'], examples: 'Joints EMI chargés Ag/Ni', reachStatus: 'PFAS — champ restriction REACH', substitutability: 'moyenne', confidence: 'verified' },
  { id: 'laminate', name: 'Laminés RF PTFE-verre/céramique', abbr: 'PTFE-RF', chemClass: 'Substrat composite fluoré', functions: ['rf'], examples: 'Laminés cuivrés hyperfréquence (stripline/microstrip)', reachStatus: 'PFAS (matrice PTFE) — champ restriction REACH', substitutability: 'difficile', confidence: 'verified' },
  { id: 'coating', name: 'Revêtements & liants fluorés', abbr: '—', chemClass: 'Revêtements/peintures fluorés', functions: ['coating', 'thermal'], examples: 'Liant fluoré noir mat (contrôle thermique), acryliques fluorés', reachStatus: 'PFAS — champ restriction REACH', substitutability: 'moyenne', confidence: 'internalDB' },
  { id: 'pfos-pfoa', name: 'PFOS / PFOA (agents légués)', abbr: 'PFOS/PFOA', chemClass: 'PFAS « historiques » (C8)', functions: ['additive'], examples: 'Agents mouillants/épitaxie (traces 0,005 % PFOS)', reachStatus: 'Déjà restreints (Règlement POP UE) — legacy', substitutability: 'possible', confidence: 'verified' },
  { id: 'solvent', name: 'Solvants fluorés', abbr: 'HFE', chemClass: 'Solvant fluoré (PFAS)', functions: ['solvent'], examples: '3M Novec 7200, Solvex HD+ (dégraissage)', reachStatus: 'PFAS — champ restriction REACH', substitutability: 'moyenne', confidence: 'verified' },
  { id: 'other-fluoro', name: 'Fluoropolymère (non spécifié)', abbr: '—', chemClass: 'Fluoropolymère divers', functions: ['other'], examples: '« Fluoropolymer / Fluorinated polymer » sans famille précisée', reachStatus: 'À caractériser', substitutability: 'variable', confidence: 'internalDB' },
];
export const pfasFamilyById = Object.fromEntries(pfasFamilies.map((f) => [f.id, f]));

// ── Classification (règles ordonnées : première correspondance) ──────────────────────
const FAMILY_RULES = [
  [/novec|hydrofluoroether|solvex|degreasing solvent|vapor degreasing|fluorinated solvent/i, 'solvent'],
  [/pfos|perfluoroctansulfonate|epitemilization|epitimilization/i, 'pfos-pfoa'],
  [/kalrez|perfluoroeletomer|perfluoroelastomer|ffkm/i, 'ffkm'],
  [/pfpe|perfluoropolyether|perfluoro\s?poly\s?ether|perfluoroalkylpolyether|perfluoralkylether|perfluoroalkylether|braycote|brayco|815z|fomblin/i, 'pfpe'],
  [/laminate|cu-?clad|copper clad|stripline|microstrip|dielectric constant|ptfe-?filled ceramic|ceramic glass ptfe|ceramic\/ptfe|ptfe\/glass/i, 'laminate'],
  [/fluorosilicone|fluoro\s?silicone/i, 'fluorosilicone'],
  [/viton|\bfkm\b|fluoroelastom|fluorocarbon rubber|fluor caoutchouc|fluoro-?carbone|hexafluoropropylene|vinylidene fluoride, ?hex|hexfp|fluorocarbon \(/i, 'fkm'],
  [/kynar|pvdf|polyvinylidene|polyvinylidène|polyvinylid|poly\(vinylidene|vinylidenfluorid|vinyldene|viniylidene|polyvinilidene|polyvinlyidene|polyfluorure de vinylidene|polyvinylidène/i, 'pvdf'],
  [/tefzel|etfe|efte|ethylene ?tetra ?fluoro ?ethylene|ethylen tetrafluorethylen|ethylene tetrafluorothylene|ethylene tfe|tetra fluoro ethylene copolymer/i, 'etfe'],
  [/\bfep\b|fluorinated ethylene propylene|fluorethylpropylene/i, 'fep'],
  [/\bpfa\b|perfluoroalkoxy|perfluoralkoxy|fluorololymer resin/i, 'pfa'],
  [/ectfe|e-?ctfe|chlortrifluoroethylene|chlorotrifluoroethylene/i, 'ectfe'],
  [/ptfe|teflon|polytetrafluor|politetrafluor|polytetra ?fluor|poly tetra fluoro|tetrafluoro ?ethylene|tetrafluoroe? ?thylene|celloflon/i, 'ptfe'],
  [/binder|pigment|matt black|fluorochemical acrylic|fluoraliphatic|acrylic polymer|varnish|coating/i, 'coating'],
  [/fluor|fluoro|flouro|fuoride|fluoride/i, 'other-fluoro'],
];
const FUNC_RULES = [
  [/novec|solvent|degreas|solvex|hydrofluoroether/i, 'solvent'],
  [/pfos|epitemilization|epitimilization|wetting|fluorescent agent/i, 'additive'],
  [/grease|thickener|lubric|815z|braycote|brayco|\boil\b|fomblin|pfpe|perfluoropolyether|perfluoroalkylpolyether|vacuum grease/i, 'lubrication'],
  [/laminate|cu-?clad|copper clad|stripline|microstrip|dielectric constant|\bpcb\b|substrate|prepreg/i, 'rf'],
  [/gasket|o-?ring|\bseal\b|elastomer|viton|kalrez|rubber|caoutchouc|\bfkm\b|ffkm/i, 'seal'],
  [/insulat|conductor|\bwire\b|cable|\bawg\b|\bspc\b|braid|jacket|silver plated|silver coated|silver-plated|ag plated|ag-plated|plated copper|plated cu|copper wire|hook-?up|heat shrink|shrinkable|tubing|conduct/i, 'wire'],
  [/inconel|second surface|\bosr\b|matt black|thermal|\bfep\b/i, 'thermal'],
  [/coat|film|paint|binder|pigment|varnish|alodine/i, 'coating'],
];
function matchRules(rules, text, fallback) {
  for (const [re, id] of rules) if (re.test(text)) return id;
  return fallback;
}
// Fonction primaire par famille — utilisée quand aucun mot-clé fonctionnel explicite
// n'est présent (ex. une entrée « PTFE » ou « Kynar » sans contexte).
const FAMILY_PRIMARY_FN = Object.fromEntries(pfasFamilies.map((f) => [f.id, f.functions[0] || 'other']));
export function classifyPFAS(raw) {
  const t = ` ${raw.toLowerCase()} `;
  const family = matchRules(FAMILY_RULES, t, 'other-fluoro');
  let fn = matchRules(FUNC_RULES, t, null);
  if (!fn) fn = FAMILY_PRIMARY_FN[family] || 'other';
  return { family, function: fn };
}

// ── Liste brute des composants (fournie par l'utilisateur) ──────────────────────────
export const PFAS_RAW = [
  'Fluorochemical acrylic polymer carried in a hydrofluoroether solvent',
  'Fluoroelast. (Carbon)', 'White polyvinylfluoride with acrylic adhesive', 'PTFE/Silicone',
  'Fluorocarbon based vacuum grease — base oil: Braycote 815Z', 'Perfluoropolyether',
  'Epitemilization agents: fluoraliphatic polymers and 0.005% of PFOS (perfluoroctansulfonates)',
  'Perfluoropolyether / NLGI 2 Grease perfluorinated polyether base oil', 'Perfluoralkylether (PTFE Oil)',
  'Perfluorinated polyether', 'Perfluoralkylether (PFPE)', 'Perfluoralkylether', 'Perfluoropolyether + PTFE',
  'Fluorinated polymers', 'Copper clad laminate, PTFE-glass and ceramic with dielectric constant = 2.94',
  'Fluoroelastomers / Fluorocarbon (FKM)', 'Fluoroelastomer', 'Fluocarbon', 'Perfluoroeletomer Kalrez 7745',
  'Viton A Fluor Caoutchouc', 'Fluorelastomer', 'modified PTFE', 'Flouropolymer', 'Poly-vinylidene-Fluoride',
  'Thermoplastic PVDF (polyvinylidene fluoride)', 'Virgin PTFE', 'Polyvinylidene fluoride (PVDF)',
  'Modified Fluoropolymer', 'POLYVINYLDENE FLUORIDE', 'Ethylen Tetrafluorethylen (ETFE)', 'Fluorocharbon',
  'Viton (Fluoroelastomers) Sumitube HTS-FE3', 'Fluoro-polymer', 'Modified Polyvinylidenfluorid (PVDF)', 'PTFE',
  'Carbonized PTFE Gasket tape', 'Kynar / Flouropolymer', 'Polyvinylidene fluoride (PVDF) Heat shrinkable tubing',
  'Perfluoralkoxy', 'Perfluoralkoxy / PFA', 'Polyvinylidène fluoride modified, irradiated', 'Polyvinylidene Flouride',
  'Fluoropolymer', 'Polyvinylidene fluoride',
  '8.0 wt% fluorinated polymer (solvent 3M Novec 7200 Engineered Fluid and <5% of PGMEA)',
  'Polytetrafluorethylen (PTFE)', 'Kynar RW-175-x', 'Kynar', 'Polyvinylidene Fluoride (PVDF) KYNAR',
  'Fluoropolymer Radiation-Crosslinked', 'Polyvinilidene flouride (PVDF)', 'Polytetrafluoroethylene',
  'Polyvinylidène Fluoride Kynar', 'EFTE Fluorpolymère TEFZEL', 'Polyester / ePTFE / Acrylate adhesive', 'PVDF',
  'Cu alloy, Ag plated PTFE insulated', 'PTFE insulated copper wire and cable',
  'Crosslinked, fluoropolymer insulated, copper wire and cable', 'PTFE enameled glass filaments',
  'Expanded PTFE wire insulation', 'ETFE Crosslinked Extruded with Silver Coated Copper Conductor',
  'Polyvinylidene fluoride tubing', 'ePTFE over CDA101 (Cu 99.96)', 'SILVER FILLED FLUOROELASTOMERE',
  'Fluorinated polymer', 'Expanded PTFE', 'Polytetra Fluorethylene', 'Ceramic/PTFE', 'CERAMIC REINFORCED PTFE',
  'Fluoropolymer rubber', 'Polyvinyldene fluoride', 'Flouoropolymer', 'ETFE Ethylene-tetra-fluoro-ethylene (blue)',
  'Polyvinylidene difluoride', 'PVDF, poly(viniylidenefluoride) = Kynar', 'polyviniylidenefluoride',
  'POLYVINYLIDENE FUORIDE', 'Polyvinylidene fluoride (Kynar)', 'Polytetraflourethene', 'POLYTETRAFLUORO ETHYLENE',
  'Tefzel Fluoropolymer', 'PTFE-filled ceramic PCB + Copper metallization + Sn/Pb solder finish (hot oil reflow)',
  'ETFE Fluoropolymer', 'Polyvinylidenfluoride', 'EFTE', 'ePTFE', 'TEFZEL (ETFE MODIFIED)', 'ETFE MODIFIED',
  'Polytetrafluoroethylene (PTFE)', 'Fluorololymer resin (Perfluoroalkoxy)', 'Polyvinylidene fluoride / Wax',
  'Tefzel (modified ETFE)', 'ITO/Teflon/Silver', 'Fluorpolymer', 'ETFE',
  'PTFE insulation, PTFE dielectric, PFA jacket, silver coated copper', 'PTFE insulation Silver (Ag) coated copper',
  'Polyimide, PTFE, copper, silver', 'Insulant: PTFE type CR — Conductor: OFHC copper, silver plated',
  'PI / Fluoro thermo-plast insulated wire', 'COPP. SILVER COATED + PTFE POLYM / KAPTON VARNISH',
  'PTFE/PFA jacket / PTFE insulation / polyimide / expanded PTFE insulation / silver-plated copper conductor',
  'Ins: expanded PTFE, Cond: Cu, Ag coated', 'Polyimide insulation, PTFE dielectric, silver coated copper',
  'Cu/Ag/ETFE', 'Cu+Ag/ePTFE/Cu+Ag/Cu+Ag/ETFE', 'PTFE impregnated with synthetic rubber finish',
  'Fluorinated polymer (solid)', 'PTFE coated fibre glass', 'PTFE coated fiber glass sewing thread', 'Quartz/PTFE',
  'Quartz, PTFE, Glass Fibres', 'PTFE, Carbon Fibres', 'PTFE coated Fibre glass with graphite',
  'PTFE + CERAMIC PARTICULES + GLASS MICRO-FIBER', 'Fully fluorinated fluid', 'Fluorinated fluid (polymer)',
  'Fluoroelast. (Silver filled)', 'Partially fluorinated ethers',
  'Chromium (III) oxide / Potassium (various forms) / Sodium fluoride', 'Fluorocarbon binder / silver pigment',
  'PFPE with PTFE thickener', '21.6% carbon, 9.4% oxygen, 69.0% fluorine',
  'Perfluoroalkylpolyethers (PFPE) base oil (Brayco 815Z) with Polytetrafluorethylene (PTFE) thickener particles',
  'PTFE based coating', 'Base oil: Perfluorinated polyether', 'Perfluoroalkylpolyethers (PFPE Oil)',
  'fluoraliphatic polymer, PFOA-free', 'perfluorinated polyether based fluid', 'Polytetraflourethylen (PTFE)',
  'Cu-clad ceramic glass PTFE laminate (M15.019), with or without Al hardback. Stripline filters: bare Cu; microstrip PCB backing: Au-plated',
  'Ceramic/PTFE/Glass fibre', 'Hexafluoropropylene (HFP) and vinylidene fluoride (VF₂)', 'Fluorocarbon rubber',
  'CARBON LOADED PTFE + ACRYL ADHESIVE', 'fluorosilicone', 'ETHYLENE TFE COPOLYMER',
  'Translucent polyvinylidene fluoride', 'Chlortrifluoroethylene (E-CTFE)', 'Modified Poly Vinyldene Fluoride',
  'KYNAR (Polyvinylidene fluoride)', 'Kynar = Modified Poly(Vinylidene Fluoride)', 'PVDF Polyvinylidenfluorid',
  'Teflon FEP (Fluorinated ethylene propylene) / Silver / Inconel', 'Silver and Inconel coated Fluorocarbon (FEP)',
  'Kynar (Polyvinylidenfluorid)', 'ETFE (Ethylene-tetrafluorethylene) by dupont', 'PTFE + Polyester', 'PTFE + CaSiO3',
  'Kynar - Modified Polyvinylidenfluorid (PVDF)', 'Cu + Ag (2µm) + PTFE', 'PTFE / FPA',
  'Ag plated stranded Cu, ETFE insul.', 'Polymide-fluorothermoplast', 'Cu wire, Ag plated 2µ, PTFE insulation',
  'Extruded, radiation modified cross-linked fluoropolymer (ETFE) insulated wire on silver-plated copper alloy conductor',
  'Ag plated, stranded Cu, Polyimide/PTFE', 'Cu/Ag (2micron) + ETFE', 'TFE Fluorocarbon coated e-glass',
  'Conductor: silver plated high strength copper alloy — Insulation: radiation crosslinked modified fluoropolymer',
  'Silver coated copper modified fluoropolymer insulated', 'Ag-plated Cu stranded cable, PTFE jacket, PI',
  'Ag-Plated Cu stranded cable, PTFE jacket', 'Polyimide tape, silver plated copper, PTFE tape — electrical wire',
  'Crosslinked ETFE insulation, standard version', 'PI and PTFE Insulating Layer', 'PTFE insulated', 'Cu/PTFE/PI/PI',
  'Stranded silver plated Cu conductor / expanded PTFE / PTFE tape / silver plated copper braided shield / extruded PFA insulation',
  'ESCC 3901 012 03 / Silver plated copper braided shield / Extruded ETFE insulation',
  'ethylene-tetrafluoroethylene', 'PTFE wrapped polyimide tape for jacket',
  'Polyimide insulation on core; silver plated copper braid; wrapped PTFE over wrapped polyimide tape for jacket',
  'Polyvinylidene Fluoride (PVDF) KYNAR',
  'Twisted silver plated copper wire with extruded crosslinked ethylene tetrafluoro-ethylene (ETFE) insulation',
  'Silver plated copper wire with extruded crosslinked ETFE insulation',
  'Silver plated copper, PTFE dielect., Tefzel jacket', 'copper silver plated clad, solid conductor (ETFE)',
  'silver coated plated; insulation: fluoropolymer', 'Conductor: silver-plated copper, Insulation: Polyimide or PTFE',
  'Cu/Ag/PTFE/braiding', 'Copper, silver-coated, polytetrafluoroethylene insulated',
  'Stranded/solid core silver plated high-strength copper conductor. Extruded cross-linked ETFE insulated wires. 2µm Ag plating',
  'Silver plated single Cu, PTFE insulated 2µm Ag', 'Fluoropolymer (Ethylene tetrafluoroethylene (ETFE))',
  'Silver plated Cu modified ETFE', 'Vapor degreasing solvent, SOLVEX HD+ (blend of fluorinated solvents)',
  'Perfluoropolyethers CF3-(O-CF(CF3)-CF2)n-(O-CF2)m-O-CF3', 'Irradiated Tefzel (crosslinked ETFE)',
  'Polytetrafluoroethylene (PTFE) Coated Fiberglass', 'boron compounds, fluorides',
  'Alodine 1200 (chromic acid + fluoride accelerator) + Nitric acid', 'Viton A Fluor Caoutchouc',
  'Fluorosilicone with silver/nickel filler', 'Fluoro-carbone', 'polyfluorure de vinylidène PVDF',
  'Ethylene Tetra Fluoro Ethylene (ETFE)', 'Politetrafluoroethylene', 'POLYTETRA FLUOROETHILENE',
  'Ethylene tetrafluorothylene', 'Fluorethylpropylene', 'PVDF Polyvinylidenfluorid (modified)',
  'Polyvinylidene Fluoride Kynar', 'Polyvinlyidene Fluoride (Kynar)', 'Polytetrafluorethylene',
  'Stranded copper wire, silver plated, Fluoropolymer insulated', 'Polyimide, Poly Tetra Fluoro Ethylene (PTFE)',
  'Fluorescent agent', 'HT-SCE High temperature Irradiated fluoropolymere', 'Polytetrafluorethylene (PTFE)',
  'Polyamid (PAI) (3% TiO2, 1% PTFE)', 'Fluorosilicone filled with aluminum and nickel',
  'Vinylidene fluoride, hexafluoropropylene, copolymer', 'polytetrafluoroéthylène',
  'PTFE Teflon', 'Crosslinked Fluoropolymer', 'Polyamide-imide, Graphite, PTFE', 'E-CTFE',
  'Fluoropolymer HT-SCE-3/32-2.0-9', 'Ethylene Tetrafluoro Ethylene (TEFZEL)',
  'Fluoroelastomer / Fluorocarbon', 'Cu-Ag radiation modified fluoropolymer',
  'Conductor Cu + silver plated SPC — PTFE insulation', 'Stranded silver plated copper / PTFE shielded',
  'Silver plated copper alloy core, silver plated copper braided shield, PTFE and PFA insulation',
  'Stranded silver plated copper / Expanded PTFE tape (CELLOFLON) / Polyimide tape', 'Cu OFHC + Ag (>2µm); Extruded PTFE/Kapton',
  'Cu, Ag plated PTFE insulated', 'Polyimide & PTFE insulation', 'Pigmented PTFE',
  'Tefzel ETFE Ethylene tetrafluoroethylene copolymer (Fluoropolymer)', 'TETRAFLUORO ETHYLENE', 'Fluoraliphatic Polymer',
  'GLASS / PTFE coated / Graphite weave', 'FLUORCARBON', 'Vinylidene Fluoride, HexFP Copolymer',
  'Fluorure de polyvinylidene', 'Fluorpolymere ETFE (TEFZEL)', 'Teflon (FEP), ITO, Ag, Inconel',
  'Silver coated copper, modified ETFE insulated', 'Insulation: PTFE',
  'Expanded polytetrafluoroethylene (ePTFE) + gaine fluoroplastic',
  'Polytetrafluoroethylene (PTFE) + gaine Fluorinated ethylene propylene (FEP)', 'Crosslinked Fluoropolymer ETFE',
  'Silver plated copper alloy core, silver plated aluminium braided shield, PTFE and Polyimide insulation',
  'Cu-Ag insulation: ETFE', 'Perfluoropolyethers CF3-(O-CF(CF3)-CF2)n-(O-CF2)m-O-CF3', 'Teflon/Silver',
  'Fluorinated binder, matt black', 'Cu-clad ceramic glass PTFE laminate (stripline/microstrip)', 'Tefzel',
  'Tin plated Cu radiation modified ETFE', '57Cu-43Ni, PTFE tape insulated', 'Cu, Ag plated, PTFE/polyimide insulated',
  'Fluorocarbon (KYNAR)', 'PTFE tube',
];

// ── Inventaire nettoyé + classé + dédupliqué ────────────────────────────────────────
export const pfasComponents = (() => {
  const seen = new Set();
  const out = [];
  for (const raw of PFAS_RAW) {
    const label = raw.replace(/\s+/g, ' ').trim();
    const key = label.toLowerCase().replace(/[^a-z0-9]/g, '');
    if (!key || seen.has(key)) continue;
    seen.add(key);
    const { family, function: fn } = classifyPFAS(label);
    out.push({ id: `pfas-${out.length}`, raw: label, family, function: fn });
  }
  return out;
})();

// Compteurs dérivés (attachés aux familles + agrégats fonctions)
pfasFamilies.forEach((f) => { f.count = pfasComponents.filter((c) => c.family === f.id).length; });
export const pfasByFamily = pfasFamilies
  .map((f) => ({ id: f.id, name: f.abbr && f.abbr !== '—' ? f.abbr : f.name, full: f.name, count: f.count }))
  .filter((f) => f.count > 0).sort((a, b) => b.count - a.count);
export const pfasByFunction = pfasFunctions
  .map((f) => ({ id: f.id, name: f.label, count: pfasComponents.filter((c) => c.function === f.id).length, substituteRisk: f.substituteRisk }))
  .filter((f) => f.count > 0).sort((a, b) => b.count - a.count);

// ── Cadre réglementaire (web-vérifié, ECHA mars 2026) ───────────────────────────────
export const pfasRestriction = {
  title: 'Restriction universelle PFAS (REACH)',
  timeline: [
    { date: 'Janv. 2023', event: 'Proposition de restriction universelle déposée à l’ECHA par 5 États (DE, NL, DK, SE, NO).' },
    { date: '2023', event: 'Consultation publique record (> 5 600 contributions).' },
    { date: 'Juin 2025', event: 'Proposition révisée publiée par les États soumissionnaires.' },
    { date: '2 mars 2026', event: 'Avis du RAC (risques) : soutient l’interdiction totale ; seule dérogation retenue = EPI.', tone: 'red' },
    { date: '26 mars 2026', event: 'Projet d’avis du SEAC (socio-éco) : interdiction AVEC dérogations sectorielles proportionnées (jusqu’à 13,5 ans). Consultation ouverte.', tone: 'amber' },
    { date: 'Fin 2026', event: 'Avis final du SEAC attendu.', tone: 'slate' },
    { date: '~2029', event: 'Entrée en application possible de la restriction (post-avis + décision Commission).', tone: 'slate' },
  ],
  tension: 'Arbitrage clé : le RAC (science) vise l’interdiction totale ; le SEAC (socio-économique) privilégie des dérogations sectorielles. La décision finale de la Commission = levier de politique industrielle spatiale.',
  derogations: 'Dérogations envisagées jusqu’à 13,5 ans pour certains usages (dispositifs médicaux, semi-conducteurs, technologies de la transition verte…). L’aérospatial/défense plaide pour des dérogations faute de substitut qualifié à court terme.',
  spaceImpact: 'Le spatial n’a pas de substitut « drop-in » : lubrifiants PFPE (vide, radiation, large plage thermique), isolants de câbles PTFE/ETFE (dégazage, tenue thermique), joints FKM/FFKM (compatibilité ergols), miroirs seconde surface FEP (contrôle thermique). Cycles de re-qualification de 5 à 10 ans → une interdiction sans dérogation gèlerait la production satellite européenne.',
  legacy: 'PFOS et PFOA sont déjà restreints (Règlement POP de l’UE / Convention de Stockholm) : ils subsistent surtout dans des designs anciens (agents mouillants en traces).',
  confidence: 'verified',
  refs: ['ECHA', 'Avis RAC (2 mars 2026)', 'Projet d’avis SEAC (26 mars 2026)'],
};
