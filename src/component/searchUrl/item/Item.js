import React from 'react';
import styled from 'styled-components';
import Header from '../../common/Header';
import AttributeList from './AttributeList';

const dummy = {
  product_code: 1,
  name: '조끼_070',
  image_url: 'https://static.pxl.ai/problem/images/VT-070.jpg',
  price: 47733,
  category_names: ['c1.tops', 'c2.outwears', 'c3.vests'],
};

const Item = (props) => {
  // url 가져오기
  // const params = new URLSearchParams(location.search);
  // let name = params.get('name');
  const categories = dummy.category_names.map((category) => <div>{category}</div>);

  return (
    <aside>
      <Header />
      <Container>
        <img src="https://static.pxl.ai/problem/images/VT-070.jpg" />
        <div>{dummy.name}</div>
        <div>{categories}</div>
        <AttributeList />
      </Container>
    </aside>
  );
};

const Container = styled.div`
  width: 340px;
  height: 360px;
  text-align: left;
  img {
    width: 100%;
    // height: 100%;
  }
`;

export default Item;
