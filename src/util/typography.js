import Typography from 'typography';

const fontStack = [
  'Avenir Next',
  'Avenir',
  '-apple-system',
  'BlinkMacSystemFont',
  'Helvetica Neue',
  'Helvetica',
  'Arial',
  'sans-serif'
];

const typography = new Typography({
  baseFontSize: '16px',
  baseLineHeight: 1.666,
  bodyFontFamily: fontStack,
  headerFontFamily: ['EB Garamond', ...fontStack],
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
    '*': {
      textRendering: 'optimizeLegibility',
      '-webkit-font-smoothing': 'antialiased'
    },
    '.blogpost a': {
      background: 'linear-gradient(to bottom, #54a0ff55 0%, #54a0ff55 100%)',
      backgroundPosition: '0 100%',
      backgroundRepeat: 'repeat-x',
      backgroundSize: '2px 2px',
      textDecoration: 'none',
      transition: 'background-size .2s',
      color: 'inherit'
    },
    '.blogpost a:hover': {
      backgroundSize: '2px 50px'
    },
    'h1, h2': {
      textAlign: 'center',
      margin: '3rem 0 1.5rem',
      fontWeight: 400
    },
    h1: {
      fontSize: '2.3rem'
    },
    h2: {
      fontSize: '1.62rem'
    }
  })
});

if (process.env.NODE_ENV !== 'production') {
  typography.injectStyles();
}

export default typography;
export const rhythm = typography.rhythm;
export const scale = typography.scale;
