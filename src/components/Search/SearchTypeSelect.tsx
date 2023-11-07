import React from 'react';

type Props = {
  searchType: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  selectValues: string[];
};

const SearchTypeSelect = ({ searchType, onChange, selectValues }: Props) => {
  return (
    <select value={searchType} onChange={onChange}>
      {selectValues.map((value, index) => (
        <option key={index} value={value.toLowerCase()}>
          {value}
        </option>
      ))}
    </select>
  );
};

export default SearchTypeSelect;
