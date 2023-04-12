const path = require("path")

exports.createPages = async ({ graphql, actions, reporter }: any) => {
  const { createPage } = actions

  const result = await graphql(`
    query {
      allMdx {
        nodes {
          id
          internal {
            contentFilePath
          }
        }
      }
    }
  `)

  if (result.errors) {
    reporter.panicOnBuild('Error loading MDX result', result.errors)
  }

  // Create blog post pages.
  const posts = result.data.allMdx.nodes

  const articleTemplate = path.resolve(`./src/content/articles/template.tsx`)
  // you'll call `createPage` for each result
  posts.forEach((node: any) => {

    const path = "/articles/" + node.internal.contentFilePath.split("/articles/")[1].split("/")[0]
    createPage({
      // As mentioned above you could also query something else like frontmatter.title above and use a helper function
      // like slugify to create a slug
      path,
      // Provide the path to the MDX content file so webpack can pick it up and transform it into JSX
      // component: node.internal.contentFilePath,
      component: `${articleTemplate}?__contentFilePath=${node.internal.contentFilePath}`,
      // You can use the values in this context in
      // our page layout component
      context: { id: node.id },
    })
  })
}