import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import AttributeList from './AttributeList';
import { useSearchParams } from 'react-router-dom';
import Loading from '../../common/Loading';
import useLocalStorage from '../../../hooks/useLocalStorage';

const Item = (props) => {
  let [searchParams, setSearchParams] = useSearchParams();
  let productCode = searchParams.get('productCode');
  const [productImg, setProductImg] = useState();
  const [productName, setProductName] = useState();
  const [categoryName, setCategoryName] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [allProducts, setAllProducts] = useLocalStorage('products');
  const [result, setResult] = useLocalStorage('result');

  useEffect(() => {
    setIsLoading(true);

    try {
      if (productCode) {
        const productIndex = allProducts[productCode - 1].name.indexOf('_');
        const product = allProducts[productCode - 1].name.substring(0, productIndex);
        setProductName(product);
        const productImg = allProducts[productCode - 1].image_url;
        setProductImg(productImg);
        const categories = allProducts[productCode - 1].category_names.map((category) => {
          if (category === '') return;
          const categoryIndex = category.indexOf('.');
          const categoryName = category.substring(categoryIndex + 1, category.length).toUpperCase();
          return <Category key={category}>{categoryName}</Category>;
        });
        setCategoryName(categories);
      } else {
        const productCode = result[0].product_code;
        const productIndex = allProducts[productCode - 1].name.indexOf('_');
        const product = allProducts[productCode - 1].name.substring(0, productIndex);
        setProductName(product);
        const productImg = result[0].image_url;
        setProductImg(productImg);
        const categories = result[0].category_names.map((category) => {
          if (category === '') return;
          const categoryIndex = category.indexOf('.');
          const categoryName = category.substring(categoryIndex + 1, category.length).toUpperCase();
          return <Category key={category}>{categoryName}</Category>;
        });
        setCategoryName(categories);
      }
    } catch (err) {
      console.log(err);
    }

    setIsLoading(false);
    return () => setResult(null);
  }, [searchParams]);

  if (isLoading) return <Loading />;

  return isLoading ? (
    <Loading />
  ) : (
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
