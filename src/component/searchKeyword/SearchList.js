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
					<Card key={product.product_code}>
						<TextHighlight text={product.name} keyword={searchKeyword}/>
					</Card>
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
	width: calc(9.375rem * 9 + 9 * 0.625rem);
	height: auto;
	display: flex;
	flex-wrap: wrap;
	gap: 10px;
	margin: 0 auto;
	box-sizing: border-box;
	padding-left: 5px;

	@media (max-width: 1420px){
		width: calc(9.375rem * 8 + 8 * 0.625rem);
	}
	@media (max-width: 1280px){
		width: calc(9.375rem * 7 + 7 * 0.625rem);
	}
	@media (max-width: 1120px){
		width: calc(9.375rem * 6 + 6 * 0.625rem);
	}
	@media (max-width: 960px){
		width: calc(9.375rem * 5 + 5 * 0.625rem);
	}
	@media (max-width: 800px){
		width: calc(9.375rem * 4 + 4 * 0.625rem);
	}
	@media (max-width: 640px){
		width: calc(9.375rem * 3 + 3 * 0.625rem);
	}
	@media (max-width: 480px){
		width: calc(9.375rem * 2 + 2 * 0.625rem);
	}
	@media (max-width: 320px){
		width: calc(9.375rem * 1 + 1 * 0.625rem);
	}
`

const ButtonWrapper = styled.div`
	width: 100%;
	height: 6.25rem;
	margin: 10px auto;
	display: flex;
	align-items: center;
`

const Card = styled.div`
	width: 150px;
	height: 200px;
	background-color: aliceblue;
`