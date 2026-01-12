const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;


export async function getMovies() {
  if (!API_KEY) throw new Error('TMDB_API_KEY is not set in environment variables');

  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`,
      { cache: "no-store" }
    );

    if (!res.ok) {
      throw new Error('Failed to fetch movies');
    }

    const data = await res.json();
        return data;// у data есть поле results: Movie[]
  } catch (error) {
    if (error instanceof TypeError) {
      throw new Error('No internet connection');
    }
    throw error;
  }
}
