const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

export async function getMovies(page: number = 1) {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&page=${page}`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch movies");
  }

  return res.json();
}


export async function getGenres() {
  const res = await fetch(
    `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch genres");
  }

  return res.json();
}
