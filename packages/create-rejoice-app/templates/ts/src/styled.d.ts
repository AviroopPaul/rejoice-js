import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    mode: "light" | "dark";
    isDark: boolean;
    colors: {
      background: string;
      surface: string;
      text: string;
      primary: string;
      border: string;
    };
    spacing: (n: number) => string;
  }
}
