# Mellemrum – fra prototype til produktionsklar React-løsning

Case 1 i Product Optimization (Multimediedesigner, 3. semester, EAAA). Mellemrum er en lokal kultur- og eventplatform i Aarhus, hvor man kan finde og tilmelde sig koncerter, talks og workshops. Jeg overtog en hurtigt bygget React-prototype og gjorde den mere robust, tilgængelig og klar til deployment.

**Live:** https://magecties.github.io/Case-1-optimize-eksamen/

## Forbedringer

Hver forbedring er lavet i sin egen branch og merget til `main`.

| Branch | Forbedring |
| --- | --- |
| `meta-og-sprog` | `lang="da"`, dansk titel og beskrivelse i stedet for template-metadata |
| `a11y` | Labels knyttet til felterne, `type="email"`, `required` og alt-tekster på eventbilleder |
| `venues-relation` | Ny `venues`-tabel og `events.venue_id` som fremmednøgle. Eksisterende data migreres i SQL |
| `registration-flow` | Tilmeldinger gemmes i Supabase med `event_id` som fremmednøgle. Knappen låses under afsendelse, og kvittering eller fejl vises i en `aria-live`-region |
| `registrations-page` | Den interne side henter tilmeldinger med eventets titel, dato og venue i én request (embedded select) |
| `ui-states` | Loading-, fejl- og tomme tilstande med `try/catch` og tjek af `response.ok` |
| `performance` | Billeder i 800 px i stedet for fuld opløsning og `loading="lazy"` på kortbilleder |


