import Head from 'next/head'
import Header from 'components/Nav/Header'
import { Hero } from '@/components/About/Hero'
import { AboutFooter } from '@/components/About/Footer'
import { PartnerShip } from '@/components/About/PartnerShip'
import { Features } from '@/components/About/Features'
import { RoadMap } from '@/components/About/RoadMap'
import { BlogPreview } from '@/components/About/blog'

/**
 * About Page
 *
 * @todo Bring about from Algodex
 * @returns {JSX.Element}
 * @constructor
 */
const AboutPage = () => {
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
      <BlogPreview />
      <AboutFooter />
    </>
  )
}
export default AboutPage
