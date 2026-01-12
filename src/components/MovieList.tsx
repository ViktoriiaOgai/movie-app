import { Row, Col } from "antd";
import MovieCard from "./MovieCard";
import { Movie } from "@/types/movie";
import '../app/styles/start.css';

export default function MovieList({ movies }: { movies: Movie[] }) {
  return (
    <Row gutter={[24, 24]}>
      {movies.slice(0, 6).map((movie) => (
        <Col span={12} key={movie.id}>
          <MovieCard movie={movie} />
        </Col>
      ))}
    </Row>
  );
}
