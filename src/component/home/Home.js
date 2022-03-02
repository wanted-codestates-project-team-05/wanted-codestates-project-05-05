import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../common/Header';
import Loading from '../common/Loading';
import useLocalStorage from '../../hooks/useLocalStorage';

const Home = () => {
  const [query, setQuery] = useLocalStorage('query', '');
  const [result, setResult] = useLocalStorage('result', '');
  const [products, setProducts] = useLocalStorage('products', []);
  const [regions, setRegions] = useLocalStorage('regions', []);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const requestOptions = {
    method: 'GET',
    redirect: 'follow',
  };
  useEffect(() => {
    if (regions.length === 0) {
      fetch(`https://static.pxl.ai/problem/data/regions.json`, requestOptions)
        .then((response) => response.json())
        .then((response) => setRegions(response))
        .catch((error) => console.log(error, '네트워크 요청 에러'));
    }
    if (products.length === 0) {
      fetch(`https://static.pxl.ai/problem/data/products.json`, requestOptions)
        .then((response) => response.json())
        .then((response) => setProducts(response))
        .catch((error) => console.log(error, '네트워크 요청 에러'));
    }
  }, [products.length, regions.length, setProducts, setRegions]);
  const getData = async (value, searchType) => {
    let result = [];
    if (searchType === 'productCode') {
      console.log(regions);
      result = regions.filter((product) => product.product_code === Number(value));
    } else if (searchType === 'imageUrl') {
      result = regions.filter((product) => product.image_url === value);
    } else if (searchType === 'keyword') {
      result = products.filter((product) => product.name.includes(value));
    }
    setResult(result);
    return result;
  };
  const navigate = useNavigate();
  const handleChangeInput = (e) => {
    const { value } = e.target;
    setInputValue(value);
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
    const imageUrlCheck =
      /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?(.*?)\.(jpg|jpeg|png|gif|bmp|pdf)$/;
    setIsLoading(true);
    try {
      if (productCodeCheck.test(value)) {
        const result = await getData(value, 'productCode');
        goSearchUrl(result, value, 'productCode');
      } else if (imageUrlCheck.test(value)) {
        const result = await getData(value, 'imageUrl');
        goSearchUrl(result, value, 'imageUrl');
      } else {
        const result = await getData(value, 'keyword');
        goSearchKeyword(result, value);
      }
    } catch (error) {
      console.log(error, '검색알고리즘 에러');
    }
    setIsLoading(false);
  };
  const handleSearch = async (e) => {
    e.preventDefault();
    setQuery(inputValue);
    await matchingSearchType(inputValue);
    setInputValue('');
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
    font-size: 2rem;
  }
  & > :nth-child(2) {
    color: #878787;
    font-size: 2rem;
    > span {
      font-weight: bold;
      color: #4b4b4b;
    }
  }

  @media screen and (max-width: 500px) {
    height: 15vh;
    & > :nth-child(1) {
      font-size: 1.7rem;
      & > :nth-child(2) {
        color: #878787;
        font-size: 1.7rem;
      }
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
    width: 20rem;
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
  @media screen and (max-width: 500px) {
    display: none;
  }
`;

const Des = styled.ul`
  font-size: 1.5rem;
  color: grey;
  list-style: square;
`;

export default Home;
