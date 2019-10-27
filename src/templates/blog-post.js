import React from 'react';
import styled from 'styled-components';
import Helmet from 'react-helmet';
import { graphql } from 'gatsby';
import Container from '../components/Container';
import Footer from '../components/Footer';
import Logo from '../components/Logo';
import Header from '../components/Header';
import GlobalStyle from '../components/GlobalStyle';
import DarkModeToggle from '../components/DarkModeToggle';

const PostDetails = styled.span`
  text-transform: uppercase;
  font-size: 0.725em;
  letter-spacing: 2px;
  display: block;
  margin: 1em 0 2em;
`;

const Template = ({ data }) => {
  const { markdownRemark } = data;
  const { title, date, spoiler } = markdownRemark.frontmatter;
  const html = markdownRemark.html;
  return (
    <Container>
      <GlobalStyle />
      <Helmet>
        <title>{`${title} - John Sylvain`}</title>
        <meta name="title" content={`${title} - John Sylvain`} />
        <meta name="description" content={spoiler} />
      </Helmet>
      <Header>
        <Logo />
        <DarkModeToggle />
      </Header>
      <div style={{ textAlign: 'center' }}>
        <h1>{title}</h1>
        <PostDetails>John Sylvain - {date}</PostDetails>
      </div>
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
