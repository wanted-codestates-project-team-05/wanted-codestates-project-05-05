import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import QueryString from 'qs';

const url = 'https://static.pxl.ai/problem/data/products.json';

const SearchKeyword = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryData = QueryString.parse(location.search, { ignoreQueryPrefix: true });
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const getData = async (url) => {
    const response = await axios.get(url);
    return response;
  };

  useEffect(() => {
    setIsLoading(true);
    getData(url)
      .then((res) => {
        setData(res.data.filter((item) => item.name.includes(queryData.searchkey)));
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        alert('error! ', err);
        navigate('/', { replace: true });
      });
  }, [navigate, queryData.searchkey]);

  useEffect(() => {
    console.log(data);
  }, [data]);

  useEffect(() => {
    console.log(isLoading);
  }, [isLoading]);

  if (isLoading) return <div>Loading</div>;
  return (
    <>
      {data.map((item) => (
        <div>
          <span>{item.name} </span>
          <a href={item.image_url} target={'_blank'} rel={'noreferrer'}>
            {item.image_url}{' '}
          </a>
          <span>{item.price}원 </span>
        </div>
      ))}
      ;
    </>
  );
};

export default SearchKeyword;
