/* 
 * Algodex Frontend (algodex-react) 
 * Copyright (C) 2021 - 2022 Algodex VASP (BVI) Corp.
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.

 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

import { AboutFooter } from '@/components/About/Footer'
import BlogPreview from '@/components/About/blog'
import { FAQSection } from '@/components/About/FAQ'
import { Features } from '@/components/About/Features'
import Head from 'next/head'
import Header from 'components/Nav/Header'
import { Hero } from '@/components/About/Hero'
import { PartnerShip } from '@/components/About/PartnerShip'
import PropTypes from 'prop-types'
// import { RoadMap } from '@/components/About/RoadMap'
import { fetchBlogPosts } from '@/services/cms'

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
      {/* <RoadMap /> */}
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
