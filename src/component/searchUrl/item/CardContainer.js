import axios from 'axios';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Item from '../../common/Item';

const productDataUrl = 'https://static.pxl.ai/problem/data/products.json';

const CardContainer = () => {
  const params = new URLSearchParams(window.location.search);
  let searchkey = params.get('searchkey');

  const [imgUrl, setImgUrl] = useState();
  const [name, setName] = useState();
  const [price, setPrice] = useState();
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getProductData = async () => {
      setIsLoading(true);
      await axios
        .get(productDataUrl)
        .then((res) => {
          const productIndex = res.data[searchkey - 1].name.indexOf('_');
          const productName = res.data[searchkey - 1].name.substring(0, productIndex);
          setProducts(res.data.filter((product) => product.name.includes(productName)));
          // products.map((produ))
          setIsLoading(false);

          // const productIndex = res.data[0].name.indexOf('_');
          // const product = res.data[0].name.substring(0, productIndex);
          // setName(product);

          // const img_url = res.data[0].image_url;
          // setImgUrl(img_url);

          // const price = res.data[0].price;
          // setPrice(price);
        })
        .catch((err) => {});
    };
    getProductData();
  }, [productDataUrl]);

  if (isLoading) return <div>Loading</div>;

  return (
    <Container className="container">
      {products.map((product) => (
        <Item image_url={product.image_url} name={product.name} price={product.price} />
      ))}
      {/* <Item image_url={imgUrl} name={name} price={price} />
      <Item image_url={imgUrl} name={name} price={price} />
      <Item image_url={imgUrl} name={name} price={price} />
      <Item image_url={imgUrl} name={name} price={price} />
      <Item image_url={imgUrl} name={name} price={price} />
      <Item image_url={imgUrl} name={name} price={price} />
      <Item image_url={imgUrl} name={name} price={price} />
      <Item image_url={imgUrl} name={name} price={price} />
      <Item image_url={imgUrl} name={name} price={price} />
      <Item image_url={imgUrl} name={name} price={price} /> */}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100vw;
  height: 100vh;
  margin-left: 2vh;
  /* padding-right: 2vh; */
`;

// const Items = styled.Item`
//   /* width: 15vw;
//   height: 30vh;
//   background-color: blue; */
//   margin-right: 2vw;
//   margin-bottom: 3vh;
// `;

export default CardContainer;
