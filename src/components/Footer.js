import React from 'react';
import styled from 'styled-components';
import CheckmarkIcon from '../../static/checkmark.svg';

const Checkmark = styled.div`
  width: 50px;
  height: 50px;
  border: 2px solid #54a0ff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  margin: 0 auto 20px;

  ::before,
  ::after {
    content: '';
    position: absolute;
    width: 100px;
    height: 2px;
    background-color: #f4f4f7;
  }

  ::before {
    right: 60px;
  }

  ::after {
    left: 60px;
  }

  img {
    display: block;
    margin: 0;
    width: 30px;
    height: 30px;
  }
`;

const Footer = styled.footer`
  text-align: center;
  margin: 100px 0;
`;

export default () => (
  <Footer>
    <Checkmark>
      <img src={CheckmarkIcon} alt="" />
    </Checkmark>
    You're all caught up.
  </Footer>
);
