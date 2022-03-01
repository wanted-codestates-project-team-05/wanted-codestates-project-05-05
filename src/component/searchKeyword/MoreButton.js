import React, { useState } from 'react';
import styled from 'styled-components';
import { TailSpin } from 'react-loader-spinner';

export const MoreButton = (props) => {

	const { cardNum, setCardNum } = props;
	const [buttonLoading, setButtonLoading] = useState(true);
	const perContents = 30;

	const handleMoreButton = () => {
		setTimeout(() => {
			setButtonLoading(true)			
			setCardNum(cardNum + perContents)
		}, 1000)
		setButtonLoading(false)
	}

	return (
		<Container onClick={handleMoreButton} loading={buttonLoading}>
			{buttonLoading ? 'More' : <TailSpin color="#4b4b4b" height={30} width={30} />}
		</Container>
	)
}

const Container = styled.div`
	width: 9.375rem;
	height: 3.125rem;
	margin: 0 auto;
	background-color: ${(props) => props.loading ? 'lightblue' : 'lightgray'};
	border-radius: 5px;
	display: flex;
	justify-content: center;
	align-items: center;
	box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
	cursor: pointer;
`