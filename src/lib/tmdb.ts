const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

export async function getMovies() {
    try {
       const res = await fetch (
        `https://api.themoviedb.org/3/search/movie?query=return&api_key=${API_KEY}`,
    { cache: "no-store" }
    )
    if (!res.ok) {
    throw new Error('Failed to fetch movies');
  }

    return res.json();
} catch (error) {
    if (error instanceof TypeError) {
      throw new Error('No internet connection');
    }
    throw error;
  }
}
  
