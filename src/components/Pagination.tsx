import { useRouter } from 'next/router';
import React, { useContext } from 'react';
import Context from '../context';

const Pagination = () => {
  const router = useRouter();
  const { offset, limit, setLimit } = useContext(Context);
  const handleLocationChange = (offset: number, limit: number) => {
    router.push(
      {
        pathname: router.pathname,
        query: {
          ...router.query,
          p: Math.floor(offset / limit).toString(),
        },
      },
      undefined,
      {}
    );
  };

  const handleClick = (action: string) => {
    let newOffset = offset;
    switch (action) {
      case 'decrese':
        newOffset = offset - limit < 0 ? 0 : offset - limit;
        break;
      case 'increase':
        newOffset = offset + limit;
        break;
    }
    handleLocationChange(newOffset, limit);
  };

  const handleSelectChange = (e: React.FormEvent<HTMLSelectElement>) => {
    const limit = Number(e.currentTarget.value);
    handleLocationChange(0, limit);
    setLimit(limit);
  };

  return (
    <div>
      <button
        onClick={() => {
          handleClick('decrese');
        }}
      >
        Previous
      </button>
      <button
        onClick={() => {
          handleClick('increase');
        }}
      >
        Next
      </button>
      <select id="limit-select" value={limit} onChange={handleSelectChange}>
        <option value="3">3</option>
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="15">15</option>
      </select>
    </div>
  );
};

export default Pagination;
