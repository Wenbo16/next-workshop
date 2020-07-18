import Head from 'next/head'
import Date from '../../components/date'
import Layout from '../../components/layout'
import { getAllPostIds, getPostData } from '../../lib/posts'
import utilStyles from '../../styles/utils.module.css'

export default function Post({ postData }) {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
  )
}

// Returns an array that looks like this:
// [
//   { params: { id: 'ssg-ssr' }},
//   { params: { id: 'pre-rendering' }}
// ]
// Then Next.js will statically generate posts/1 and posts/2 
// If the page name is pages/posts/[postId]/[commentId], then params should contain postId and commentId.

// In this function, we need to return a list of possible values for id.
export async function getStaticPaths() {
    const paths = getAllPostIds()
    // The array of possible values for id must be the value of the paths key of the returned object
    return {
        paths,
        // If fallback is false, then any paths not returned by getStaticPaths will result in a 404 page.
        fallback: false
    }
}

// if the page name is [id].js , then params will look like { id: ... }. 
export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id)
  return {
    props: {
      postData
    }
  }
}