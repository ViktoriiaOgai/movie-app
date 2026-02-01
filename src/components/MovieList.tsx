
import MovieCard from "./MovieCard";
import { Movie } from "@/types";
import "../app/globals.css"

type Props = {
  movies: Movie[];
  sessionId: string | null;
  onRate: (movieId: number, rating: number) => void;
};

export default function MovieList({ movies, sessionId, onRate }: Props) {
  return (
     <div className="grid grid-cols-1  md:grid-cols-2 gap-y-7.5 max-w-275 w-full mx-auto px-4 sm:px-0">
      {movies.map(movie => (
        <MovieCard
          key={movie.id}
          movie={movie}
          sessionId={sessionId}
          onRate={onRate}
        />
      ))}
    </div>
  );
}