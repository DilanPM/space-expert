/**
 * Curated lifecycle reference — how a launcher/satellite goes from design to
 * operations. Hand-authored. Feeds the Process & Lifecycle module.
 */
export const lifecycle = [
  {
    id: 'design', phase: '1 · Conception & qualification', icon: '📐', color: '#60a5fa',
    duration: '3–8 ans', actors: ['ESA', 'Maître d\'œuvre (ArianeGroup/Avio)', 'CNES/DLR/ASI'],
    desc: "Définition mission, architecture lanceur, dimensionnement, revues (PDR/CDR), qualification des sous-systèmes & moteurs sur banc.",
    steps: ['Études de mission & trade-offs', 'Conception détaillée (PDR/CDR)', 'Essais moteurs au banc (Lampoldshausen, Vernon, Colleferro)', 'Qualification système'],
  },
  {
    id: 'manufacture', phase: '2 · Fabrication', icon: '🏭', color: '#34d399',
    duration: 'mois', actors: ['ArianeGroup', 'Avio', 'Supply chain EU'],
    desc: "Production des étages, réservoirs, structures composites (boosters P120C), moteurs, avionique. Chaîne d'approvisionnement critique (carbone, ergols).",
    steps: ['Étages & réservoirs', 'Boosters solides (bobinage filamentaire)', 'Moteurs (Vulcain, Vinci, Zefiro)', 'Avionique & coiffe'],
  },
  {
    id: 'integration', phase: '3 · Assemblage & intégration', icon: '🔧', color: '#fbbf24',
    duration: 'semaines', actors: ['Arianespace', 'CNES (CSG)', 'Avio'],
    desc: "Intégration des étages (BAF — Bâtiment d'Assemblage Final), encapsulation de la charge utile, transfert vers le pas de tir. Préparation satellite en salle blanche (EPCU/S5).",
    steps: ['Assemblage étages (BAF)', 'Préparation charge utile (S5/EPCU)', 'Encapsulation sous coiffe', 'Transfert vers le pas de tir'],
  },
  {
    id: 'campaign', phase: '4 · Campagne de lancement', icon: '🛰️', color: '#f472b6',
    duration: 'jours–semaines', actors: ['Arianespace', 'CSG / CNES', 'Sauvegarde'],
    desc: "Chronologie de lancement : remplissage ergols, revues d'aptitude au lancement (LRR), météo, sauvegarde vol, compte à rebours.",
    steps: ['Revue d\'aptitude (LRR)', 'Remplissage ergols cryo', 'Compte à rebours synchronisé', 'Sauvegarde & trajectographie'],
  },
  {
    id: 'launch', phase: '5 · Lancement & mise en orbite', icon: '🚀', color: '#ef4444',
    duration: 'minutes–heures', actors: ['Lanceur', 'Centre de contrôle (Jupiter, CSG)'],
    desc: "Décollage, séparation des boosters & étages, largage coiffe, allumages de l'étage supérieur, injection orbitale, séparation des satellites.",
    steps: ['Décollage & ascension', 'Séparation boosters/étages', 'Largage coiffe', 'Injections (étage supérieur réallumable)', 'Séparation charges utiles'],
  },
  {
    id: 'leop', phase: '6 · LEOP & mise à poste', icon: '📡', color: '#a78bfa',
    duration: 'jours–semaines', actors: ['ESOC / opérateur', 'Constructeur satellite'],
    desc: "Launch & Early Orbit Phase : acquisition du signal, déploiement panneaux/antennes, manœuvres de transfert vers l'orbite opérationnelle (propulsion électrique/chimique).",
    steps: ['Acquisition & santé satellite', 'Déploiement (solaire, antennes)', 'Manœuvres de transfert (SEP/chimique)', 'Mise à poste'],
  },
  {
    id: 'ops', phase: '7 · Exploitation', icon: '🌍', color: '#22d3ee',
    duration: '5–15+ ans', actors: ['EUSPA', 'Opérateurs', 'ESOC'],
    desc: "Opérations nominales : maintien à poste, fourniture du service (navigation, observation, télécom), gestion des anomalies, mises à jour.",
    steps: ['Maintien à poste (station-keeping)', 'Fourniture du service', 'Gestion anomalies', 'Extension de vie éventuelle'],
  },
  {
    id: 'eol', phase: '8 · Fin de vie & durabilité', icon: '♻️', color: '#94a3b8',
    duration: 'fin de mission', actors: ['Opérateur', 'ESA (Clean Space)', 'Régulateur (Space Act)'],
    desc: "Désorbitation contrôlée (rentrée) ou passivation/orbite cimetière (GEO). Enjeu débris — au cœur du pilier durabilité de l'EU Space Act.",
    steps: ['Passivation', 'Désorbitation / orbite cimetière', 'Rentrée contrôlée', 'Conformité règles débris'],
  },
];
