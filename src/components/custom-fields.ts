import styled, { css } from "styled-components";
import { Field } from 'formik';
import InputMask from 'react-input-mask';

const CssBase = css`
  background-color: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.gray};
  color: ${({ theme }) => theme.colors.darkGrey};
  display: block;
  padding: 12px;
  font-weight: bold;
  opacity: 1;
  text-decoration: none;
  transition: opacity 0.25s;
  border-radius: 0.4rem;
  width: 100%;
  font-weight: 400;
`;

export const CustomFormikField = styled(Field)`
  ${() => (CssBase)}
`;

export const CustomInputMask = styled(InputMask)`
  ${() => (CssBase)}
`;
