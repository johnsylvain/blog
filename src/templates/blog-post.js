import React from 'react';
import { graphql } from 'gatsby';
import Container from '../components/Container';
import Footer from '../components/Footer';
import Logo from '../components/Logo';
import Header from '../components/header';

const Template = ({ data }) => {
  const { markdownRemark } = data;
  const { title, date } = markdownRemark.frontmatter;
  const html = markdownRemark.html;
  return (
    <Container>
      <Header>
        <Logo />
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
