
'use client';

import { Rate } from 'antd';
import { format } from "date-fns";
import { Movie } from "@/types";
import { useGenres } from '@/app/providers';
import { buildGenresMap, getGenreNames } from "@/constants/genres";
import Image from 'next/image';
import { useEffect, useState } from 'react';


type Props = {
  movie: Movie;
  sessionId: string | null;
  
  onRate: (movieId: number, rating: number) => void;
   disabled?: boolean;
};

export default function MovieCard({ movie, sessionId, onRate,disabled  }: Props) {
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
  <article className="mx-auto w-full max-w-125 md:max-w-none md:h-70 flex flex-col md:flex-row bg-white shadow-[0_4px_12px_rgba(0,0,0,0.15)] overflow-hidden">
    
    {/* ВЕРХНИЙ БЛОК (Мобильные) / ЛЕВЫЙ БЛОК (Десктоп) */}
    <div className="flex md:contents"> 
      {/* 
         md:contents — магия Tailwind. На десктопе этот div "исчезает", 
         и Image с правой частью становятся прямыми соседями в md:flex-row 
      */}
      
      {/* Постер */}
      <div className="relative w-[20%] md:w-47.5 shrink-0 m-2 md:m-0 aspect-2/3 md:aspect-auto md:h-full">
        <Image
          src={posterUrl}
          alt={movie.title}
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Инфо справа от картинки (только для мобилок это "шапка") */}
      <div className="relative flex-1 p-2 md:hidden"> 
        {/* Этот блок виден ТОЛЬКО на мобилках рядом с фото */}
        <div className={`absolute top-2 right-2 w-8 h-8 rounded-full border-2 flex items-center justify-center text-xs font-semibold ${getRatingBgClass(ratingValue)}`}>
          {ratingValue.toFixed(1)}
        </div>
        <h3 className="text [14px] text-wrap md:text-[18px] leading-tight truncate pr-8">{movie.title}</h3>
        <span className="text-[12px] text-gray-500">{releaseYear}</span>
        <div className="flex flex-wrap gap-1 mt-2">
          {genreNames.map((genre) => (
            <div
              key={genre}
              className="inline-flex items-center border border-[#D9D9D9] rounded px-2 text-[11px] leading-4 "
            >
              {genre}</div>
          ))}
        </div>
      </div>
    </div>

    {/* ОСНОВНОЙ КОНТЕНТ (На десктопе здесь всё: и заголовок, и описание) */}
    <div className="p-3 md:p-4 flex flex-col flex-1 min-w-0">
      
      {/* Заголовок для ДЕСКТОПА (скрыт на мобилках) */}
      <div className="hidden md:flex justify-between items-start">
        <div className="min-w-0">
          <h3 className="text-[20px] leading-7 truncate pr-2">{movie.title}</h3>
          <span className="text-[12px] text-gray-500">{releaseYear}</span>
          <div className="flex flex-wrap gap-2 mt-2">
            {genreNames.map(g => (
              <div key={g} className="border border-[#D9D9D9] rounded px-2 text-[11px]">{g}</div>
            ))}
          </div>
        </div>
        <div className={`shrink-0 w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm font-semibold ${getRatingBgClass(ratingValue)}`}>
          {ratingValue.toFixed(1)}
        </div>
      </div>

      {/* Описание (на мобилках идет под картинку, на десктопе — под заголовок) */}
      <p className="font-normal text-[12px] mt-1 md:mt-4 leading-relaxed text-black line-clamp-4 md:line-clamp-5">
        {movie.overview.slice(0, 140)}... 
      </p>

      {/* Звезды (всегда в самом низу своего контейнера) */}
      {sessionId && (
        <div className="mt-auto pt-1 flex justify-center md:justify-start scale-90 md:scale-100 origin-center md:origin-left">
          <Rate
            count={10}
            value={movie.rating ?? 0}
           onChange={(value) => !disabled && onRate(movie.id, value)} 
           disabled={disabled}
          />
        </div>
      )}
    </div>
  </article>
);
}
