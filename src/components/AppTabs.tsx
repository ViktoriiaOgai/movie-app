'use client';

import { Tabs, Spin } from 'antd';
import MovieContainer from './MovieConteiner';
import SearchComponent from './Search';
import { useState, useEffect } from 'react';
import { useSession } from '@/app/providers';

export default function AppTabs() {
  const { sessionId } = useSession();
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  // имитация загрузки данных / спиннера
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spin
          size="large"
          tip="Loading movies..."
          className="loader"
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
