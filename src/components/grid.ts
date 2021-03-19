import styled from "styled-components";

export const Col = styled.div`
  margin-bottom: 1rem;  
  padding-right: 15px;
  padding-left: 15px;
  position: relative;
  width: 100%;

  @media(min-width: 576px) {
    & {
      float: left;
      width: 50%;
    }
  }

  input, select {
    background-color: ${({ theme }) => theme.colors.white};
    border: 1px solid ${({ theme }) => theme.colors.gray};
    color: ${({ theme }) => theme.colors.black};
    display: block;
    padding: 12px;
    font-weight: bold;
    opacity: 1;
    text-decoration: none;
    transition: opacity 0.25s;
    border-radius: 0.4rem;
    width: 100%;
    font-weight: 400;
  }

  input:disabled {
    background-color: ${({ theme }) => theme.colors.lightGray};
  }
`;

export const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-right: -15px;
  margin-left: -15px;
`;

export const AlignRight = styled.div`
  text-align: center;

  @media(min-width: 576px) {
    & {
      text-align: right;
    }
  }
`;

export const AlignLeft = styled.div`
  text-align: center;

  @media(min-width: 576px) {
    & {
      text-align: left;
    }
  }
`;