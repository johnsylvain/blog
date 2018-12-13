module.exports = {
  siteMetadata: {
    title: 'John Sylvain'
  },
  plugins: [
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
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
    }
  ]
};
