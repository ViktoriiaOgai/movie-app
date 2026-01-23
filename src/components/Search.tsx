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
    <div className="mx-auto w-[75%] py-10 mb-[20px] mt-[20px]">
      <Input
        placeholder="Type to search..."
        onChange={handleInputChange}
        allowClear
      />
    </div>
  );
}
