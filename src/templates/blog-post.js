import React from 'react';
import Helmet from 'react-helmet';
import { graphql } from 'gatsby';
import Container from '../components/Container';
import Footer from '../components/Footer';
import Logo from '../components/Logo';
import Header from '../components/Header';

const Template = ({ data }) => {
  const { markdownRemark } = data;
  const { title, date, spoiler } = markdownRemark.frontmatter;
  const html = markdownRemark.html;
  return (
    <Container>
      <Helmet>
        <title>{`${title} - John Sylvain`}</title>
        <meta name="title" content={`${title} - John Sylvain`} />
        <meta name="description" content={spoiler} />
      </Helmet>
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
        spoiler
      }
    }
  }
`;

export default Template;
