
import { getMovies } from "@/lib/tmdb";
import MovieList from "@/components/MovieList";
import "./styles/start.css"
import PageLayout from "@/components/PageLayout";

export default async function HomePage() {
  const data = await getMovies();

  return (
    <PageLayout>
      <MovieList movies={data.results} />
    </PageLayout>
  );
}
