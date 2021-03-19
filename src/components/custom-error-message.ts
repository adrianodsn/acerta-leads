import styled from "styled-components";
import { ErrorMessage } from 'formik';

const CustomErrorMessage = styled(ErrorMessage)`
  color: ${({ theme }) => theme.colors.red};
  font-size: 0.8em;
  margin-top: 3px;
`;

export default CustomErrorMessage;