'use client';

import { Tabs, Spin } from 'antd';
import { useEffect, useState } from 'react';
import MovieContainer from './MovieConteiner';
import SearchComponent from './Search';
import { createGuestSession } from '@/api/auth'; // твой метод для создания гостевой сессии

export default function AppTabs() {
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  // создаём гостевую сессию при старте
  useEffect(() => {
    createGuestSession().then((id) => {
      setSessionId(id);
    });
  }, []);

  // Пока sessionId не пришёл — показываем лоадер
  if (!sessionId) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spin
          size="large"
          tip="Loading movies..."
          className='loader'
          fullscreen
        />
      </div>
    );
  }

  const items = [
    {
      key: 'search',
      label: 'Search',
      children: (
        <>
          <SearchComponent onSearch={setSearchTerm} />
          <MovieContainer
            mode="search"
            sessionId={sessionId}
            searchTerm={searchTerm}
          />
        </>
      ),
    },
    {
      key: 'rated',
      label: 'Rated',
      children: <MovieContainer mode="rated" sessionId={sessionId} />,
    },
  ];

  return <Tabs items={items} centered />;
}
