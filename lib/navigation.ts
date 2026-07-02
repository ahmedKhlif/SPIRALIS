export const navigationLinks = [
  { label: "Accueil", href: "/" },
  { label: "Gamme", href: "/gamme" },
  { label: "Routine", href: "/routine" },
  { label: "Actifs", href: "/actifs" },
  { label: "Recharge", href: "/recharge" },
  { label: "Experience 3D", href: "/experience-3d" },
  { label: "A propos", href: "/a-propos" },
  { label: "Contact", href: "/contact" },
];

export type PageContext = {
  href: string;
  label: string;
  summary: string;
  banner: string;
  nextHref: string;
  nextLabel: string;
  nextPrompt: string;
};

const pageContexts: PageContext[] = [
  {
    href: "/",
    label: "Accueil",
    summary: "Une entree claire dans la routine botanique anti-imperfections.",
    banner: "Routine botanique anti-imperfections pour peaux mixtes a grasses.",
    nextHref: "/gamme",
    nextLabel: "Voir la gamme",
    nextPrompt: "Decouvrir les trois soins complementaires",
  },
  {
    href: "/gamme",
    label: "Gamme",
    summary: "Les trois soins essentiels et la recharge dans une meme lecture.",
    banner: "Trois soins complementaires pour nettoyer, traiter et hydrater.",
    nextHref: "/routine",
    nextLabel: "Construire la routine",
    nextPrompt: "Passer de la gamme au rituel matin ou soir",
  },
  {
    href: "/routine",
    label: "Routine",
    summary: "Le geste juste, au bon moment, pour garder une routine lisible.",
    banner: "Routine matin ou soir: trois gestes pour un rythme simple a suivre.",
    nextHref: "/actifs",
    nextLabel: "Comprendre les actifs",
    nextPrompt: "Voir ce qui agit derriere chaque etape",
  },
  {
    href: "/actifs",
    label: "Actifs",
    summary: "Les ingredients cles expliques sans surcharger la lecture.",
    banner: "Spiruline, niacinamide et Zinc PCA au service de l'equilibre cutane.",
    nextHref: "/recharge",
    nextLabel: "Voir la recharge",
    nextPrompt: "Decouvrir le geste responsable de la gamme",
  },
  {
    href: "/recharge",
    label: "Recharge",
    summary: "Le systeme rechargeable donne une suite concrete a la routine.",
    banner: "Reutiliser le pot, reduire les dechets, garder un geste simple.",
    nextHref: "/produits/creme-hydratante",
    nextLabel: "Voir la creme",
    nextPrompt: "Explorer le produit compatible avec la recharge",
  },
  {
    href: "/experience-3d",
    label: "Experience 3D",
    summary: "Une vue plus technique et immersive des packagings SPIRALIS.",
    banner: "Tourner, zoomer et inspecter les volumes avant les modeles GLB finaux.",
    nextHref: "/gamme",
    nextLabel: "Revenir a la gamme",
    nextPrompt: "Reconnecter l'experience 3D au parcours produit",
  },
  {
    href: "/a-propos",
    label: "A propos",
    summary: "La vision de marque, la matiere botanique et l'intention packaging.",
    banner: "Une marque inspiree de la nature, du minimalisme et d'un design responsable.",
    nextHref: "/contact",
    nextLabel: "Nous contacter",
    nextPrompt: "Passer de l'univers de marque a l'echange",
  },
  {
    href: "/contact",
    label: "Contact",
    summary: "Les questions utiles, le formulaire et les points de contact sont regroupes ici.",
    banner: "Questions de routine, disponibilite ou univers SPIRALIS: tout commence ici.",
    nextHref: "/gamme",
    nextLabel: "Explorer la gamme",
    nextPrompt: "Repartir vers les produits apres la prise de contact",
  },
  {
    href: "/produits/gel-nettoyant",
    label: "Gel nettoyant",
    summary: "Le premier geste de la routine: nettoyer sans deshydrater.",
    banner: "Gel nettoyant anti-imperfections: purifier, rafraichir et preparer la peau.",
    nextHref: "/routine?moment=matin#routine-planner",
    nextLabel: "Routine matin",
    nextPrompt: "Voir comment integrer le gel dans la routine du matin",
  },
  {
    href: "/produits/serum",
    label: "Serum",
    summary: "Le soin cible qui prend la place centrale dans la routine.",
    banner: "Serum anti-imperfections: traiter les zones visibles avec une texture legere.",
    nextHref: "/routine?moment=soir#routine-planner",
    nextLabel: "Routine soir",
    nextPrompt: "Voir comment le serum s'insere dans le rituel du soir",
  },
  {
    href: "/produits/creme-hydratante",
    label: "Creme hydratante",
    summary: "Le dernier geste pour hydrater legerement et garder le confort cutane.",
    banner: "Creme hydratante anti-imperfections: confort, equilibre et compatibilite recharge.",
    nextHref: "/recharge",
    nextLabel: "Voir la recharge",
    nextPrompt: "Comprendre l'usage rechargeable de la creme",
  },
];

export function getPageContext(pathname: string): PageContext {
  const exactMatch = pageContexts.find((item) => item.href === pathname);
  if (exactMatch) {
    return exactMatch;
  }

  const prefixMatch = pageContexts.find(
    (item) => item.href !== "/" && pathname.startsWith(`${item.href}/`),
  );

  return prefixMatch ?? pageContexts[0];
}
