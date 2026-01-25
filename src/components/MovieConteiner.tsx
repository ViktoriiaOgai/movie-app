'use client';
import { rateMovie } from "@/api/rating";
import { useEffect, useState, useCallback } from 'react';
import { getMovies } from '@/lib/tmdb';
import MovieList from './MovieList';
import PaginationComponent from './Pagination';
import ErrorComponent from '@/app/root/error';
import { Movie } from '@/types';
import {Empty } from 'antd';

interface Props {
  mode: 'search' | 'rated';
  sessionId: string | null;
  searchTerm?: string;
}

const MovieContainer = ({  mode, sessionId, searchTerm}: Props) => {
  const handleRate = async (movieId: number, rating: number) => {
  if (!sessionId) return;

  try {
    await rateMovie(movieId, rating, sessionId);

     if (mode !== 'rated') {
      setMovies(prev =>
        prev.map(movie =>
          movie.id === movieId
            ? { ...movie, rating }
            : movie
        )
      );
    } else {
      await loadMovies(); 
    }
  } catch (e) {
    console.error("Rating failed", e);
  }
};
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

const PAGE_SIZE = 6;

const loadMovies = useCallback(async () => {
  setLoading(true);
  setError(null);

  try {
    const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

    let url = '';

    if (mode === 'rated') {
      if (!sessionId) return;
      url = `https://api.themoviedb.org/3/guest_session/${sessionId}/rated/movies?api_key=${API_KEY}&page=1`;
    } 
    else if (searchTerm?.trim()) {
  url = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
    searchTerm
  )}&api_key=${API_KEY}&page=${page}`;
}
    else {
  const data = await getMovies(page);

  if (!data || !Array.isArray(data.results)) {
  throw new Error('Invalid movie data');
}

  setMovies(data.results.slice(0, PAGE_SIZE));
  setTotalPages(data.total_pages);
  return;
}

    const res = await fetch(url);
    const data = await res.json();

    if (mode === 'rated') {
  const allMovies = Array.isArray(data.results) ? data.results : [];

  const start = (page - 1) * PAGE_SIZE;
  const end = start + PAGE_SIZE;

  setMovies(allMovies.slice(start, end));
  setTotalPages(Math.ceil(allMovies.length / PAGE_SIZE));
} else {
  setMovies(Array.isArray(data.results) ? data.results.slice(0, PAGE_SIZE) : []);
  setTotalPages(data.total_pages ?? 1);
}


  } catch {
    setMovies([]);
    setTotalPages(1);
    setError(new Error('Failed to load movies'));
  } finally {
    setLoading(false);
  }
}, [mode, page, searchTerm, sessionId]);

useEffect(() => {
  setPage(1);
}, [mode, searchTerm]);

  useEffect(() => {
  loadMovies();
}, [loadMovies]);


  if (error)
    return <ErrorComponent error={error} reset={() => setPage(1)} />;

  return (
    <section className="min-h-screen flex flex-col items-center  gap-y-[30px]">
  
         
      {!loading && !error && movies.length === 0 && (
      <div className="min-h-screen flex justify-center items-center">
 <Empty description="No results" />
 </div>
    )}
      
          {movies.length > 0 && <MovieList 
          movies={movies}  
          sessionId={sessionId}
          onRate={handleRate}
          />}
          {!loading && totalPages > 1 && (
          <PaginationComponent
            current={page}
            totalPages={totalPages}
            onChange={setPage}
          />
      )}
   </section>
  );
}
export default MovieContainer;