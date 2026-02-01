'use client';

import { ChangeEvent, useMemo, useEffect } from 'react';
import { Input } from 'antd';
import debounce from 'lodash/debounce';

type SearchProps = {
  onSearch: (query: string) => void;
};

export default function SearchComponent({ onSearch }: SearchProps) {
  const debouncedSearch = useMemo(
    () =>
      debounce((value: string) => {
        onSearch(value);
      }, 500),
    [onSearch]
  );

  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    debouncedSearch(e.target.value);
  };

  return (
    <div className="w-[90%] mx-auto md:w-[85%] py-5 mb-5 mt-5">
      <Input
        placeholder="Type to search..."
        onChange={handleInputChange}
        allowClear
      />
    </div>
  );
}
