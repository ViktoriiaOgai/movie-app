
'use client';

import { Rate } from 'antd';
import { format } from "date-fns";
import { Movie } from "@/types";
import { useGenres } from '@/app/providers';
import { buildGenresMap, getGenreNames } from "@/constants/genres";



type Props = {
  movie: Movie;
  sessionId: string | null;
  onRate: (movieId: number, rating: number) => void;
};

export default function MovieCard({ movie, sessionId, onRate }: Props) {
  const ratingValue = movie.rating ?? 0;

const { genres } = useGenres();
const genresMap = buildGenresMap(genres);
const genreNames = getGenreNames(movie.genre_ids, genresMap);
const getRatingBgClass = (rating: number) => {
  if (rating < 3) return 'border-[#E90000]';
  if (rating < 5) return 'border-[#E97E00]';
  if (rating < 7) return 'border-[#E9D100]';
  return 'border-[#66E900]';
};
  const releaseYear = movie.release_date
    ? format(new Date(movie.release_date), "MMMM d, yyyy")
    : "—";
  const POSTER_BASE_URL = 'https://image.tmdb.org/t/p/w300';
  const posterUrl = movie.poster_path

  ? `${POSTER_BASE_URL}${movie.poster_path}`
  : '/no-poster.png'; // локальная заглушка
  console.log('MovieCard render', movie.title);


   return (
    <article className="w-[500px] h-[300px] flex bg-white 
shadow-[0_4px_12px_rgba(0,0,0,0.15)]">
     
   <img
        className=" shrink-0 w-[190px] h-[300px] object-cover"
        src={posterUrl}
        alt={movie.title}
      />
      
      <div className="relative flex-1 p-[16px] flex flex-col">
         <div
              className={`
                absolute top-[16px] right-[16px]
                w-[30px] h-[30px]
                rounded-full
                border-2
                flex items-center justify-center
                text-black bg-white text-sm font-semibold
                z-30
                ${getRatingBgClass(ratingValue)}
              `}
            >
              {ratingValue.toFixed(1)}
  
          </div>
     
        <h3 className="font-normal text-[20px] leading-[28px]">{movie.title}</h3> 
        <span className="font-normal text-[12px] leading-[22px] text-[rgba(130,126,126,1)]">
          {movie.release_date}
        </span>
        <div className="flex flex-wrap gap-2 mt-2">
          {genreNames.map((genre) => (
            <span
              key={genre}
              className="border border-[#D9D9D9] rounded px-4 py-2 text-[11px] leading-[16px]"
            >
              {genre}
            </span>
          ))}
        </div>

        <p className="font-normal text-[12px] mt-[10px] leading-[22px] text-[rgba(0, 0, 0, 1)]">
          {movie.overview.slice(0, 140)}... 
        </p>
        {sessionId && (
        <div className="mt-2 text-xs leading-none">
  
  <Rate
    count={10}
    value={movie.rating ?? 0}
    onChange={(value) => onRate(movie.id, value)}
  />
</div>
      )}
      </div>
    </article>
    
   
  );
}
