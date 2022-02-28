import React from 'react';
import styled from 'styled-components';

export const MoreButton = (props) => {

	const { cardNum, setCardNum } = props;
	const perContents = 30;

	const handleMoreButton = () => {
		setCardNum(cardNum + perContents)
	}

	return (
		<Container onClick={handleMoreButton}>
			More
		</Container>
	)
}

const Container = styled.div`
	width: 9.375rem;
	height: 3.125rem;
	margin: 0 auto;
	background-color: lightblue;
	border-radius: 5px;
	display: flex;
	justify-content: center;
	align-items: center;
	box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
	cursor: pointer;
`