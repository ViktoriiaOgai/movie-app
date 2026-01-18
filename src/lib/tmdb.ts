const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

export async function getMovies(page: number = 1, query: string = "") {
  const res = await fetch(
    `https://api.themoviedb.org/3/search/movie?query=${query || "return"}&api_key=${API_KEY}&page=${page}`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch movies");
  }

  return res.json();
}

