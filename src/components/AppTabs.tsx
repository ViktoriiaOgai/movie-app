'use client';

import { Tabs, Spin } from 'antd';
import MovieContainer from './MovieConteiner';
import SearchComponent from './Search';
import { useState, useEffect } from 'react';
import { useSession } from '@/app/providers';

export default function AppTabs() {
  const { sessionId } = useSession();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('search'); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
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
      // Вкладка search всегда живет в DOM, чтобы не терять ввод текста
      children: (
        <div style={{ display: activeTab === 'search' ? 'block' : 'none' }}>
          <SearchComponent onSearch={setSearchTerm} />
          <MovieContainer
            mode="search"
            sessionId={sessionId}
            searchTerm={searchTerm}
          />
        </div>
      ),
    },
    {
      key: 'rated',
      label: 'Rated',
      // Вкладка rated пересоздается ТОЛЬКО когда она активна
      children: activeTab === 'rated' ? (
        <MovieContainer mode="rated" sessionId={sessionId} />
      ) : null,
    },
  ];

  return (
    <Tabs 
      activeKey={activeTab}
      onChange={(key) => setActiveTab(key)} 
      centered 
      items={items}
    />
  );
}