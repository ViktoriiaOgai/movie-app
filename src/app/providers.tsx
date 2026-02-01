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
  setSessionId: (id: string | null) => void;
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
  // 1. Инициализируем стейт сразу из localStorage (без эффекта!)
  const [sessionId, setSessionId] = useState<string | null>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('guest_session_id');
    }
    return null;
  });

  const [genres, setGenres] = useState<Genre[]>([]);

  // 2. Один эффект для жанров
  useEffect(() => {
    getGenres().then((data) => setGenres(data.genres));
  }, []);

  // 3. Один эффект для создания сессии, если её НЕТ вообще
  useEffect(() => {
    // Если сессия уже есть (из localStorage или стейта), ничего не делаем
    if (sessionId) return;

    const fetchNewSession = async () => {
      try {
        const id = await createGuestSession();
        if (id) {
          localStorage.setItem('guest_session_id', id);
          setSessionId(id);
        }
        
      } catch (err) {
        console.error('Guest session error:', err);
      }
    };
    if (!sessionId) {
      fetchNewSession();
    } else {
      // ПРОВЕРКА: пробуем сделать легкий запрос к API TMDB с текущей сессией
      const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
      fetch(`https://api.themoviedb.org{sessionId}/rated/movies?api_key=${API_KEY}`)
        .then(res => {
          if (res.status === 401 || res.status === 404) {
            // Если сессия протухла (401) или не найдена (404)
            localStorage.removeItem('guest_session_id');
            setSessionId(null); // Это спровоцирует повторный вызов useEffect и создание новой сессии
          }
        })
        .catch(() => {
          // Если сеть упала, сессию не трогаем
        });
    }



    fetchNewSession();
  }, [sessionId]);

  return (
    <ConfigProvider>
      <SessionContext.Provider value={{ sessionId, setSessionId }}>
        <GenresContext.Provider value={{ genres }}>
          {children}
        </GenresContext.Provider>
      </SessionContext.Provider>
    </ConfigProvider>
  );
}