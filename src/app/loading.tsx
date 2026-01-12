'use client';

import { Spin } from 'antd';
import { useState } from 'react';

export default function Loading() {
    const [loading, setLoading] = useState(true);
  return (
    <div className="loader">
         {loading ? (
         <Spin size="large" tip="Loading..." fullscreen/>
      ) : (
        <div>ok!</div>
      )}
    </div>
           
  );
}