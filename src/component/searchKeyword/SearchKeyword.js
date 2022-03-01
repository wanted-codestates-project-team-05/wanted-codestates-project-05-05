import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../common/Header';
import { SearchList } from '../searchKeyword/SearchList';
import useLocalStorage from '../../hooks/useLocalStorage';
import Loading from '../common/Loading';
import QueryString from 'qs';

const url = 'https://static.pxl.ai/problem/data/products.json';

const SearchKeyword = (props) => {

  const navigate = useNavigate();
	const location = useLocation();
	const queryData = QueryString.parse(location.search, { ignoreQueryPrefix: true });
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useLocalStorage('result', '');

	const getData = async () => {
		const response = await axios.get(url)
		.then((res) => res.data.filter((product) => product.name.includes(queryData.keyword)))
		.catch(() => {
			alert('데이터를 불러오는데 실패하였습니다.');
			navigate('/');
			return;
		})

		setData(response);
	}

	useEffect(() => {
		if(window.localStorage.getItem(queryData.keyword)) {
			setIsLoading(true)
		} else {
			getData();
		}
	}, [])

  if (isLoading) return <Loading/>;
  return (
    <>
			<Header/>
			<SearchList searchKeyword={queryData.keyword} dataList={data}/>
    </>
  );
};

export default SearchKeyword;
