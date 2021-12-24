import Head from 'next/head'
import Header from 'components/header'
import { AboutBanner } from 'components/about-assets/banner'
import { AboutBlog } from 'components/about-assets/blog'
import { AboutHowItWorks } from 'components/about-assets/how-it-works'
import { AboutFAQ } from 'components/about-assets/faq'
import { Container } from 'components/about-assets/styles.css'
import { Footer } from 'components/footer'
import { SocialsFloat } from 'components/socials-float'

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
      <Container className="container mx-auto">
        <AboutBanner />
      </Container>
      <AboutHowItWorks />
      <AboutFAQ />
      <Container className="container mx-auto">
        <AboutBlog />
      </Container>
      <Footer />
      <SocialsFloat />
    </>
  )
}
export default AboutPage
