/**
 * Curated policy / law / budget — web-verified (juin 2026). Sources indiquées.
 * ⚠️ Montants à grande maille ; chiffres fins (clés de répartition Art. 65 / FFPA)
 * à confirmer avec les documents internes DG DEFIS.
 */

export const spaceAct = {
  title: 'EU Space Act', proposed: '25 juin 2025', confidence: 'verified', sources: ['EC DEFIS', 'EPRS'],
  status: 'Procédure législative ordinaire (PE + Conseil)',
  summary: "Premier cadre réglementaire horizontal de l'UE pour les activités spatiales — remplacerait la mosaïque des lois nationales par un régime unique (autorisation, registre, supervision).",
  pillars: [
    { id: 'safety', label: 'Safety / Sécurité', color: '#60a5fa', desc: 'Suivi des objets spatiaux, mitigation des débris, sécurité orbitale (STM).' },
    { id: 'resilience', label: 'Resilience / Résilience', color: '#fbbf24', desc: 'Cybersécurité, protection des infrastructures spatiales européennes.' },
    { id: 'sustainability', label: 'Sustainability / Durabilité', color: '#34d399', desc: 'Empreinte environnementale, durabilité des opérations, fin de vie.' },
  ],
  accessToSpace: "Régime de dérogation 'access to space' : les opérateurs européens ne pourraient recourir à des lanceurs non-UE qu'en l'absence de substitut européen disponible — préférence structurelle aux lanceurs UE.",
  stages: [
    { label: 'Proposition Commission', date: 'Juin 2025', done: true },
    { label: 'Examen Parlement (ITRE)', date: '2025-26', done: true },
    { label: 'Orientation générale Conseil', date: '2026', done: false },
    { label: 'Trilogues', date: '2026-27', done: false },
    { label: 'Adoption & entrée en vigueur', date: 'à venir', done: false },
  ],
};

export const programme = {
  title: "Programme spatial de l'UE (2021-2027)", regulation: 'Règlement (UE) 2021/696',
  envelope: '≈ 14,9 Md€ (CFP 2021-2027)', confidence: 'verified', sources: ['Règlement 2021/696'],
  components: [
    { id: 'galileo', label: 'Galileo / EGNOS', desc: 'Navigation par satellite (PNT)', op: 'EUSPA' },
    { id: 'copernicus', label: 'Copernicus', desc: 'Observation de la Terre (Sentinels)', op: 'EC / ESA / EUSPA' },
    { id: 'govsatcom', label: 'GOVSATCOM', desc: 'Communications gouvernementales sécurisées', op: 'EUSPA' },
    { id: 'ssa', label: 'SSA / SST', desc: "Surveillance de l'espace & météo spatiale", op: 'EU SST Partnership' },
    { id: 'iris2', label: 'IRIS²', desc: 'Constellation de connectivité sécurisée', op: 'EC / consortium SpaceRISE' },
    { id: 'access', label: 'Access to Space (Art. 65)', desc: "Accès autonome à l'espace — soutien aux lanceurs", op: 'EC / ESA', highlight: true },
  ],
  art65: {
    title: 'Article 65 — Access to Space',
    note: "Composante 'accès à l'espace' du Programme : agrégation de la demande institutionnelle UE, soutien à la compétitivité des lanceurs européens, lien avec le European Launcher Challenge.",
    toConfirm: 'Périmètre & enveloppe précis à confirmer (docs internes).',
  },
};

export const ecf = {
  title: 'European Competitiveness Fund (ECF)', confidence: 'verified', sources: ['EC — EU budget 2028-2034', 'EPRS'],
  period: 'CFP 2028-2034',
  what: "Nouvel instrument centralisé du prochain cadre financier (MFF 2028-2034) regroupant ~14 programmes UE pour concentrer l'investissement dans les technologies stratégiques et l'autonomie industrielle.",
  spaceWindow: { label: 'Fenêtre « Défense, sécurité & espace »', amount: '≈ 131 Md€', note: '×5 vs le CFP précédent — intègrerait le futur financement spatial de l\'UE.' },
  note: "Le Programme spatial actuel (2021-2027) serait intégré dans l'ECF à partir de 2028. Les clés de répartition espace précises restent à arrêter (négociation MFF en cours).",
};

export const budgetContext = [
  { label: 'ECF — fenêtre défense & espace', amount: 131, unit: 'Md€', period: '2028-2034 (proposé)', color: '#fbbf24', confidence: 'verified' },
  { label: 'Programme spatial UE', amount: 14.9, unit: 'Md€', period: '2021-2027', color: '#60a5fa', confidence: 'verified' },
  { label: 'Budget ESA (annuel)', amount: 7.7, unit: 'Md€', period: '2025', color: '#34d399', confidence: 'verified' },
  { label: 'European Launcher Challenge', amount: 0.9, unit: 'Md€', period: 'engagé nov. 2025', color: '#a78bfa', confidence: 'verified' },
];

export const elc = {
  title: 'European Launcher Challenge (ESA)', confidence: 'verified', sources: ['ESA', 'European Spaceflight'],
  desc: 'Initiative ESA de soutien aux microlanceurs commerciaux européens — services de lancement institutionnels + démonstrations.',
  committed: '≈ 902 M€ engagés par les États membres (nov. 2025)',
  selected: [
    { company: 'Isar Aerospace', launcher: 'Spectrum', country: 'de' },
    { company: 'Rocket Factory Augsburg', launcher: 'RFA ONE', country: 'de' },
    { company: 'MaiaSpace', launcher: 'Maia', country: 'fr' },
    { company: 'PLD Space', launcher: 'Miura 5', country: 'es' },
    { company: 'Orbex', launcher: 'Prime', country: 'gb', withdrawn: true },
  ],
};

export const ffpa = {
  title: 'FFPA — Financial Framework Partnership Agreement', confidence: 'verified', sources: ['EC', 'ESA'],
  desc: "Cadre de délégation financière entre la Commission et l'ESA / EUSPA pour la mise en œuvre du Programme spatial. Définit budgets délégués, gouvernance et contrôle.",
  flows: [
    { from: 'EU / Commission (DG DEFIS)', to: 'ESA', label: "Maîtrise d'œuvre technique, développement", color: '#fbbf24' },
    { from: 'EU / Commission (DG DEFIS)', to: 'EUSPA', label: 'Exploitation, sécurité, marché', color: '#34d399' },
    { from: 'ESA', to: 'EUSPA', label: 'Transfert des systèmes qualifiés', color: '#60a5fa' },
  ],
};
