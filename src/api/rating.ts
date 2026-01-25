const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

export async function rateMovie(
  movieId: number,
  rating: number,
  sessionId: string
) {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}/rating?api_key=${API_KEY}&guest_session_id=${sessionId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({ value: rating }),
    }
  );

  if (!res.ok) {
    console.error("TMDb rating error:", res);
    throw new Error("Failed to rate movie");
  }

  return res.json();
}
