import React from 'react';
import useLocalStorage from '../../hooks/useLocalStorage';

const Search = () => {
  const [result, setResult] = useLocalStorage('result', '');

  return (
    <div>
      <input type="text" />
      {/*데이터 삽입하기*/}
      <button onClick={() => setResult('원피스')}>검색</button>
      {/*데이터 조회해서 사용하기*/}
      <p>{result}</p>
    </div>
  );
};

export default Search;
