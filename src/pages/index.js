import React from 'react';
import Helmet from 'react-helmet';
import { graphql } from 'gatsby';
import Container from '../components/Container';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Logo from '../components/Logo';
import PostPreview from '../components/PostPreview';
import PostPreviewText from '../components/PostPreviewText';
import DarkModeToggle from '../components/DarkModeToggle';
import GlobalStyle from '../components/GlobalStyle';

const Layout = ({ data }) => {
  return (
    <Container>
      <GlobalStyle />
      <Helmet>
        <title>Blog - John Sylvain</title>
        <meta name="title" content="Blog - John Sylvain" />
        <meta name="description" content="A personal blog by John Sylvain" />
      </Helmet>
      <Header>
        <Logo />
        <DarkModeToggle />
      </Header>
      <div>
        {data.allMarkdownRemark.edges.map(
          ({
            node: {
              frontmatter: { date, title, tag, path }
            }
          }) => (
            <PostPreview to={path} key={path}>
              <PostPreviewText>{date}</PostPreviewText>
              <PostPreviewText bold>{title}</PostPreviewText>
              <PostPreviewText>{tag}</PostPreviewText>
            </PostPreview>
          )
        )}
      </div>
      <Footer />
    </Container>
  );
};

export const query = graphql`
  query {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          frontmatter {
            date(formatString: "DD MMM YYYY")
            title
            path
            tag
          }
        }
      }
    }
  }
`;

export default Layout;
