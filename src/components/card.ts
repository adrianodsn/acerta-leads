import styled from "styled-components";

const Card = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 0.25rem;
  margin: 1.5rem auto;
  position: relative;
  padding: 2rem;

  label {
    color: ${({ theme }) => theme.colors.black};
    display: block;
    margin-bottom: 3px;
  }
`;

export default Card;