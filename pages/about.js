import { AboutFooter } from '@/components/About/Footer'
import BlogPreview from '@/components/About/blog'
import { FAQSection } from '@/components/About/FAQ'
import { Features } from '@/components/About/Features'
import Head from 'next/head'
import Header from 'components/Nav/Header'
import { Hero } from '@/components/About/Hero'
import { PartnerShip } from '@/components/About/PartnerShip'
import PropTypes from 'prop-types'
import { RoadMap } from '@/components/About/RoadMap'
import { fetchBlogPosts } from '@/services/cms'
import { useEffect } from 'react'

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
        <title>Algodex | Algorand Decentralized Exchange</title>
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
