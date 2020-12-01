import React from 'react';
import Helmet from 'react-helmet';
import { graphql } from 'gatsby';
import Container from '../components/Container';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Logo from '../components/Logo';
import PostPreview from '../components/PostPreview';
import PostPreviewText from '../components/PostPreviewText';
import Tag from '../components/Tag';

const Layout = ({ data }) => {
  return (
    <Container>
      <Helmet>
        <title>Blog - John Sylvain</title>
        <meta name="title" content="Blog - John Sylvain" />
        <meta name="description" content="A personal blog by John Sylvain" />
        <script
          async
          defer
          data-website-id="41f7749c-dda4-405a-9550-01cfb7f4ed9a"
          src="https://umami.sylvain.win/umami.js"
        />
      </Helmet>
      <Header style={{ textAlign: 'center' }}>
        <Logo />
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
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { hidden: { ne: true } } }
    ) {
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
