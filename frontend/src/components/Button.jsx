import styled from 'styled-components';

const Button = styled.button`
  border: 0;
  cursor: pointer;
  outline: none;
  display: flex;
  justify-content: center;
  align-items: center;
  ${({ rectangle }) => (rectangle ? 'width: 4rem;' : '')}

  ${({ circle }) => (circle ? 'border-radius: 50%;' : '')}

  ${({ bgColor }) => (
    bgColor == null
      ? 'background: #FCA311;'
      : `background: ${bgColor};`
  )}

  ${({ width }) => (
    width == null
      ? 'width: 1.8rem;'
      : `width: ${width};`
  )}

  ${({ height }) => (
    height == null
      ? 'height: 1.8rem;'
      : `height: ${height};`
  )}

.icon {
  font-size: 0;
}`;

export default Button;
