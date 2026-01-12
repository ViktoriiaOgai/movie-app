
import { getMovies } from "@/lib/tmdb";
import "./styles/start.css"
import PageLayout from "@/components/PageLayout";
import MovieList from "@/components/MovieList";
import MovieContainer from "../components/MovieConteiner";

export default async function HomePage() {
  const data = await getMovies();

  return (
    <PageLayout>
        <MovieContainer />
        <MovieList movies={data.results} />
    </PageLayout>
  );
}
