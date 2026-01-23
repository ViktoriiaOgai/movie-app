
import MovieCard from "./MovieCard";
import { Movie } from "@/types";

type Props = {
  movies: Movie[];
  sessionId: string | null;
  onRate: (movieId: number, rating: number) => void;
};

export default function MovieList({ movies, sessionId, onRate }: Props) {
  return (
     <div className="grid grid-cols-2 gap-y-[30px] max-w-[1100px] w-full">
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