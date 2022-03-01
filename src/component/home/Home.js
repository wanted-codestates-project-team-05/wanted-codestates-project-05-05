import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../common/Header';
import Loading from '../common/Loading';

const Home = () => {
  const navigate = useNavigate();
  const [Keyword, setKeyword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  // input onchange
  const searchHandler = (e) => {
    const { value } = e.target;
    setKeyword(value);
  };
  // input enter event
  const enterHandler = (e) => {
    if (e.key === 'Enter') {
      btnOnclick(e);
    }
  };
  // button click event
  const btnOnclick = () => {
    if (Keyword === '') return alert('검색어를 입력해주세요.');
    // http가 포함 되어 있거나 숫자 일경우 => SearchUrl 페이지로 이동
    if (Keyword.includes('http') || !isNaN(Keyword)) {
      navigate({
        pathname: 'searchUrl',
        search: `searchkey=${Keyword}`,
      });
      // 그렇지 않은 경우 searchKeyword 페이지로 이동
    } else {
      navigate({
        pathname: 'searchKeyword',
        search: `searchkey=${Keyword}`,
      });
    }
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
          <Search>
            <SearchBar
              type="text"
              placeholder="IMAGE URL or KEYWORD"
              onChange={searchHandler}
              onKeyPress={enterHandler}
            />
            <Btn onClick={btnOnclick}>검색</Btn>
          </Search>
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
const Search = styled.div`
  display: flex;
  justify-content: center;
`;
const SearchBar = styled.input`
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
