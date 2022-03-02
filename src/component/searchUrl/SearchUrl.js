import React from 'react';
import Product from './item/Product';
import Header from '../common/Header';
import CardContainer from './item/CardContainer';
import styled from 'styled-components';
import { StickyContainer } from 'react-sticky';

const SearchUrl = (props) => {
  return (
    <div>
      <Header />
      <Contents>
        <StickyContainer>
          <Product />
        </StickyContainer>
        <CardContainer />
      </Contents>
    </div>
  );
};

const Contents = styled.div`
  display: flex;

  @media (max-width: 800px) {
    display: block;
  }
`;

export default SearchUrl;
