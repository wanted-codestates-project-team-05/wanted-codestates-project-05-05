import React, { useEffect } from 'react';
import Product from './item/Product';
import Header from '../common/Header';
import CardContainer from './item/CardContainer';
import styled from 'styled-components';
import { StickyContainer } from 'react-sticky';
import QueryString from 'qs';
import { getProducts, getRegions } from '../../service/api';
import useLocalStorage from '../../hooks/useLocalStorage';
import { useLocation, useNavigate } from 'react-router-dom';
import Loading from '../common/Loading';

const SearchUrl = () => {
  const [result, setResult] = useLocalStorage('result', '');
  const [products, setProducts] = useLocalStorage('products', []);
  const [regions, setRegions] = useLocalStorage('regions', []);
  const navigate = useNavigate();
  const location = useLocation();
  const queryData = QueryString.parse(location.search, { ignoreQueryPrefix: true });
  const getData = async () => {
    try {
      const products = await getProducts();
      setProducts(products);
      const data = await getRegions();
      setRegions(data);
      if (queryData.productCode) {
        setResult(data.filter((region) => region.product_code === Number(queryData.productCode)));
      } else {
        setResult(data.filter((region) => region.image_url === queryData.imageUrl));
      }
    } catch (err) {
      alert('데이터를 불러오는데 실패하였습니다.');
      navigate('/');
    }
  };
  useEffect(() => {
    if (window.localStorage.getItem(queryData.productCode) || window.localStorage.getItem(queryData.imageUrl)) {
    } else {
      getData();
    }
  }, []);

  if (products.length === 0 || regions.length === 0) return <Loading />;
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
