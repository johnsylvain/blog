import React from 'react';
import Container from '../components/Container';
import Footer from '../components/Footer';
import Logo from '../components/Logo';
import { graphql } from 'gatsby';
import PostPreview from '../components/PostPreview';
import PostPreviewText from '../components/PostPreviewText';
import Tag from '../components/Tag';

const Layout = ({ data }) => {
  return (
    <Container>
      <Logo />
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
            date(formatString: "MMMM DD, YYYY")
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
