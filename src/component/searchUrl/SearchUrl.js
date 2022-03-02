import React from 'react';
import Product from './item/Product';
import Header from '../common/Header';
import CardContainer from './item/CardContainer';
import styled from 'styled-components';
import { StickyContainer } from 'react-sticky';

const SearchUrl = (props) => {
  // const params = props.match.params.product_code;
  // console.log(params);

  return (
    <div>
      <Header />
      <Contents>
        <StickyContainer>
          <Test>
            <Product />
          </Test>
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

const Test = styled.div`
  height: 400%;
`;

export default SearchUrl;
