import React from 'react';
import { graphql } from 'gatsby';
import Footer from '../components/Footer';
import Container from '../components/Container';

const Template = ({ data }) => {
  const { markdownRemark } = data;
  const title = markdownRemark.frontmatter.title;
  const html = markdownRemark.html;
  return (
    <Container>
      <h1>{title}</h1>
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
      }
    }
  }
`;

export default Template;
