import React from "react"
import { graphql } from "gatsby"

import { Helmet } from 'react-helmet';

import { PlasmicComponent, PlasmicRootProvider } from '@plasmicapp/loader-gatsby';
import { initPlasmicLoaderWithRegistrations } from '../plasmic-init';

export default function PageTemplate({ data, params }: any) {
  const { plasmicComponents, plasmicOptions } = data;

  const articles = data.allMdx.nodes.map((node: any) => {return {
    title: node.frontmatter.title,
    path: "/articles/" + node.internal.contentFilePath.split("/articles/")[1].split("/")[0]
  }});

  return (
      <>
        <PlasmicRootProvider
            loader={initPlasmicLoaderWithRegistrations(plasmicOptions)}
            prefetchedData={plasmicComponents}
            pageParams={params}
            pageQuery={Object.fromEntries(new URLSearchParams(location.search))}
            Head={Helmet}
        >
          <PlasmicComponent
              component="Homepage"
              componentProps={{
                articles: (
                    <ul>
                      {articles.map((article: any) => (
                          <li key={article.title}>
                            <a href={article.path}>{article.title}</a>
                          </li>
                      ))}
                    </ul>
                )
              }}
          />
        </PlasmicRootProvider>
      </>
  )
}

export const query = graphql`
  query {
    plasmicComponents(componentNames: ["Homepage"])
    plasmicOptions
      allMdx {
      nodes {
        frontmatter {
          title
        }
        internal {
          contentFilePath
        }
      }
    }
  }
`