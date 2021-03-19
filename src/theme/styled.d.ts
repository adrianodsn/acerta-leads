import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      black: string;
      blue: string;
      darkGrey: string;
      gray: string;
      lightGray: string;
      red: string;
      white: string;
      yellow: string;
    };
    fontFamily: string;
    fontSizes: {
        small: string;
        medium: string;
        large: string;
    };
  }
};
