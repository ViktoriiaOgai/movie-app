const API_KEY = process.env.TMDB_API_KEY;

export async function getMovies() {
    const res = await fetch (
        `https://api.themoviedb.org/3/search/movie?query=return&api_key=${API_KEY}`,
    { cache: "no-store" }
    );

    return res.json();
}