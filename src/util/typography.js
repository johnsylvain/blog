import Typography from 'typography';

const typography = new Typography({
  baseFontSize: '14px',
  baseLineHeight: 1.666,
  bodyFontFamily: [
    '-apple-system',
    'BlinkMacSystemFont',
    'Helvetica Neue',
    'Helvetica',
    'Arial',
    'sans-serif'
  ],
  headerFontFamily: [
    'EB Garamond',
    'Times New Roman',
    'Droid Serif',
    'Times',
    'Source Serif Pro',
    'serif'
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
  ]
});

if (process.env.NODE_ENV !== 'production') {
  typography.injectStyles();
}

export default typography;
export const rhythm = typography.rhythm;
export const scale = typography.scale;
