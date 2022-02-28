import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Item from '../common/Item';
import { MoreButton } from './MoreButton';

export const SearchList = (props) => {

	// const { searchKeyword } = props;
	const [data, setData] = useState();
	const [cardNum, setCardNum] = useState(30);
	const searchKeyword = '원피스';

	const fetchData = async () => {
		const response = await axios.get('https://static.pxl.ai/problem/data/products.json')
		
		setData(response.data);
	}

	useEffect(() => {
		fetchData();
	}, [])

	return (
		<>
		<Container>
			{
				data && 
				data.filter((item, index) => item.name.split('_')[0] === searchKeyword)
				.filter((item, index) => index <= cardNum)
				.map((product) => (
					<Card key={product.product_code}>{product.name}</Card>
				))
			}
		</Container>
		{data ? 
			data.filter((item, index) => item.name.split('_')[0] === searchKeyword)
					.filter((item, index) => index <= cardNum).length < cardNum 
					? '' : <MoreButton cardNum={cardNum} setCardNum={setCardNum}/> 
					: ''
		}
		</>
	)
}

const Container = styled.div`
	width: 100%;
	height: auto;
	display: flex;
	flex-wrap: wrap;
	gap: 10px;
	flex: 0 auto;
`

const Card = styled.div`
	width: 150px;
	height: 200px;
	background-color: aliceblue;
`