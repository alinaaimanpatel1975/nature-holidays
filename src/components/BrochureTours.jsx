import "./BrochureTours.css";

const collections = [
  {
    id: "one-day-fun-tours",
    title: "One Day Fun Tours",
    tours: [
      "Wonderla Parks & Resort",
      "GRS Fantasy Park",
      "Snow City",
      "Fun World",
      "Jollywood Studios",
      "Elim Resort",
      "Guhantara Resort",
      "Dharamshi Resort",
      "Greenwood Resort",
      "Dreamland Resort",
      "Avaniya Adventures Resort",
    ],
  },
  {
    id: "one-day-historical-fun-tours",
    title: "One Day Historical & Fun Tours",
    tours: [
      "Bluff, Talakadu, Somanathpura",
      "Nandi Hills and Isha Temple",
      "Talakadu, Mysore, KRS Garden",
      "Shravanabelagola, Belur, Halebidu",
      "Mysore, KRS Garden",
      "Wonderla & Big Banyan Tree",
      "Chitradurga",
      "Nandi Hills and Airport",
      "GRS Fantasy Park & DJ with Campfire",
      "Madikeri — Day / Night Trip",
    ],
  },
  {
    id: "namma-bengaluru-rounds",
    title: "Namma Bengaluru Rounds",
    isCityCollection: true,
    tours: [
      "Lalbagh Botanical Garden",
      "Bangalore Palace",
      "National Park",
      "Butterfly Park",
      "Government Aquarium",
      "Vidhana Soudha",
      "High Court",
      "Cubbon Park",
      "Meenakshi Temple",
      "Bal Bhavan",
      "HAL Museum",
      "Visvesvaraya Museum",
      "Shiva Temple",
      "Toy Train",
      "Tipu Palace",
      "Nehru Planetarium",
      "ISKCON Temple",
      "Indira Gandhi Musical Fountain",
    ],
  },
  {
    id: "north-india-tours",
    title: "Explore North India Tours",
    tours: [
      "Chalo Dilli",
      "Bagh e Jannat, Kashmir",
      "Raj se Taj Tak",
      "Husn e Himachal",
      "Versatile Gujarat",
      "Punjab with Delhi",
      "Delhi with Lucknow",
      "Gujarat & Diu",
    ],
  },
  {
    id: "south-india-tours",
    title: "Explore South India Tours",
    tours: [
      "Mangaluru, Sakleshpur, Belur, Halebidu",
      "Hampi, Chitradurga",
      "Madikeri, Mysore",
      "Mysore & Somanathpura",
      "Udupi & Mangaluru",
      "Bijapur, Aihole",
      "Wayanad",
      "Dandeli",
      "Udupi, Horanadu, Shringeri, Dharmasthala",
      "Hampi, Badami, Aihole, Pattadakallu",
      "Hyderabad with Wonderla Trip",
      "Ooty & Black Thunder",
      "Mysore, Ooty",
      "Chennai, Mahabalipuram, Golden Temple",
      "Kodaikanal, Kutralam, Kanyakumari",
      "Pondicherry, Mahabalipuram",
      "Mangaluru, Udupi and Murudeshwara",
      "Munnar, Alleppey, Kochi",
      "Goa, Dandeli",
      "Mumbai, Pune with Adlabs Imagica",
    ],
  },
];

export default function BrochureTours() {
  return (
    <section
      className="brochure-tours"
      aria-labelledby="brochure-tours-title"
    >
      <div className="brochure-tours-heading">
        <span className="brochure-eyebrow">
          EXPLORE OUR TOUR COLLECTIONS
        </span>

        <h2 id="brochure-tours-title">
          More ways to get away.
        </h2>

        <p>
          Discover tours and destinations from the Nature
          Holidays brochure.
        </p>
      </div>

      <div className="brochure-collections">
        {collections.map((collection, index) => (
          <details
            className="brochure-collection"
            key={collection.id}
            id={collection.id}
          >
            <summary>
              <span className="brochure-collection-number">
                {String(index + 1).padStart(2, "0")}
              </span>

              <span className="brochure-collection-heading">
                <span className="brochure-collection-title">
                  {collection.title}
                </span>
              </span>

              <span className="brochure-collection-count">
                {collection.tours.length}{" "}
                {collection.isCityCollection ? "stops" : "options"}
              </span>

              <span
                className="brochure-expand-icon"
                aria-hidden="true"
              />
            </summary>

            <div className="brochure-collection-content">
              <ul className="brochure-tour-names">
                {collection.tours.map((name) => (
                  <li key={name}>{name}</li>
                ))}
              </ul>
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}