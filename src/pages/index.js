import React from 'react';
import styled from 'styled-components';
import Logo from '../components/Logo';
import Footer from '../components/Footer';
import Container from '../components/Container';
import { graphql, Link } from 'gatsby';

const PostPreview = styled(Link)`
  display: flex;
  align-items: baseline;
  color: #555;
  text-decoration: none;
  margin-bottom: 1em;

  &:hover :nth-child(2) {
    color: #54a0ff;
  }
`;

const PostPreviewText = styled.span`
  display: block;
  margin-right: 10px;

  font-weight: ${props => (props.bold ? 500 : 400)};
  opacity: ${props => (props.bold ? 1 : 0.7)};

  ${props => props.bold && `flex-grow: 1;`}
`;

const Tag = styled.div`
  padding: 0.6em 1em;
  font-size: 0.625em;
  border-radius: 0.2em;
  background-color: #f4f4f7;
`;

const LogoLink = styled(Link)`
  :focus {
    text-decoration: none;
  }
`;

const Layout = ({ data }) => {
  return (
    <Container>
      <LogoLink to="/">
        <Logo>JS</Logo>
      </LogoLink>
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
