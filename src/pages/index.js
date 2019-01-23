import React from 'react';
import { graphql } from 'gatsby';
import Container from '../components/Container';
import Footer from '../components/Footer';
import Header from '../components/header';
import Logo from '../components/Logo';
import PostPreview from '../components/PostPreview';
import PostPreviewText from '../components/PostPreviewText';
import Tag from '../components/Tag';

const Layout = ({ data }) => {
  return (
    <Container>
      <Header style={{ textAlign: 'center' }}>
        <Logo />
      </Header>
      <div>
        {data.allMarkdownRemark.edges.map(
          ({
            node: {
              frontmatter: { date, title, tags, path }
            }
          }) => (
            <PostPreview to={path} key={path}>
              <PostPreviewText>{date}</PostPreviewText>
              <PostPreviewText bold>{title}</PostPreviewText>
              {tags.map(tag => (
                <Tag key={tag}>{tag}</Tag>
              ))}
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
            tags
          }
        }
      }
    }
  }
`;

export default Layout;
