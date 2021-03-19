import styled from "styled-components";
import { Link } from 'react-router-dom';

import CssDefaultButton from './css-default-button'

export const LinkButton = styled(Link)`
  ${() => (CssDefaultButton)}
`;

export const LinkButtonSecondary = styled(Link)`
  ${() => (CssDefaultButton)}
  background-color: ${({ theme }) => theme.colors.gray};
  border: 1px solid ${({ theme }) => theme.colors.gray};
`;
