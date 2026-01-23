import { Genre } from "@/types/index";

/**
 * Превращает массив жанров в Map для быстрого доступа по id
 */
export function buildGenresMap(genres: Genre[]) {
  return new Map(genres.map((g) => [g.id, g.name]));
}

/**
 * По массиву id возвращает массив названий жанров
 */
export function getGenreNames(
  genreIds: number[] | undefined,
  genresMap: Map<number, string>
): string[] {
  if (!genreIds || genreIds.length === 0) return [];

  return genreIds
    .map((id) => genresMap.get(id))
    .filter(Boolean) as string[];
}

