import React, { useRef } from 'react';
import useLocalStorage from '../../hooks/useLocalStorage';
import { products } from '../../Data/products';

const Search = () => {
  const [query, setQuery] = useLocalStorage('query', '');
  const [result, setResult] = useLocalStorage('result', '');
  const inputRef = useRef('');
  const handleInputValue = (ref) => {
    const value = ref.current.value;
    ref.current.value = '';
    return value;
  };
  const handleError = () => {
    console.log('검색결과가 없습니다. ');
  };
  const matchingSearchType = (value) => {
    const productCodeCheck = /^[0-9]*$/;
    const imageUrlCheck = /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?(.*?)\.(jpg|jpeg|png|gif|bmp|pdf)$/;
    if (productCodeCheck.test(value)) {
      const productCodeResult = products.filter((product) => product.product_code === Number(value));
      setResult(productCodeResult);
    } else if (imageUrlCheck.test(value)) {
      const imageUrlResult = products.filter((product) => product.image_url === value);
      setResult(imageUrlResult);
    } else {
      const keywordResult = products.filter((product) => product.name.includes(value));
      setResult(keywordResult);
      if (result.length === 0) {
        handleError();
      }
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const value = handleInputValue(inputRef);
    setQuery(value);
    matchingSearchType(value);
  };

  return (
      <div>
        <form onSubmit={handleSearch}>
          <input type="text" ref={inputRef} />
          {/*데이터 삽입하기*/}
          <button type="submit">검색</button>
          {/*데이터 조회해서 사용하기*/}
        </form>
      </div>
  );
};

export default Search;
