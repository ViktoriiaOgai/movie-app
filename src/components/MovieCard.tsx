
import { format } from "date-fns";
import { Movie } from "@/types";

type Props = {
  movie: Movie;
};

export default function MovieCard({ movie }: Props) {
  const releaseYear = movie.release_date
    ? format(new Date(movie.release_date), "MMMM d, yyyy")
    : "—";
  const POSTER_BASE_URL = 'https://image.tmdb.org/t/p/w300';
  const posterUrl = movie.poster_path

  ? `${POSTER_BASE_URL}${movie.poster_path}`
  : '/no-poster.png'; // локальная заглушка

   return (
    <article className="flex bg-white overflow-hidden shadow-[0_4px_12px_rgba(0,0,0,0.15)] w-[451px] h-[279px] mb-[20px]">
      <img
        className=" w-[183px] h-[281px] opacity-100 object-cover"
        src={posterUrl}
        alt={movie.title}
      />

      <div className="p-[16px] flex flex-col g-[8px]">
        <h3 className="font-normal text-[20px] leading-[28px] align-middle">{movie.title}</h3> 
        <span className="font-normal text-[12px] leading-[22px] align-middle text-[rgba(130,126,126,1)]">
          {movie.release_date}
        </span>

        <div className="genres text-[11px] mt-[10px] border-[#ddd] px-[6px] py-[2px] mr-[6px] rounded">
          <span>Action</span>
          <span>Drama</span>
        </div>

        <p className="font-normal text-[12px] mt-[10px] leading-[22px] text-[rgba(0, 0, 0, 1)]">
          {movie.overview.slice(0, 140)}... 
        </p>
      </div>
    </article>
  );
}
