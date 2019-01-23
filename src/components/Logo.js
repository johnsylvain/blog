import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';

const LogoLink = styled(Link)`
  margin: 1rem auto 3rem;
  display: inline-block;

  :focus {
    text-decoration: none;
  }
`;

const Logo = styled.div`
  background: #303952;
  border-radius: 50%;
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255, 255, 255, 0.9);
  font-weight: 500;
  width: 50px;
  height: 50px;
  transition: 0.2s ease;
  user-select: none;
  cursor: pointer;
  box-shadow: 4px 2px 0px rgba(255, 0, 0, 0.5),
    -5px -2px 0px rgba(0, 255, 0, 0.5), 2px -2px 0px rgba(0, 0, 255, 0.5);

  &:hover {
    box-shadow: 0px 0px 0px rgba(255, 0, 0, 0.5),
      0px 0px 0px rgba(0, 255, 0, 0.5), 0px 0px 0px rgba(0, 0, 255, 0.5);
    background: lighten(#303952, 3%);
    text-decoration: none;
  }
`;

export default () => (
  <LogoLink to="/">
    <Logo>JS</Logo>
  </LogoLink>
);
