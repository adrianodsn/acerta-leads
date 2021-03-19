import { css } from "styled-components";

const CssDefaultButton = css`
  background-color: ${({ theme }) => theme.colors.yellow};
  border: 1px solid ${({ theme }) => theme.colors.yellow};
  cursor: pointer;
  color: ${({ theme }) => theme.colors.white};
  display: inline-block;
  padding: 12px 26px;
  font-weight: bold;
  opacity: 1;
  text-decoration: none;
  transition: opacity 0.25s;
  border-radius: 0.4rem;

  &:hover,
  &:focus {
    opacity: .8;
  }
`;

export default CssDefaultButton;