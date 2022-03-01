import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Item from '../common/Item';
import { MoreButton } from './MoreButton';
import TextHighlight from '../common/TextHighlight';

export const SearchList = (props) => {

	const { searchKeyword, dataList } = props;
	const [cardNum, setCardNum] = useState(30);
	// const searchKeyword = '원피스';

	// const fetchData = async () => {
	// 	const response = await axios.get('https://static.pxl.ai/problem/data/products.json')
		
	// 	setData(response.data);
	// }

	// useEffect(() => {
	// 	fetchData();
	// }, [])

	return (
		<>
		<Container>
			{
				dataList && 
				dataList.filter((item, index) => item.name.includes(searchKeyword))
				.filter((item, index) => index <= cardNum)
				.map((product) => (
					<Item 
						key={product.product_code} 
						name={product.name} 
						image_url={product.image_url} 
						price={product.price}>
					</Item>
				))
			}
		</Container>
		<ButtonWrapper>
			{dataList ? 
				dataList.filter((item, index) => item.name.includes(searchKeyword))
						.filter((item, index) => index <= cardNum).length < cardNum 
						? '' : <MoreButton cardNum={cardNum} setCardNum={setCardNum}/> 
						: ''
			}
		</ButtonWrapper>
		</>
	)
}

const Container = styled.div`
	width: calc(10.75rem * 8 + 8 * 0.625rem);
	height: auto;
	display: flex;
	flex-wrap: wrap;
	gap: 10px;
	margin: 0 auto;
	box-sizing: border-box;
	padding-left: 5px;

	@media (max-width: 1456px){
		width: calc(10.75rem * 7 + 7 * 0.625rem);
	}
	@media (max-width: 1274px){
		width: calc(10.75rem * 6 + 6 * 0.625rem);
	}
	@media (max-width: 1140px){
		width: calc(10.75rem * 5 + 5 * 0.625rem);
	}
	@media (max-width: 980px){
		width: calc(10.75rem * 4 + 4 * 0.625rem);
	}
	@media (max-width: 820px){
		width: calc(10.75rem * 3 + 3 * 0.625rem);
	}
	@media (max-width: 660px){
		width: calc(10.75rem * 2 + 2 * 0.625rem);
	}
	@media (max-width: 500px){
		width: calc(10.75rem * 1 + 1 * 0.625rem);
	}
`

const ButtonWrapper = styled.div`
	width: 100%;
	height: 6.25rem;
	margin: 10px auto;
	display: flex;
	align-items: center;
`