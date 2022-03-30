import styled from 'styled-components';
import { Link } from 'gatsby';

const PostPreview = styled(Link)`
  display: flex;
  align-items: baseline;
  color: inherit;
  text-decoration: none;
  margin-bottom: 1em;

  &:hover > :nth-child(2) {
    color: #54a0ff;
  }

  & > span:first-child {
    min-width: 100px;
  }
`;

export default PostPreview;
