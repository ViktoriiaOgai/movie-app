
import MovieCard from "./MovieCard";
import { Movie } from "@/types";

type Props = {
  movies: Movie[];
};

export default function MovieList({ movies }: Props) {
  return (
    <div className=" grid grid-cols-2 grid-rows-3 justify-center gap-x-6 gap-y-6 w-[950px] mx-auto py-20 ">
      {movies.map(movie => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
}