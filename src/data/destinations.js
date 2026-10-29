import { destinationImages } from "./destination-images";

const places = [
  {
    slug: "mysore",
    name: "Mysore",
    state: "Karnataka",
    theme: "Palaces & heritage",
    heroId: "mysore-palace",
    introduction:
      "Explore Mysore’s royal architecture, temples and city landmarks.",
    packageId: "mysore-ooty",
  },
  {
    slug: "ooty",
    name: "Ooty",
    state: "Tamil Nadu",
    theme: "Hills & gardens",
    heroId: "ooty-lake",
    introduction:
      "Discover lakes, gardens and mountain scenery in the Nilgiri hills.",
    packageId: "mysore-ooty",
  },
  {
    slug: "munnar",
    name: "Munnar",
    state: "Kerala",
    theme: "Tea country & viewpoints",
    heroId: "tea-plantations",
    introduction:
      "Explore tea-covered hills, scenic viewpoints and reservoir landscapes.",
    packageId: "munnar-alleppey-kochi",
  },
  {
    slug: "alleppey",
    name: "Alleppey",
    state: "Kerala",
    theme: "Backwaters & coastal days",
    heroId: "backwater-houseboats",
    introduction:
      "Discover Alappuzha’s backwaters, houseboats, beach and temple heritage.",
    packageId: "munnar-alleppey-kochi",
  },
  {
    slug: "jaipur",
    name: "Jaipur",
    state: "Rajasthan",
    theme: "Forts & royal landmarks",
    heroId: "hawa-mahal",
    introduction:
      "Explore the Pink City through its palaces, courtyards and historic forts.",
    packageId: "raj-se-taj-tak",
  },
  {
    slug: "agra",
    name: "Agra",
    state: "Uttar Pradesh",
    theme: "Monuments & Mughal heritage",
    heroId: "taj-mahal",
    introduction:
      "Discover the Taj Mahal, Agra Fort and the city’s architectural heritage.",
    packageId: "raj-se-taj-tak",
  },
  {
    slug: "goa",
    name: "Goa",
    state: "Goa",
    theme: "Beaches & coastal heritage",
    heroId: "palolem-beach",
    introduction:
      "Explore beaches, historic churches and forts along Goa’s coast.",
    packageId: "goa-dandeli",
  },
  {
    slug: "dandeli",
    name: "Dandeli",
    state: "Karnataka",
    theme: "Rivers & outdoor adventures",
    heroId: "kali-river",
    introduction:
      "Discover forest landscapes, river scenery and outdoor experiences.",
    packageId: "goa-dandeli",
  },
  {
    slug: "hampi",
    name: "Hampi",
    state: "Karnataka",
    theme: "Temples & historic ruins",
    heroId: "stone-chariot",
    introduction:
      "Explore the monuments, temple complexes and distinctive landscapes of Hampi.",
    packageId: "hampi-pattadakal",
  },
  {
    slug: "kodaikanal",
    name: "Kodaikanal",
    state: "Tamil Nadu",
    theme: "Lakes & mountain views",
    heroId: "kodaikanal-lake",
    introduction:
      "Discover lakeside scenery, hill viewpoints and walks in Kodaikanal.",
    packageId: null,
  },
];

export const destinations = places.map((place) => {
  const attractions = destinationImages.filter(
    (image) => image.destination === place.slug
  );

  const hero =
    attractions.find((image) => image.id === place.heroId) ||
    attractions[0];

  return {
    ...place,
    image: hero?.image || "",
    imageCredit: hero?.creditUrl || "/image-credits.html",
    attractions,
  };
});