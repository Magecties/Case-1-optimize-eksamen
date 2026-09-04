import { useEffect, useState } from "react";
import { Link } from "react-router";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const headers = {
  apikey: import.meta.env.VITE_SUPABASE_APIKEY,
  "Content-Type": "application/json"
};

export default function RegistrationsPage() {
  const [registrations, setRegistrations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    async function getRegistrations() {
      try {
        const response = await fetch(
          `${SUPABASE_URL}/registrations?select=*,event:events(title,date,venue:venues(name))&order=createdAt.desc`,
          { headers }
        );

        // fetch only rejects on network errors, so a 4xx or 5xx has to be checked by hand.
        if (!response.ok) {
          throw new Error(`Could not load registrations, status ${response.status}`);
        }

        const data = await response.json();
        setRegistrations(data);
      } catch (error) {
        console.error("Could not load registrations", error);
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    }

    getRegistrations();
  }, []);

  function formatEventDate(eventDate) {
    return new Date(eventDate).toLocaleDateString("da-DK");
  }

  function renderContent() {
    if (isLoading) {
      return <p role="status">Henter tilmeldinger ...</p>;
    }

    if (hasError) {
      return <p role="alert">Tilmeldingerne kunne ikke hentes. Prøv at genindlæse siden.</p>;
    }

    if (registrations.length === 0) {
      return <p>Der er ingen tilmeldinger endnu.</p>;
    }

    return (
      <div className="registration-list">
        <div className="registration-row registration-labels">
          <span>Navn</span>
          <span>Event</span>
          <span>Dato</span>
          <span>Status</span>
        </div>
        {registrations.map((registration) => (
          <div className="registration-row" key={registration.id}>
            <div>
              <strong>{registration.name}</strong>
              <small>{registration.email}</small>
            </div>
            <div>
              <strong>{registration.event?.title ?? "Ukendt event"}</strong>
              <small>{registration.event?.venue?.name ?? "Sted ukendt"}</small>
            </div>
            <span>{registration.event ? formatEventDate(registration.event.date) : "-"}</span>
            <span className="status">{registration.status}</span>
          </div>
        ))}
      </div>
    );
  }

  return (
    <>
      <header className="admin-header">
        <p className="eyebrow">Internt overblik</p>
        <h1>Tilmeldinger</h1>
        {!isLoading && !hasError && <p>{registrations.length} tilmeldinger i alt</p>}
      </header>
      <main>{renderContent()}</main>
      <footer className="site-footer">
        <div className="footer-top">
          <div className="footer-intro">
            <p className="footer-brand">
              mellemrum<span>.</span>
            </p>
            <p>Udvalgte kulturoplevelser og nye perspektiver på Aarhus.</p>
          </div>
          <nav className="footer-links" aria-label="Footer">
            <div className="footer-link-group">
              <p className="footer-heading">Udforsk</p>
              <Link to="/">Events</Link>
              <Link to="/om">Om Mellemrum</Link>
            </div>
            <div className="footer-link-group">
              <p className="footer-heading">For arrangører</p>
              <Link to="/tilmeldinger">Se tilmeldinger</Link>
              <a href="mailto:hej@mellemrum.dk">Kontakt os</a>
            </div>
          </nav>
        </div>
        <div className="footer-bottom">
          <p className="footer-meta">© 2025 Mellemrum</p>
          <p>Aarhus, Danmark</p>
        </div>
      </footer>
    </>
  );
}
