import React from 'react';
import styled from 'styled-components';
import useDarkMode from '../hooks/useDarkMode';
import { Sun, Moon } from './Icon';

const Toggle = styled.button`
  opacity: ${props => (props.darkMode ? 0.5 : 0.2)};
  background: none;
  border: none;
  outline: none;
  cursor: pointer;
  color: inherit;
`;

const DarkModeToggle = () => {
  const [darkMode, setDarkMode] = useDarkMode();

  return (
    <Toggle onClick={() => setDarkMode(!darkMode)} darkMode={darkMode}>
      {darkMode ? <Sun /> : <Moon />}
    </Toggle>
  );
};

export default DarkModeToggle;
