import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

import Footer from "../components/Footer";
import "./ContactPage.css";

function localDate() {
  const date = new Date();

  return [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, "0"),
    String(date.getDate()).padStart(2, "0"),
  ].join("-");
}

const mapLink =
  "https://www.google.com/maps/search/?api=1&query=" +
  encodeURIComponent(
    "Nature Holidays, Arekere, Bannerghatta Road, Bengaluru 560076"
  );

export default function ContactPage() {
  const [searchParams] = useSearchParams();
  const selectedPackage = searchParams.get("package") || "";

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    packageName: selectedPackage,
    tripType: "",
    destination: "",
    travelDate: "",
    travellers: "2",
    departureCity: "",
    requests: "",
  });

  const [enquiry, setEnquiry] = useState(null);
  const [copyMessage, setCopyMessage] = useState("");

  useEffect(() => {
    setForm((current) => ({
      ...current,
      packageName: selectedPackage,
    }));

    setEnquiry(null);
    setCopyMessage("");
  }, [selectedPackage]);

  function updateField(event) {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));

    setEnquiry(null);
    setCopyMessage("");
  }

  function prepareEnquiry(event) {
    event.preventDefault();

    if (!form.name.trim()) {
      event.currentTarget.elements.namedItem("name").setCustomValidity(
        "Please enter your name."
      );

      event.currentTarget.reportValidity();
      return;
    }

    const subject = form.packageName.trim()
      ? `Travel enquiry: ${form.packageName.trim()}`
      : `Travel enquiry: ${form.destination.trim() || form.tripType}`;

    const date = form.travelDate
      ? new Date(`${form.travelDate}T00:00:00`).toLocaleDateString(
          "en-IN",
          {
            day: "numeric",
            month: "long",
            year: "numeric",
          }
        )
      : "Flexible / not decided";

    const body = [
      "Hello Nature Holidays,",
      "",
      "I'd like help planning a trip.",
      "",
      `Name: ${form.name.trim()}`,
      `Email: ${form.email.trim()}`,
      `Phone: ${form.phone.trim()}`,
      `Package: ${form.packageName.trim() || "Custom trip"}`,
      `Trip type: ${form.tripType}`,
      `Destination: ${form.destination.trim() || "Please suggest options"}`,
      `Preferred travel date: ${date}`,
      `Number of travellers: ${form.travellers}`,
      `Departure city: ${form.departureCity.trim() || "Not specified"}`,
      "",
      "Additional requirements:",
      form.requests.trim() || "None specified",
      "",
      "Please share suitable options, the itinerary, inclusions,",
      "exclusions, availability and a quote.",
    ].join("\n");

    setEnquiry({
      body,
      link:
        "mailto:info@natureholidays.co" +
        `?subject=${encodeURIComponent(subject)}` +
        `&body=${encodeURIComponent(body)}`,
    });
  }

  async function copyEnquiry() {
    if (!enquiry) {
      return;
    }

    try {
      await navigator.clipboard.writeText(enquiry.body);
      setCopyMessage("Enquiry copied.");
    } catch {
      setCopyMessage(
        "Copy wasn't available. Select and copy the enquiry text below."
      );
    }
  }

  return (
    <>
      <header className="site-header">
        <nav className="navbar" aria-label="Main navigation">
          <Link className="brand" to="/">
            <img src="/images/logo.png" alt="" />
            <span>
              Nature <strong>Holidays</strong>
            </span>
          </Link>

          <div className="nav-links">
            <Link to="/">Home</Link>
            <Link to="/packages">Packages</Link>
            <Link to="/destinations">Destinations</Link>
            <Link to="/contact" aria-current="page">
              Contact
            </Link>
          </div>
        </nav>
      </header>

      <main className="contact-page">
        <nav className="contact-breadcrumb" aria-label="Breadcrumb">
          <Link to="/">Home</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">Contact</span>
        </nav>

        <div className="contact-page-heading">
          <span className="contact-eyebrow">
            YOUR NEXT TRIP STARTS WITH A CONVERSATION
          </span>

          <h1>Tell us what you have in mind.</h1>

          <p>
            A college outing, a honeymoon or a holiday with your
            favourite people. Let’s explore the possibilities.
          </p>
        </div>

        <div className="contact-layout">
          <section
            className="trip-enquiry-panel"
            aria-labelledby="trip-enquiry-title"
          >
            <div className="trip-enquiry-heading">
              <h2 id="trip-enquiry-title">Plan your trip.</h2>
              <p>
                Share your plans below. Fields marked * are required.
              </p>
            </div>

            <form className="trip-enquiry-form" onSubmit={prepareEnquiry}>
              <div className="trip-form-grid">
                <label className="trip-form-field">
                  <span>Full name *</span>
                  <input
                    name="name"
                    autoComplete="name"
                    placeholder="Your name"
                    value={form.name}
                    onChange={updateField}
                    onInput={(event) =>
                      event.currentTarget.setCustomValidity("")
                    }
                    maxLength={100}
                    required
                  />
                </label>

                <label className="trip-form-field">
                  <span>Email address *</span>
                  <input
                    type="email"
                    name="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={updateField}
                    maxLength={150}
                    required
                  />
                </label>

                <label className="trip-form-field">
                  <span>Phone number *</span>
                  <input
                    type="tel"
                    name="phone"
                    autoComplete="tel"
                    placeholder="+91"
                    value={form.phone}
                    onChange={updateField}
                    pattern="[+0-9 ()\-]{7,20}"
                    title="Enter a phone number using 7–20 characters."
                    maxLength={20}
                    required
                  />
                </label>

                <label className="trip-form-field">
                  <span>Trip type *</span>
                  <select
                    name="tripType"
                    value={form.tripType}
                    onChange={updateField}
                    required
                  >
                    <option value="" disabled>
                      Choose your trip type
                    </option>
                    <option>School & College</option>
                    <option>Honeymoon</option>
                    <option>Corporate & Group</option>
                    <option>Family Holiday</option>
                    <option>Weekend & Day Outing</option>
                    <option>Other / Custom Trip</option>
                  </select>
                </label>

                <label className="trip-form-field trip-form-field--wide">
                  <span>Package you’re interested in</span>
                  <input
                    name="packageName"
                    placeholder="Package name, if you have one in mind"
                    value={form.packageName}
                    onChange={updateField}
                    maxLength={160}
                  />
                </label>

                <label className="trip-form-field">
                  <span>Preferred destination</span>
                  <input
                    name="destination"
                    placeholder="Where would you like to go?"
                    value={form.destination}
                    onChange={updateField}
                    maxLength={120}
                  />
                </label>

                <label className="trip-form-field">
                  <span>Preferred travel date</span>
                  <input
                    type="date"
                    name="travelDate"
                    min={localDate()}
                    value={form.travelDate}
                    onChange={updateField}
                  />
                </label>

                <label className="trip-form-field">
                  <span>Number of travellers *</span>
                  <input
                    type="number"
                    name="travellers"
                    min="1"
                    max="5000"
                    step="1"
                    value={form.travellers}
                    onChange={updateField}
                    required
                  />
                </label>

                <label className="trip-form-field">
                  <span>Departure city</span>
                  <input
                    name="departureCity"
                    placeholder="For example, Bengaluru"
                    value={form.departureCity}
                    onChange={updateField}
                    maxLength={100}
                  />
                </label>

                <label className="trip-form-field trip-form-field--wide">
                  <span>Anything else we should know?</span>
                  <textarea
                    name="requests"
                    rows={5}
                    placeholder="Trip duration, children’s ages, transport, hotel preferences or accessibility requirements..."
                    value={form.requests}
                    onChange={updateField}
                    maxLength={1200}
                  />
                </label>
              </div>

              <p className="trip-form-note">
                We’ll prepare your enquiry as an email draft.
                Review it and send it to Nature Holidays through
                your email app. No booking is made by this form.
              </p>

              <button className="trip-prepare-button" type="submit">
                Prepare my enquiry
                <span aria-hidden="true">↗</span>
              </button>
            </form>

            {enquiry && (
              <section
                className="trip-enquiry-preview"
                aria-labelledby="enquiry-preview-title"
              >
                <h3 id="enquiry-preview-title">Your enquiry is ready.</h3>

                <p role="status">
                  It hasn’t been sent yet. Open the email draft
                  below, then review and send it.
                </p>

                <div className="trip-preview-actions">
                  <a href={enquiry.link}>Open email draft ↗</a>

                  <button type="button" onClick={copyEnquiry}>
                    Copy enquiry
                  </button>
                </div>

                <p className="trip-copy-status" role="status">
                  {copyMessage}
                </p>

                <details>
                  <summary>Review enquiry text</summary>
                  <pre>{enquiry.body}</pre>
                </details>

                <p className="trip-email-fallback">
                  No email app configured? Copy your enquiry
                  and send it to{" "}
                  <a href="mailto:info@natureholidays.co">
                    info@natureholidays.co
                  </a>.
                </p>
              </section>
            )}
          </section>

          <aside className="contact-information">
            <div className="contact-direct-panel">
              <span className="contact-eyebrow">LET’S TALK</span>
              <h2>Prefer a conversation?</h2>

              <p>
                Contact the Nature Holidays team directly about
                your travel plans.
              </p>

              <div className="contact-direct-group">
                <h3>Call us</h3>
                <a href="tel:+919738234786">+91 97382 34786</a>
                <a href="tel:+919243404797">+91 92434 04797</a>
                <a href="tel:+918041121473">080 4112 1473</a>
              </div>

              <div className="contact-direct-group">
                <h3>Email us</h3>
                <a href="mailto:info@natureholidays.co">
                  info@natureholidays.co
                </a>
              </div>
            </div>

            <div className="contact-office-panel">
              <span className="contact-eyebrow">BASED IN BENGALURU</span>
              <h2>Find our office.</h2>

              <address>
                #420/b, 2nd Floor, 2nd Cross,
                <br />
                Lakshmi Layout, Arekere,
                <br />
                Bannerghatta Road,
                <br />
                Bengaluru, Karnataka – 560076
              </address>

              <a
                href={mapLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                Search on Google Maps
                <span aria-hidden="true">↗</span>
              </a>
            </div>

            <div className="contact-help-panel">
              <h3>Still choosing a destination?</h3>
              <p>
                Explore ideas before putting your plans together.
              </p>
              <Link to="/destinations">Explore destinations ↗</Link>
            </div>
          </aside>
        </div>
      </main>

      <Footer />
    </>
  );
}