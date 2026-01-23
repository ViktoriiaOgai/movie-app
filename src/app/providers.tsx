'use client';

import { createContext, useContext, useEffect, useState } from "react";
import { getGenres } from "@/lib/tmdb";
import { Genre } from "@/types/index";
import { ConfigProvider } from "antd";

type GenresContextType = {
  genres: Genre[];
};

const GenresContext = createContext<GenresContextType | null>(null);

export const useGenres = () => {
  const context = useContext(GenresContext);
  if (!context) {
    throw new Error("useGenres must be used within GenresProvider");
  }
  return context;
};

export default function Providers({
  children,
}: {
  children: React.ReactNode;
}) {
  const [genres, setGenres] = useState<Genre[]>([]);

  useEffect(() => {
    getGenres().then((data) => setGenres(data.genres));
  }, []);

  return (
    <ConfigProvider>
      <GenresContext.Provider value={{ genres }}>
        {children}
      </GenresContext.Provider>
    </ConfigProvider>
  );
}
