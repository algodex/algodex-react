import Head from 'next/head'
import Header from 'components/header'
import { AboutBanner } from 'components/about-assets/banner'
import { BlogPreview } from 'components/about-assets/blog'
import { AboutHowItWorks } from 'components/about-assets/how-it-works'
import { AboutFAQ } from 'components/about-assets/faq'
import { Footer } from 'components/footer'
import { SocialsFloat } from 'components/socials-float'

const AboutPage = () => {
  return (
    <>
      <Head>
        <title>About</title>
      </Head>
      <Header />
      <AboutBanner />
      <AboutHowItWorks />
      <AboutFAQ />
      <BlogPreview />
      <Footer />
      <SocialsFloat />
    </>
  )
}
export default AboutPage
