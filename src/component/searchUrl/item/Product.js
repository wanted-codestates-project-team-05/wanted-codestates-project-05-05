import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

import AttributeList from './AttributeList';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Loading from '../../common/Loading';

const productDataUrl = 'https://static.pxl.ai/problem/data/products.json';

const Item = (props) => {
  let [searchParams, setSearchParams] = useSearchParams();
  let productCode = searchParams.get('productCode');
  let imageUrl = searchParams.get('imageUrl');

  const [productImg, setProductImg] = useState();
  const [productName, setProductName] = useState();
  const [categoryName, setCategoryName] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  // console.log(localResult[0]);

  useEffect(() => {
    const getProductData = async () => {
      setIsLoading(true);
      await axios
        .get(productDataUrl)
        .then((res) => {
          // product, category name만 찾기
          // console.log(res);
          if (productCode) {
            const productIndex = res.data[productCode - 1].name.indexOf('_');
            const product = res.data[productCode - 1].name.substring(0, productIndex);
            setProductName(product);

            const productImg = res.data[productCode - 1].image_url;
            setProductImg(productImg);

            const categories = res.data[productCode - 1].category_names.map((category) => {
              if (category === '') return;
              const categoryIndex = category.indexOf('.');
              const categoryName = category.substring(categoryIndex + 1, category.length).toUpperCase();
              return <Category key={category}>{categoryName}</Category>;
            });
            setCategoryName(categories);
          } else {
            const localResult = JSON.parse(window.localStorage.getItem('result'));
            // const productIndex = localResult[0].gender.indexOf('_');
            // const product = localResult[0].gender.substring(0, productIndex);
            const product = localResult[0].gender;
            setProductName(product);

            const productImg = localResult[0].image_url;
            setProductImg(productImg);

            const categories = localResult[0].category_names.map((category) => {
              if (category === '') return;
              const categoryIndex = category.indexOf('.');
              const categoryName = category.substring(categoryIndex + 1, category.length).toUpperCase();
              return <Category key={category}>{categoryName}</Category>;
            });
            setCategoryName(categories);
          }

          setIsLoading(false);
        })
        .catch((err) => {
          alert('데이터를 불러오는데 실패하였습니다.');
          navigate('/');
        });
    };
    getProductData();
    return () => setProductName(null), setProductImg(null);
  }, [searchParams]);

  if (isLoading) return <Loading />;

  return (
    <Container>
      <img src={productImg} />
      <Product>{productName}</Product>
      <Categories>{categoryName} </Categories>

      <AttributeList />
    </Container>
  );
};

const Container = styled.div`
  position: -webkit-sticky;
  position: sticky;
  top: 10px;
  width: 300px;
  text-align: left;
  padding-left: 3vh;
  margin-top: 5vh;
  img {
    width: 100%;
    height: 320px;
    padding-bottom: 1vh;
    object-fit: cover;
  }
  @media (max-width: 1200px) {
    width: 300px;
  }
  @media (max-width: 800px) {
    position: static;
    width: 400px;
    margin: auto;
  }

  @media (max-width: 400px) {
    width: 300px;
    position: static;
    margin: auto;
  }
`;

const Product = styled.div`
  padding-bottom: 3vh;
  padding-top: 3vh;
  font-weight: 400;
`;

const Category = styled.span`
  background-color: purple;
  color: white;
  margin-right: 3vh;
  padding: 1vh;
  font-size: 1vw;
  font-weight: 1400;
`;

const Categories = styled.div`
  display: inline-flex;
  width: 100%;
  margin-bottom: 3vh;
  padding-bottom: 3vh;
  border-bottom: 1px solid lightgray;
`;

export default Item;
