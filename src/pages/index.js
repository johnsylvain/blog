import React from 'react';
import styled from 'styled-components';
import Logo from '../components/Logo';
import { Link } from 'gatsby';

const Container = styled.main`
  max-width: 40rem;
  margin: 3em auto;
  padding: 0 1rem;
  color: #555;
`;

const PostPreview = styled(Link)`
  display: flex;
  align-items: baseline;
  color: #555;
  text-decoration: none;
  margin-bottom: 1em;

  &:hover :nth-child(2) {
    color: royalblue;
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

const Layout = ({ data }) => {
  return (
    <Container>
      <Link to="/">
        <Logo>JS</Logo>
      </Link>
      <div>
        {data.allMarkdownRemark.edges.map(
          ({
            node: {
              frontmatter: { date, title, tags, path }
            }
          }) => (
            <PostPreview to={path}>
              <PostPreviewText>{date}</PostPreviewText>
              <PostPreviewText bold>{title}</PostPreviewText>
              {tags.map(tag => (
                <Tag>{tag}</Tag>
              ))}
            </PostPreview>
          )
        )}
      </div>
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
