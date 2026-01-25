const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

export async function createGuestSession(): Promise<string> {
  if (!API_KEY) {
    throw new Error("TMDB API Key is missing in environment variables");
  }

  // Сначала пробуем восстановить сессию
  if (typeof window !== 'undefined') {
    const storedSession = localStorage.getItem('guest_session_id');
    if (storedSession) {
      return storedSession;
    }
  }

  // Только если нет — создаём новую
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/authentication/guest_session/new?api_key=${API_KEY}`,
      { cache: 'no-store' }
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch session: ${res.status}`);
    }

    const data = await res.json();

    if (!data.success || !data.guest_session_id) {
      throw new Error(data.status_message || "Failed to create guest session");
    }

    if (typeof window !== 'undefined') {
      localStorage.setItem('guest_session_id', data.guest_session_id);
      localStorage.setItem('session_created_at', Date.now().toString());
    }

    return data.guest_session_id;
  } catch (error) {
    console.error("Session creation error:", error);
    throw error;
  }
}
