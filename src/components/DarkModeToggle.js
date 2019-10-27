import React from 'react';
import styled, { css } from 'styled-components';
import useDarkMode from '../hooks/useDarkMode';

const Label = styled.label`
  outline: 0;
  display: block;
  width: 3em;
  height: 1.5em;
  position: relative;
  cursor: pointer;
  user-select: none;
  margin: 0;

  background: #d3d3d3;
  border-radius: 2em;
  padding: 2px;
  transition: all 0.4s ease;

  &:after {
    position: relative;
    display: block;
    content: '';
    width: 50%;
    height: 100%;
    border-radius: 50%;
    background: white;
    transition: all 0.2s ease;
  }

  &:after {
    left: 0;
  }

  ${props =>
    props.checked &&
    css`
      background: #54a0ff;

      &:after {
        left: 50%;
      }
    `}
`;

const Input = styled.input`
  display: none;
`;

const DarkModeToggle = () => {
  const [darkMode, setDarkMode] = useDarkMode();

  return (
    <div>
      <Input
        id="dark-mode"
        type="checkbox"
        value={darkMode}
        defaultChecked={darkMode}
        onChange={() => {
          setDarkMode(!darkMode);
        }}
      />
      <Label htmlFor="dark-mode" checked={darkMode} />
    </div>
  );
};

export default DarkModeToggle;
