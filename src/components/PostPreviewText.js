import styled from 'styled-components';

const PostPreviewText = styled.span`
  display: block;
  font-weight: ${props => (props.bold ? 600 : 400)};
  opacity: ${props => (props.bold ? 1 : 0.7)};
  ${props => props.bold && `flex-grow: 1;`}

  &:not(:last-child) {
    margin-right: 10px;
  }
`;

export default PostPreviewText;
