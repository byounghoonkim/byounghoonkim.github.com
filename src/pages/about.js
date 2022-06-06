import * as React from "react"
import Layout from "../components/layout"
import Seo from "../components/seo"
import { graphql } from "gatsby"

export default function About({ location, data }) {
  const siteTitle = data.site.siteMetadata?.title
  const about = data.allMarkdownRemark.nodes[0]

  return (
    <Layout location={location} title={siteTitle}>
      <Seo title="All posts" />
      <article>
        <h2>{about.title}</h2>
        <section
          dangerouslySetInnerHTML={{ __html: about.html }}
          itemProp="articleBody"
        />
      </article>
    </Layout>
  )
}

export const aboutQuery = graphql`
  query AboutQuery {
    site {
      siteMetadata {
        title
      }
    }

    allMarkdownRemark(
      filter: { fields: {}, fileAbsolutePath: { regex: "/content/about/" } }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      nodes {
        excerpt
        fields {
          slug
        }
        html
        frontmatter {
          date(formatString: "YYYY-MM-DD")
          title
          description
        }
      }
    }
  }
`
