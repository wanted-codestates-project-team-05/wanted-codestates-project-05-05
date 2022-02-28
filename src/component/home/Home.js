import React, { useState } from 'react';
import styled from 'styled-components';
import Header from '../common/Header';
import Loading from '../common/Loading';

const Home = () => {
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  // input onchange
  const searchHandler = (e) => {
    const { value } = e.target;
    setSearch(value);
  };
  // input enter event
  const enterHandler = (e) => {
    if (e.key === 'Enter') {
      console.log(`Enter ${search}`);
      setSearch('');
    }
  };
  // button click event
  const btnOnclick = (e) => {
    console.log(`onClick ${search}`);
    setSearch('');
  };
  return (
    <Wrapper>
      <Header />
      {isLoading ? (
        <Loading message="메인 페이지 로딩중" />
      ) : (
        <Main>
          <Sign>
            <span>Artificial Intelligence</span>
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
              onKeyPress={(e) => enterHandler(e)}
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
  & > span {
    font-weight: bold;
  }
  & > h1 {
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
