'use client';

import { useEffect, useState } from 'react';
import { getMovies } from '@/lib/tmdb';
import MovieList from './MovieList';
import PaginationComponent from './Pagination';
import "../app/globals.css";
import ErrorComponent from '@/app/root/error';
import { Movie } from '@/types';
import { Spin, Empty } from 'antd';
import SearchComponent from './Search';


export default function MovieContainer() {
  const [searchTerm, setSearchTerm] = useState('');

  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
const PAGE_SIZE = 6;
 const fetchMovies = async (query: string, page: number) => {
  if (!query.trim()) return;

  setLoading(true);
  try {
    const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
    const res = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${query}&api_key=${API_KEY}&page=${page}`,
      { cache: "no-store" }
    );

    const data = await res.json();
    setMovies(data.results.slice(0, PAGE_SIZE));
    setTotalPages(data.total_pages);
  } catch (err) {
    setMovies([]);
    setTotalPages(1);
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    const loadMovies = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await getMovies(page);

        setMovies(data.results.slice(0, 6));
        setTotalPages(data.total_pages);

      } catch (err) {
        setError(new Error('Something went wrong'));

      } finally {
        setLoading(false);
      }
    };

    loadMovies();
  }, [page]);

  if (error)
    return <ErrorComponent error={error} reset={() => setPage(1)} />;

  return (
    <>
       
         {loading && (
        <Spin
          size="large"
          tip="Loading movies..."
          className='loader'
          fullscreen
        />
      )}
      {!loading && !error && movies.length === 0 && (
      <Empty description="No results" />
    )}
      {!loading && !error && movies.length > 0 && (
          <SearchComponent
              onSearch={(query) => {
              setSearchTerm(query);  // обновляем состояние поиска
              setPage(1);            // сброс страницы
              fetchMovies(query, 1); // делаем запрос
  }}
/>
      )}

          <MovieList movies={movies} />
          {!loading && totalPages > 1 && (
          <PaginationComponent
            current={page}
            totalPages={totalPages}
            onChange={setPage}
          />
      )}
    </>
  )
}