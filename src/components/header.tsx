import React from 'react';
import { Link } from 'react-router-dom';
import styled from "styled-components";

import { Logo } from '../components/logo';

const HeaderWrapper = styled.div`
  position: relative;
  width: 100%;
  margin-right: auto;
  margin-left: auto;
  max-width: 780px;
  text-align: center;
  
  a {
    display: inline-block;
    max-width: 200px;
    width: 60%;

    svg {
      display: block;
      width: 100%;
    }
  }

  @media(min-width: 576px) {
    & {
      text-align: left;
    }
  }
`;

const Header = () => {
  return (
    <HeaderWrapper>
      <Link to="/">
        <Logo />
      </Link>
    </HeaderWrapper>
  );
};

export default Header;