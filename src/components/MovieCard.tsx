// components/MovieCard.tsx
"use client";

import { Card, Tag } from "antd";
import { format } from "date-fns";
import { Movie } from "@/types/movie";
import { truncate } from "@/lib/truncate";

type Props = {
  movie: Movie;
};

export default function MovieCard({ movie }: Props) {
  const releaseYear = movie.release_date
    ? format(new Date(movie.release_date), "MMMM d, yyyy")
    : "—";

   return (
    <article className="movie-card">
      <img
        className="movie-poster"
        src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
        alt={movie.title}
      />

      <div className="movie-content">
        <h3>{movie.title}</h3>
        <span className="date">
          {movie.release_date}
        </span>

        <div className="genres">
          <span>Action</span>
          <span>Drama</span>
        </div>

        <p>
          {movie.overview.slice(0, 140)}...
        </p>
      </div>
    </article>
  );
}
