import path from "path";
import type {GatsbyConfig} from "gatsby"

const config: GatsbyConfig = {
  siteMetadata: {
    siteUrl: `https://www.yourdomain.tld`,
  },
  // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
  // If you use VSCode you can also use the GraphQL plugin
  // Learn more at: https://gatsby.dev/graphql-typegen
  graphqlTypegen: true,
  plugins: [
    {
      resolve: "@plasmicapp/loader-gatsby",
      options: {
        projects: [
          {
            id: "bQTgLNc8JSRnJTBJZSDoCA",
            token: "J8YkaiXKqVRGlyZeccUe97dOjYXQuXU6rfarKf8BMoWSsDbwQX7lSIjBACfWJggBq81PZCyrMKnApQBgg",
          },
        ], // An array of project ids.
        preview: true,
        defaultPlasmicPage: path.resolve("./src/templates/defaultPlasmicPage.tsx"),
      },
    },
    `gatsby-plugin-mdx`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pages`,
        path: `${__dirname}/src/content/articles`,
      },
    },
    {
      resolve: `gatsby-plugin-page-creator`,
      options: {
        path: `${__dirname}/src/content/articles`,
      },
    },
    {
      resolve: "gatsby-plugin-react-helmet",
    }
  ]
}

export default config
