'use client';

import { createContext, useContext, useEffect, useState } from "react";
import { getGenres } from "@/lib/tmdb";
import { createGuestSession } from "@/api/auth";
import { Genre } from "@/types";
import { ConfigProvider} from "antd";

/* ---------- Genres ---------- */

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

/* ---------- Session ---------- */

type SessionContextType = {
  sessionId: string | null;
};

const SessionContext = createContext<SessionContextType | null>(null);

export const useSession = () => {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error("useSession must be used within SessionProvider");
  }
  return context;
};

/* ---------- Provider ---------- */

export default function Providers({ children }: { children: React.ReactNode }) {
  // ✅ читаем localStorage СРАЗУ
  const [sessionId, setSessionId] = useState<string | null>(() => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("guest_session_id");
  });

  const [genres, setGenres] = useState<Genre[]>([]);
  

  // Жанры
  useEffect(() => {
    getGenres().then((data) => setGenres(data.genres));
  }, []);

  // Если sessionId не было — создаём
  useEffect(() => {
    if (sessionId) return;

    createGuestSession().then((id) => {
      setSessionId(id);
     });
  }, [sessionId]);
  


  return (
    <ConfigProvider>
      <SessionContext.Provider value={{ sessionId }}>
        <GenresContext.Provider value={{ genres }}>
          {children}
        </GenresContext.Provider>
      </SessionContext.Provider>
    </ConfigProvider>
  );
}