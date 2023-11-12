import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

type Props = {
  limit: number;
  offset: number;
  setOffset: React.Dispatch<React.SetStateAction<number>>;
  setLimit: React.Dispatch<React.SetStateAction<number>>;
};

const Pagination = ({ limit, offset, setOffset, setLimit }: Props) => {
  const location = useLocation();
  const history = useNavigate();

  const handleLocationChange = (offset: number, limit: number) => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set('p', Math.floor(offset / limit).toString());
    history(`?${searchParams.toString()}`);
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
    setOffset(newOffset);
    handleLocationChange(newOffset, limit);
  };

  const handleSelectChange = (e: React.FormEvent<HTMLSelectElement>) => {
    const limit = Number(e.currentTarget.value);
    handleLocationChange(0, limit);
    setOffset(0);
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
