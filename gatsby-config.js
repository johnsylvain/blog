module.exports = {
  siteMetadata: {
    title: 'John Sylvain'
  },
  plugins: [
    'gatsby-plugin-styled-components',
    'gatsby-plugin-react-helmet',
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-external-links',
            options: {
              target: '_blank'
            }
          },
          {
            resolve: 'gatsby-remark-prismjs',
            options: {
              inlineCodeMarker: '÷'
            }
          }
        ]
      }
    },

    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pages`,
        path: `${__dirname}/src/pages`
      }
    },
    {
      resolve: 'gatsby-plugin-typography',
      options: {
        pathToConfigModule: 'src/util/typography'
      }
    },
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        trackingIds: ['G-2WM0K1JXEH']
      }
    },
    {
      resolve: `gatsby-plugin-umami`,
      options: {
        websiteId: '41f7749c-dda4-405a-9550-01cfb7f4ed9a',
        srcUrl: 'https://umami.sylvain.win/umami.js',
        includeInDevelopment: false,
        autoTrack: true,
        respectDoNotTrack: false
      }
    }
  ]
};
