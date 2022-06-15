import Head from 'next/head'
import Header from 'components/Nav/Header'
import { Hero } from '@/components/About/Hero'
import { AboutFooter } from '@/components/About/Footer'
import { PartnerShip } from '@/components/About/PartnerShip'
import { Features } from '@/components/About/Features'
import { RoadMap } from '@/components/About/RoadMap'
import BlogPreview from '@/components/About/blog'
import { fetchBlogPosts } from '@/services/algodex'
import PropTypes from 'prop-types'
import { FAQSection } from '@/components/About/FAQ'

/**
 * About Page
 *
 * @returns {JSX.Element}
 * @constructor
 */
const AboutPage = ({ staticBlogPosts }) => {
  return (
    <>
      <Head>
        <title>About</title>
      </Head>
      <Header />
      <Hero />
      <Features />
      <RoadMap />
      <PartnerShip />
      <BlogPreview staticBlogPosts={staticBlogPosts} />
      <FAQSection />
      <AboutFooter />
    </>
  )
}
export async function getStaticProps() {
  let staticBlogPosts = []
  try {
    staticBlogPosts = await fetchBlogPosts()
  } catch (error) {
    console.debug(error)
    staticBlogPosts = []
  }

  return {
    props: { staticBlogPosts }
  }
}

AboutPage.propTypes = {
  staticBlogPosts: PropTypes.array
}

export default AboutPage
