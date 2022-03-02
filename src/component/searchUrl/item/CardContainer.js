import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import Item from '../../common/Item';
import Loading from '../../common/Loading';
import { MoreButton } from '../../searchKeyword/MoreButton';
import useLocalStorage from '../../../hooks/useLocalStorage';

const CardContainer = (props) => {
  let [searchParams, setSearchParams] = useSearchParams();
  let productCode = searchParams.get('productCode');
  let imageUrl = searchParams.get('imageUrl');

  const [allProducts, setAllProducts] = useLocalStorage('products');
  // 필터링된 데이터
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [cardNum, setCardNum] = useState(30);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    try {
      if (productCode) {
        const productIndex = allProducts[productCode - 1].name.indexOf('_');
        const productName = allProducts[productCode - 1].name.substring(0, productIndex);
        setProducts(allProducts.filter((product) => product.name.includes(productName)));
      } else {
        const findProduct = allProducts.filter((data) => data.image_url === imageUrl);
        const productIndex = findProduct[0].name.indexOf('_');
        const productName = findProduct[0].name.substring(0, productIndex);
        setProducts(allProducts.filter((product) => product.name.includes(productName)));
      }
    } catch (err) {
      console.log(err, '데이터를 불러오는데 실패하였습니다.');
    }
    setIsLoading(false);
    return () => setProducts(null);
  }, [searchParams]);

  return isLoading ? (
    <Loading />
  ) : (
    <Container>
      <Card className="container">
        {products
          .filter((product, index) => index <= cardNum)
          .map((product) => (
            <Item
              key={product.product_code}
              product_code={product.product_code}
              image_url={product.image_url}
              name={product.name}
              price={product.price}
            />
          ))}
      </Card>
      <ButtonWrapper>
        {products ? (
          products.filter((product, index) => index <= cardNum).length < cardNum ? (
            ''
          ) : (
            <MoreButton cardNum={cardNum} setCardNum={setCardNum} />
          )
        ) : (
          ''
        )}
      </ButtonWrapper>
    </Container>
  );
};

const Container = styled.div`
  display: inline-block;
  width: 100vw;

  @media (max-width: 800px) {
    padding-left: 0;
    margin-left: 0;
  }
`;

const Card = styled.div`
  width: calc(10.75rem * 8 + 8 * 0.625rem);
  height: auto;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin: 0 auto;
  box-sizing: border-box;
  padding-left: 5px;
  margin-top: 5vh;

  @media (max-width: 1950px) {
    width: calc(10.75rem * 7 + 7 * 0.625rem);
  }

  @media (max-width: 1720px) {
    width: calc(10.75rem * 6 + 6 * 0.625rem);
  }

  @media (max-width: 1550px) {
    width: calc(10.75rem * 5 + 5 * 0.625rem);
  }
  @media (max-width: 1350px) {
    width: calc(10.75rem * 4 + 4 * 0.625rem);
  }
  @media (max-width: 1180px) {
    width: calc(10.75rem * 3 + 3 * 0.625rem);
  }
  @media (max-width: 1020px) {
    width: calc(10.75rem * 2 + 2 * 0.625rem);
  }
`;

const ButtonWrapper = styled.div`
  width: 100%;
  height: 6.25rem;
  margin: 10px auto;
  display: flex;
  align-items: center;
`;

export default CardContainer;
