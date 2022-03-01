import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../common/Header';
import Loading from '../common/Loading';
import useLocalStorage from '../../hooks/useLocalStorage';
import { products } from '../../Data/products';
import { regions } from '../../Data/regions';

const Home = () => {
  const [query, setQuery] = useLocalStorage('query', '');
  const [result, setResult] = useLocalStorage('result', '');
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const navigate = useNavigate();
  const handleChangeInput = (e) => {
    const { value } = e.target;
    setInputValue(value);
  };
  const filterResult = (type, value) => {
    let result = [];
    if (type === 'productCode') {
      result = regions.filter((product) => product.product_code === Number(value));
      setResult(result);
      return result;
    } else if (type === 'imageUrl') {
      result = regions.filter((product) => product.image_url === value);
      setResult(result);
      return result;
    } else if (type === 'keyword') {
      result = products.filter((product) => product.name.includes(value));
      setResult(result);
      return result;
    } else {
      console.log('타입지정 에러');
    }
  };
  const handleError = () => {
    console.log('검색결과 없음');
    setIsError(true);
  };
  const goSearchUrl = (result, value, type) => {
    if (result.length === 0) {
      handleError();
    } else {
      navigate(`searchUrl?${type}=${value}`);
    }
  };
  const goSearchKeyword = (result, value) => {
    if (result.length === 0) {
      handleError();
    } else {
      navigate(`searchKeyword?keyword=${value}`);
    }
  };
  const matchingSearchType = async (value) => {
    const productCodeCheck = /^[0-9]*$/;
    const imageUrlCheck = /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?(.*?)\.(jpg|jpeg|png|gif|bmp|pdf)$/;
    if (productCodeCheck.test(value)) {
      const result = filterResult('productCode', value);
      goSearchUrl(result, value, 'productCode');
    } else if (imageUrlCheck.test(value)) {
      const result = filterResult('imageUrl', value);
      goSearchUrl(result, value, 'imageUrl');
    } else {
      const result = filterResult('keyword', value);
      goSearchKeyword(result, value);
    }
  };
  const handleSearch = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setQuery(inputValue);
    setTimeout(() => {
      setIsLoading(false);
      matchingSearchType(inputValue);
      setInputValue('');
    }, 1000);
  };

  return (
    <Wrapper>
      <Header />
      {isLoading ? (
        <Loading message="Loading data..." />
      ) : (
        <Main>
          {isError ? (
            <Sign>
              <h1>No results found...</h1>
              <Des>
                <li>product 코드 검색: 숫자만 입력(ex: 1)</li>
                <li>url 검색: url 입력(ex: https://static.pxl.ai/problem/images/VT-070.jpg)</li>
                <li>키워드 검색 : 키워드 입력 (ex: 원피스)</li>
              </Des>
            </Sign>
          ) : (
            <Sign>
              <h1>Artificial Intelligence</h1>
              <h1>
                PXL
                <span> Fashion </span>
                Viewer
              </h1>
            </Sign>
          )}
          <Form onSubmit={handleSearch}>
            <Input type="text" placeholder="IMAGE URL or KEYWORD" onChange={handleChangeInput} value={inputValue} />
            <Btn type="submit">검색</Btn>
          </Form>
        </Main>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
const Main = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 80vw;
  height: 80vh;
`;
const Sign = styled.div`
  height: 30vh;
  font-size: 3rem;
  color: #4b4b4b;
  & > :nth-child(1) {
    font-weight: bold;
    color: #4b4b4b;
  }
  & > :nth-child(2) {
    color: #878787;
    > span {
      font-weight: bold;
      color: #4b4b4b;
    }
  }
`;
const Form = styled.form`
  display: flex;
  justify-content: center;
`;
const Input = styled.input`
  width: 35rem;
  line-height: 2.7rem;
  font-size: 1rem;
  border-radius: 1.7rem;
  border: none;
  box-shadow: 0px 0px 7px rgb(240, 240, 240);
  padding-left: 1rem;
  &::placeholder {
    font-weight: 600;
    color: rgb(168, 168, 168);
  }
  @media screen and (max-width: 780px) {
    width: 28rem;
  }
  @media screen and (max-width: 500px) {
    width: 17rem;
  }
`;
const Btn = styled.button`
  width: 6rem;
  margin-left: 1rem;
  border: none;
  border-radius: 12px;
  font-size: 1.2rem;
  font-weight: 600;
  cursor: pointer;
  color: #4b4b4b;
`;

const Des = styled.ul`
  font-size: 1.5rem;
  color: grey;
  list-style: square;
`;

export default Home;
