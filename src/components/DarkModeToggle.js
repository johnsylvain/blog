import React from 'react';
import styled, { css } from 'styled-components';
import useDarkMode from '../hooks/useDarkMode';

const Toggle = styled.button`
  width: 20px;
  height: 20px;
  background: none;
  border: none;
  outline: none;
  cursor: pointer;
`;

const InnerCircle = styled.div`
  border-radius: 50%;
  background: #2c2c2c;
  width: 20px;
  height: 20px;
  position: relative;
  transition: 300ms ease-in-out;
  transform: scale(1);
  z-index: 1;
  opacity: 0.4;

  &:after {
    content: '';
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: 2px dotted #2c2c2c;
    position: absolute;
    top: 0px;
    left: 0px;
    transform: scale(0.5);
    transition: 300ms ease-in-out;
    z-index: -100;
  }

  &:before {
    content: '';
    width: 20px;
    height: 20px;
    background: white;
    position: absolute;
    top: -8px;
    left: 8px;
    border-radius: 50%;
    z-index: 3;
    transition: 300ms ease-in-out;
    transform: scale(1);
  }

  ${props =>
    props.darkMode &&
    css`
      background: white;
      transform: scale(0.7);

      &:before {
        background: #2c2c2c;
        transform: scale(0);
      }

      &:after {
        transform: scale(2);
        border-color: white;
      }
    `}
`;

const DarkModeToggle = () => {
  const [darkMode, setDarkMode] = useDarkMode();

  return (
    <div>
      <Toggle onClick={() => setDarkMode(!darkMode)}>
        <InnerCircle darkMode={darkMode} />
      </Toggle>
    </div>
  );
};

export default DarkModeToggle;
