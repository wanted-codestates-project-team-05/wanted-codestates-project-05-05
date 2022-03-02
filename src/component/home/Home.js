import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../common/Header';
import Loading from '../common/Loading';
import useLocalStorage from '../../hooks/useLocalStorage';

const Home = () => {
  const [query, setQuery] = useLocalStorage('query', '');
  const [result, setResult] = useLocalStorage('result', '');
  const [products, setProducts] = useLocalStorage('products', '');
  const [regions, setRegions] = useLocalStorage('regions', '');
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const networkRequest = async (searchType) => {
    const requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    const dataType = searchType === 'keyword' ? 'products' : 'regions';
    const data = await fetch(`https://static.pxl.ai/problem/data/${dataType}.json`, requestOptions)
      .then(response => response.json())
      .catch(error => console.log(error, '네트워크 요청 에러'));

    return data;
  };
  const getData = async (value, searchType) => {
    let result = [];
    if (searchType === 'keyword') {
      if (products.length === 0) {
        const data = await networkRequest(searchType);
        setProducts(data);
        result = data.filter((product) => product.name.includes(value));
      } else {
        result = products.filter((product) => product.name.includes(value));
      }
    } else {
      if (regions.length === 0) {
        const data = await networkRequest(searchType);
        setRegions(data);
        if (searchType === 'productCode') {
          result = data.filter((product) => product.product_code === Number(value));
        } else {
          result = data.filter((product) => product.image_url === value);
        }
      } else {
        if (searchType === 'productCode') {
          result = regions.filter((product) => product.product_code === Number(value));
        } else {
          result = regions.filter((product) => product.image_url === value);
        }
      }
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
    const imageUrlCheck = /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?(.*?)\.(jpg|jpeg|png|gif|bmp|pdf)$/;
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
