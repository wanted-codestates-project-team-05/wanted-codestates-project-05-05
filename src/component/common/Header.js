import React from 'react';

import styled from 'styled-components';
import logo from '../img/logo_pxl.png';
import { useNavigate } from 'react-router-dom';
const Header = () => {
  const navigate = useNavigate();
  return (
    <Container
      onClick={() => {
        navigate('/');
      }}
    >
      <Logo src={logo} alt="" />
    </Container>
  );
};

const Container = styled.header`
  display: flex;
  align-items: center;
  width: 100vw;
  height: 10vh;
  cursor: pointer;
`;

const Logo = styled.img`
  width: 6rem;
  height: 3rem;
  margin-left: 5rem;
  @media screen and (max-width: 780px) {
    margin-left: 1rem;
  }
`;

export default Header;
