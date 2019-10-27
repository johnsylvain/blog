import React from 'react';
import styled from 'styled-components';

const Footer = styled.footer`
  margin: 100px 0;

  > div {
    display: inline-flex;
    align-items: center;
    font-size: 0.8rem;

    img {
      width: 3em;
      height: 3em;
      border-radius: 50%;
      margin: 0 1em 0 0;
    }

    a {
      text-decoration: none;
      font-weight: 600;
      color: inherit;

      &:hover {
        text-decoration: underline;
      }
    }
  }
`;

export default () => (
  <Footer>
    <div>
      <img
        src="https://avatars1.githubusercontent.com/u/6820989?s=460&v=4"
        alt=""
      />
      <div>
        <div>
          Personal blog by{' '}
          <a href="https://johnsylvain.me" target="_blank">
            John Sylvain
          </a>
        </div>
        <div>&copy; {new Date().getFullYear()}</div>
      </div>
    </div>
  </Footer>
);
