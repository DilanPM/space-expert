/**
 * Centre Spatial Guyanais — infrastructures & cheminements. Web-vérifié
 * (CNES/CSG, Wikipédia, Arianespace). Permet de comprendre QUOI, où, dans quel
 * ordre, et ce qui est CRITIQUE. crit: 'critical' | 'high' | 'medium'.
 */

export const csgFacilities = [
  // Préparation charges utiles (satellites)
  { id: 'epcu-s1', name: 'EPCU S1', full: 'Ensemble de Préparation des Charges Utiles — S1', zone: 'Centre technique', cat: 'Satellites',
    role: "Préparation satellites — opérations NON dangereuses (assemblage, contrôles, tests). Halls S1A/S1B (1980/1985).", crit: 'medium', confidence: 'verified', sources: ['CNES CSG'] },
  { id: 'epcu-s3', name: 'EPCU S3', full: 'Préparation Charges Utiles — S3', zone: 'Proche zones de lancement', cat: 'Satellites',
    role: "Opérations DANGEREUSES : intégration finale & remplissage des satellites en ergols (hydrazine). 2 halls (fin années 1980).", crit: 'high', confidence: 'verified', sources: ['CNES CSG'] },
  { id: 'epcu-s5', name: 'EPCU S5', full: 'Préparation Charges Utiles — S5', zone: 'Mi-chemin entrée/zones', cat: 'Satellites',
    role: "Le plus récent (2001) & le plus grand — préparation complète, remplissage, encapsulation sous coiffe. ~3 200 m² de salles blanches (total EPCU).", crit: 'high', confidence: 'verified', sources: ['CNES CSG'] },
  // Intégration lanceur
  { id: 'bal', name: 'BAL', full: "Bâtiment d'Assemblage Lanceur (Ariane 6)", zone: 'ELA-4', cat: 'Lanceur',
    role: "Assemblage HORIZONTAL du corps central Ariane 6 + étage supérieur, puis transfert vers le portique mobile d'ELA-4 pour érection.", crit: 'critical', confidence: 'verified', sources: ['ArianeGroup', 'ESA'] },
  { id: 'baf', name: 'BAF', full: "Bâtiment d'Assemblage Final", zone: 'ex-ELA-3', cat: 'Lanceur',
    role: "Encapsulation de la charge utile sous coiffe puis transfert vers la zone de lancement (héritage Ariane 5).", crit: 'high', confidence: 'verified', sources: ['CNES CSG'] },
  { id: 'upg', name: 'UPG', full: 'Usine de Propergols de Guyane', zone: 'Zone industrielle', cat: 'Propulsion',
    role: "Production & coulée du propergol solide des boosters : P120C (Ariane 6 & Vega-C). ⚠️ POINT CRITIQUE UNIQUE — toute la propulsion solide EU en dépend.", crit: 'critical', confidence: 'verified', sources: ['CNES CSG', 'ArianeGroup'] },
  { id: 'liquid-prop', name: 'Usines ergols liquides', full: 'Production LH₂ / LOX (Air Liquide)', zone: 'Zone industrielle', cat: 'Propulsion',
    role: "Production sur site d'hydrogène & oxygène liquides (Vulcain 2.1, Vinci). Approvisionnement critique des campagnes.", crit: 'critical', confidence: 'verified', sources: ['Air Liquide', 'CNES'] },
  // Zones de lancement
  { id: 'ela-4', name: 'ELA-4', full: "Ensemble de Lancement Ariane 6", zone: 'Nord CSG', cat: 'Zone de lancement',
    role: "Pas de tir Ariane 6 : massif, portique mobile, carneaux, château d'eau (déluge). Actif depuis juil. 2024.", crit: 'critical', confidence: 'verified', sources: ['ESA', 'ArianeGroup'] },
  { id: 'zlv', name: 'ZLV / ELV', full: 'Zone de Lancement Vega', zone: 'ex-ELA-1', cat: 'Zone de lancement',
    role: "Pas de tir Vega-C. Mât ombilical, portique. Futur Vega-E.", crit: 'high', confidence: 'verified', sources: ['Avio', 'ESA'] },
  { id: 'elm-diamant', name: 'ELM (ex-Diamant)', full: 'Ensemble de Lancement Multilanceurs', zone: 'Site Diamant', cat: 'Zone de lancement',
    role: "Pas de tir reconfigurable multi-microlanceurs (Maia, Miura 5, RFA…). Seul site propriété FR. Modèle type SLC-46.", crit: 'high', confidence: 'verified', sources: ['CNES'] },
  // Opérations & sûreté
  { id: 'jupiter', name: 'Salle Jupiter', full: 'Centre de contrôle (Jupiter)', zone: 'Ensemble technique', cat: 'Opérations',
    role: "Salle de contrôle des lancements (chronologie synchronisée, décision de tir).", crit: 'critical', confidence: 'verified', sources: ['Arianespace'] },
  { id: 'safety', name: 'Sauvegarde & trajecto', full: 'Range / Sauvegarde vol', zone: 'CSG + aval', cat: 'Opérations',
    role: "Radars, télémesure, stations aval (Galliot, Natal, Ascension) ; sécurité vol & destruction commandée.", crit: 'critical', confidence: 'verified', sources: ['CNES'] },
  { id: 'port', name: 'Port de Pariacabo', full: 'Port spatial (Kourou)', zone: 'Kourou', cat: 'Logistique',
    role: "Arrivée maritime des étages, boosters et gros éléments (Canopée, navire à voiles pour Ariane 6).", crit: 'high', confidence: 'verified', sources: ['CNES'] },
];

// Cheminement du LANCEUR (Ariane 6) — ordre & criticité
export const launcherPathway = [
  { n: 1, step: 'Arrivée des éléments', loc: 'Port de Pariacabo', desc: "Étages Vulcain/Vinci (Brême, Les Mureaux) par voie maritime (Canopée).", crit: 'high' },
  { n: 2, step: 'Assemblage lanceur', loc: 'BAL', desc: 'Intégration horizontale corps central + étage supérieur.', crit: 'critical' },
  { n: 3, step: 'Transfert & érection', loc: 'ELA-4', desc: 'Roulage vers le pas de tir, mise à la verticale sous le portique mobile.', crit: 'critical' },
  { n: 4, step: 'Boosters P120C', loc: 'UPG → ELA-4', desc: 'Coulée propergol solide (UPG), transfert, accrochage 2 ou 4 boosters.', crit: 'critical' },
  { n: 5, step: 'Charge utile', loc: 'BAF → ELA-4', desc: 'Charge utile encapsulée hissée et mâtée au sommet du lanceur.', crit: 'high' },
  { n: 6, step: 'Chronologie & tir', loc: 'Jupiter / ELA-4', desc: 'Remplissage cryo, revue d’aptitude, compte à rebours, décollage.', crit: 'critical' },
];

// Cheminement du SATELLITE — ordre & criticité
export const satellitePathway = [
  { n: 1, step: 'Arrivée satellite', loc: 'Aéroport Cayenne / Port', desc: 'Réception en conteneur climatisé.', crit: 'medium' },
  { n: 2, step: 'Assemblage & tests', loc: 'EPCU S1', desc: 'Opérations non dangereuses : déballage, contrôles, tests fonctionnels.', crit: 'medium' },
  { n: 3, step: 'Remplissage ergols', loc: 'EPCU S3 / S5', desc: 'Opérations DANGEREUSES : remplissage hydrazine/ergols (zone confinée).', crit: 'high' },
  { n: 4, step: 'Encapsulation', loc: 'EPCU S5 / BAF', desc: 'Intégration adaptateur + mise sous coiffe.', crit: 'high' },
  { n: 5, step: 'Transfert zone de lancement', loc: '→ ELA-4 / ZLV', desc: 'Convoi vers le pas de tir, mâtage sur le lanceur.', crit: 'high' },
];
