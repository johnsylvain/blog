import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    will-change: background color;
    transition: background 300ms ease-in-out, color 300ms ease-in-out;
    background: white;
    color: #555;

    *:not(pre) > code[class*="language-"],
    .gatsby-highlight {
      transition: color 300ms ease-in-out, background 300ms ease-in-out;
    }

    pre[class*="language-"] {
      padding: 1em;
      margin: .5em 0;
      overflow: auto;
    }
  }

  body.dark-mode {
    -webkit-font-smoothing: antialiased;
    background: #2c2c2c;
    color: white;

    *:not(pre) > code[class*="language-"] {
      background-color: #404040;
    }

    code[class*="language-"],
    pre[class*="language-"],
    .token.punctuation {
      color: white;
    }

    .token.attr-value,
    .token.keyword,
    .token.control,
    .token.directive,
    .token.unit {
      color: hsl(286, 60%, 67%);
    }

    .token.operator,
    .token.boolean,
    .token.number {
      color:  hsl(29, 54%, 61%);
    }

    .token.string {
      color: hsl(95, 38%, 62%);
    }

    .gatsby-highlight {
      background: #252525;
    }
  }
`;

export default GlobalStyle;
