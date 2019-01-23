import styled from 'styled-components';

const PostPreviewText = styled.span`
  display: block;
  margin-right: 10px;

  font-weight: ${props => (props.bold ? 500 : 400)};
  opacity: ${props => (props.bold ? 1 : 0.7)};

  ${props => props.bold && `flex-grow: 1;`}
`;

export default PostPreviewText;
