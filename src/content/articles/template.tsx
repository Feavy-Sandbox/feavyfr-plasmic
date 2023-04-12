import React from "react"
import { graphql } from "gatsby"
import { MDXProvider } from "@mdx-js/react"
import { Link } from "gatsby"

import { Helmet } from 'react-helmet';

import { PlasmicComponent, PlasmicRootProvider } from '@plasmicapp/loader-gatsby';
import { initPlasmicLoaderWithRegistrations } from '../../plasmic-init';

const shortcodes = { Link } // Provide common components here

export default function PageTemplate({ data, children, params }: any) {
  const { plasmicComponents, plasmicOptions } = data;

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
              component="Article"
              componentProps={{
                title: data.mdx.frontmatter.title,
                children: (
                    <MDXProvider components={shortcodes}>
                      {children}
                    </MDXProvider>
                )
              }}
          />
        </PlasmicRootProvider>
      </>
  )
}

export const query = graphql`
  query($id: String!) {
    plasmicComponents(componentNames: ["Article"])
    plasmicOptions
    mdx(id: { eq: $id }) {
      frontmatter {
        title
      }
    }
  }
`