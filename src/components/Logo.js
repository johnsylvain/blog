import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';
import useDarkMode from '../hooks/useDarkMode';

const LogoLink = styled(Link)`
  display: inline-block;
  text-decoration: none;

  :focus {
    text-decoration: none;
  }
`;

const Logo = styled.div`
  background: #54a0ff;
  border-radius: 3px;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255, 255, 255, 0.9);
  font-weight: 500;
  width: 30px;
  height: 30px;
  transition: 0.3s ease;
  user-select: none;

  &:hover {
    box-shadow: 0 2px 10px #30395266;
  }
`;

export default () => {
  const [darkMode] = useDarkMode();

  return (
    <LogoLink to="/">
      <Logo darkMode={darkMode}>JS</Logo>
    </LogoLink>
  );
};
