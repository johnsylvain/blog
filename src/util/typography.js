import Typography from 'typography';

const typography = new Typography({
  baseFontSize: '16px',
  baseLineHeight: 1.666,
  bodyFontFamily: [
    'Avenir Next',
    '-apple-system',
    'BlinkMacSystemFont',
    'Helvetica Neue',
    'Helvetica',
    'Arial',
    'sans-serif'
  ],
  headerFontFamily: [
    'EB Garamond',
    'Avenir Next',
    '-apple-system',
    'BlinkMacSystemFont',
    'Helvetica Neue',
    'Helvetica',
    'Arial',
    'sans-serif'
  ],
  googleFonts: [
    {
      name: 'EB Garamond',
      styles: ['400i']
    },
    {
      name: 'Source Code Pro',
      styles: ['400', '500', '700']
    }
  ],
  overrideStyles: () => ({
    'h1, h2': {
      textAlign: 'center',
      margin: '3rem 0 2rem',
      fontWeight: 400
    },
    h2: {
      fontSize: '1.62rem'
    },
    'h2::before, h2::after': {
      content: '""',
      display: 'inline-block',
      verticalAlign: 'middle',
      width: '46px',
      height: '2px',
      background: '#f4f4f7',
      margin: '0 20px'
    }
  })
});

if (process.env.NODE_ENV !== 'production') {
  typography.injectStyles();
}

export default typography;
export const rhythm = typography.rhythm;
export const scale = typography.scale;
