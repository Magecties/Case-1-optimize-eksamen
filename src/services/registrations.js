const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const headers = {
  apikey: import.meta.env.VITE_SUPABASE_APIKEY,
  "Content-Type": "application/json"
};

export async function createRegistration(registration) {
  const response = await fetch(`${SUPABASE_URL}/registrations`, {
    method: "POST",
    headers,
    body: JSON.stringify(registration)
  });

  // fetch only rejects on network errors, so a 4xx or 5xx has to be checked by hand.
  if (!response.ok) {
    const details = await response.text();
    throw new Error(`Registration failed with status ${response.status}: ${details}`);
  }
}
