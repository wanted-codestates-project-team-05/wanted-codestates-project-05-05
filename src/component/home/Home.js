import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../common/Header';
import Loading from '../common/Loading';
import useLocalStorage from '../../hooks/useLocalStorage';
import { products } from '../../Data/products';

const Home = () => {
  const [query, setQuery] = useLocalStorage('query', '');
  const [result, setResult] = useLocalStorage('result', '');
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const handleChangeInput = (e) => {
    const { value } = e.target;
    setInputValue(value);
  };
  const handleError = () => {
    if (result.length === 0) {
      console.log('검색결과가 없습니다. ');
    }
  };
  const filterResult = (type, value) => {
    switch (type) {
      case 'productCode':
        setResult(products.filter((product) => product.product_code === Number(value)));
        break;
      case 'imageURrl':
        setResult(products.filter((product) => product.image_url === value));
        break;
      case 'keyword':
        setResult(products.filter((product) => product.name.includes(value)));
        break;
      default:
        break;
    }
  };
  const matchingSearchType = async (value) => {
    const productCodeCheck = /^[0-9]*$/;
    const imageUrlCheck = /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?(.*?)\.(jpg|jpeg|png|gif|bmp|pdf)$/;
    if (productCodeCheck.test(value)) {
      await filterResult('imageURrl', value);
      await navigate(`searchUrl/:${value}`);
    } else if (imageUrlCheck.test(value)) {
      await filterResult('productCode', value);
      value = value.replace(/\/|:/g, '_');
      await navigate(`searchUrl/:${value}`);
    } else {
      await filterResult('keyword', value);
      await navigate(`searchKeyword/:${value}`);
    }
  };
  const handleSearch = (e) => {
    e.preventDefault();
    setQuery(inputValue);
    matchingSearchType(inputValue);
    setInputValue('');
  };

  return (
    <Wrapper>
      <Header />
      {isLoading ? (
        <Loading message="메인 페이지 로딩중" />
      ) : (
        <Main>
          <Sign>
            <h1>Artificial Intelligence</h1>
            <h1>
              PXL
              <span> Fashion </span>
              Viewer
            </h1>
          </Sign>
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

export default Home;
