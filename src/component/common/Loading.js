import React from 'react';
import styled from 'styled-components';
import { TailSpin } from 'react-loader-spinner';

function Loading({ message }) {
  return (
    <Container>
      <TailSpin color="#4b4b4b" height={150} width={100} />
      <Contents>{message}...</Contents>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 80vw;
  height: 80vh;
`;

const Contents = styled.h1`
  margin-top: 2rem;
  font-size: 1.5rem;
  font-family: 'Courier New', Courier, monospace;
  color: #4b4b4b;
`;

export default Loading;
