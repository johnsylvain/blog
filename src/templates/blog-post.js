import React from 'react';
import { graphql } from 'gatsby';
import styled from 'styled-components';
import Container from '../components/Container';
import Footer from '../components/Footer';
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

const Template = ({ data }) => {
  const { markdownRemark } = data;
  const { title, date } = markdownRemark.frontmatter;
  const html = markdownRemark.html;
  return (
    <Container>
      <Logo />
      <Header>
        <h1>{title}</h1>
        <span>John Sylvain - {date}</span>
      </Header>
      <div className="blogpost" dangerouslySetInnerHTML={{ __html: html }} />
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
