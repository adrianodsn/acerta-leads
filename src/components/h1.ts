import styled from "styled-components";

const H1 = styled.h1`
  color: ${({ theme }) => theme.colors.white};
  font-weight: 400;
  margin-bottom: 24px;
  text-align: center;

  @media(min-width: 576px) {
    & {
      text-align: left;
    }
  }
`;

export default H1;