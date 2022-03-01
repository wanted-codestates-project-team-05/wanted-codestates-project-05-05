import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

import AttributeList from './AttributeList';

const productDataUrl = 'https://static.pxl.ai/problem/data/products.json';

const Item = (props) => {
  const params = new URLSearchParams(window.location.search);
  let searchkey = params.get('searchkey');

  const [productImg, setProductImg] = useState();
  const [productName, setProductName] = useState();
  const [categoryName, setCategoryName] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getProductData = async () => {
      setIsLoading(true);
      await axios
        .get(productDataUrl)
        .then((res) => {
          // product, category name만 찾기
          const productIndex = res.data[searchkey - 1].name.indexOf('_');
          const product = res.data[searchkey - 1].name.substring(0, productIndex);
          setProductName(product);

          const productImg = res.data[searchkey - 1].image_url;
          setProductImg(productImg);

          const categories = res.data[searchkey - 1].category_names.map((category) => {
            if (category === '') return;
            const categoryIndex = category.indexOf('.');
            const categoryName = category.substring(categoryIndex + 1, category.length).toUpperCase();
            return <Category key={category}>{categoryName}</Category>;
          });
          setCategoryName(categories);
          setIsLoading(false);
        })
        .catch((err) => {});
    };
    getProductData();
    // return
  }, [productDataUrl]);

  if (isLoading) return <div>loading</div>;

  return (
    <aside>
      <Container>
        {/* <div> */}
        <img src={productImg} />
        <Product>{productName}</Product>
        <Categories>{categoryName} </Categories>
        {/* </div> */}
        <AttributeList />
      </Container>
    </aside>
  );
};

const Container = styled.div`
  width: 40vh;
  /* height: 360px; */
  text-align: left;
  padding-left: 3vh;
  margin-top: 5vh;
  img {
    width: 100%;
    padding-bottom: 1vh;
    // height: 100%;
  }
`;

const ItemContainer = styled.div;

const Product = styled.div`
  padding-bottom: 3vh;
  padding-top: 3vh;
`;

const Category = styled.span`
  /* width: 100%; */
  background-color: purple;
  color: white;
  margin-right: 3vh;
  padding: 1vh;
  font-size: 1vh;
`;

const Categories = styled.div`
  display: inline-flex;
  width: 100%;
  margin-bottom: 3vh;
  padding-bottom: 3vh;
  border-bottom: 1px solid lightgray;
`;

export default Item;
