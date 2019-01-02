import React from 'react';
import { graphql, Link } from 'gatsby';
import styled from 'styled-components';
import Footer from '../components/Footer';
import Container from '../components/Container';
import Logo from '../components/Logo';

const Header = styled.header`
  h1 {
    margin-bottom: 0;
  }

  span {
    text-transform: uppercase;
    font-size: 0.725em;
    letter-spacing: 2px;
    text-align: center;
    display: block;
    margin: 1em 0 2em;
  }
`;

const LogoLink = styled(Link)`
  :focus {
    text-decoration: none;
  }
`;

const Template = ({ data }) => {
  const { markdownRemark } = data;
  const { title, date } = markdownRemark.frontmatter;
  const html = markdownRemark.html;
  return (
    <Container>
      <LogoLink to="/">
        <Logo>JS</Logo>
      </LogoLink>
      <Header>
        <h1>{title}</h1>
        <span>John Sylvain - {date}</span>
      </Header>
      <div
        className="blogpost"
        dangerouslySetInnerHTML={{ __html: html }}
        style={{
          fontFamily: 'avenir'
        }}
      />
      <Footer />
    </Container>
  );
};

export const query = graphql`
  query($pathSlug: String!) {
    markdownRemark(frontmatter: { path: { eq: $pathSlug } }) {
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
      }
    }
  }
`;

export default Template;
