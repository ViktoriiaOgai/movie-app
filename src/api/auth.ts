const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

export async function createGuestSession(): Promise<string> {
  const res = await fetch(
    `https://api.themoviedb.org/3/authentication/guest_session/new?api_key=${API_KEY}`
  );

  const data = await res.json();
  return data.guest_session_id;
}
