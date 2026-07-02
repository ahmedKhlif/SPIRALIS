export type Product = {
  slug: string;
  name: string;
  shortName: string;
  volume: string;
  step: string;
  actives: string[];
  description: string;
  image: string;
  href: string;
};

export const products: Product[] = [
  {
    slug: "gel-nettoyant",
    name: "Gel Nettoyant Anti-Imperfections",
    shortName: "Gel Nettoyant",
    volume: "100 ml",
    step: "Nettoyer",
    actives: ["Spiruline", "Niacinamide", "Zinc PCA"],
    description:
      "Un gel nettoyant purifiant qui aide à nettoyer la peau, désincruster les pores et réduire l'apparence des imperfections sans dessécher.",
    image: "/assets/spiralis/products/gel-front-transparent.png",
    href: "/produits/gel-nettoyant",
  },
  {
    slug: "serum",
    name: "Sérum Anti-Imperfections",
    shortName: "Sérum",
    volume: "50 ml",
    step: "Traiter",
    actives: ["Spiruline", "Niacinamide", "Zinc PCA"],
    description:
      "Un sérum léger qui cible les imperfections, affine le grain de peau et aide à équilibrer les peaux mixtes à grasses.",
    image: "/assets/spiralis/products/serum-front-transparent.png",
    href: "/produits/serum",
  },
  {
    slug: "creme-hydratante",
    name: "Crème Hydratante Anti-Imperfections",
    shortName: "Crème Hydratante",
    volume: "30 ml",
    step: "Hydrater",
    actives: ["Spiruline", "Niacinamide", "Zinc PCA"],
    description:
      "Une crème hydratante légère qui apporte confort, équilibre et douceur sans fini gras.",
    image: "/assets/spiralis/products/cream-front-transparent.png",
    href: "/produits/creme-hydratante",
  },
];

export const refill = {
  name: "Recharge Crème Hydratante",
  shortName: "Recharge",
  image: "/assets/spiralis/products/recharge-front-transparent.png",
  href: "/recharge",
  description:
    "Une recharge pratique conçue pour réutiliser le pot et réduire les déchets.",
};

export const keyActives = [
  {
    name: "Spiruline",
    description: "Aide à purifier et revitaliser la peau.",
  },
  {
    name: "Niacinamide",
    description: "Aide à améliorer l'apparence des pores et du teint.",
  },
  {
    name: "Zinc PCA",
    description: "Aide à réguler l'excès de sébum.",
  },
];
