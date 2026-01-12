'use client';

import { useState, useEffect } from 'react';
import Loading from '../app/loading';
import ErrorComponent from '../app/error';
import MovieList from './MovieList';
import { Movie } from '../types/movie';
import { getMovies } from '../lib/tmdb';


export default function MovieContainer() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const loadMovies = async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await getMovies();
      if (data.results && data.results.length > 0) {
        setMovies(data.results);
      } else {
        setMovies([]);
        setError(new Error('No movies found'));
      }
    } catch (err: unknown) {
      setMovies([]);
      if (err instanceof Error) setError(err);
      else setError(new Error('Unknown error'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMovies();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      {loading && <Loading />}
      {error && <ErrorComponent error={error} reset={loadMovies} />}
      
    </div>
  );
}
