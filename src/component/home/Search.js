import React, { useState } from 'react';
import useLocalStorage from '../../hooks/useLocalStorage';

const Search = (props) => {
  const [result, setResult] = useLocalStorage('result', '');
  const handleSearch = (text) => {
    setResult(text);
  };

  return (
    <div>
      <input type="text" />
      <button onClick={() => handleSearch('원피스')}>검색</button>
      <p>{result}</p>
    </div>
  );
};

export default Search;
