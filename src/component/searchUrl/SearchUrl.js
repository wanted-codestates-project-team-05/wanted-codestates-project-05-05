import React from 'react';
import Product from './item/Product';
import Header from '../common/Header';
import CardContainer from './item/CardContainer';
import styled from 'styled-components';

const SearchUrl = (props) => {
  // const params = props.match.params.product_code;
  // console.log(params);

  return (
    <div>
      <Header />
      <Contents>
        <Product />
        <CardContainer />
      </Contents>
    </div>
  );
};

const Contents = styled.div`
  display: flex;
`;

export default SearchUrl;
