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

//Styled components
import { AboutContainer, AboutTitle } from './styles.css'
import React, { useState } from 'react'

import Button from 'components/Button'
import PropTypes from 'prop-types'
import { fetchBlogMedia } from '@/services/cms'
import moment from 'moment'
import styled from '@emotion/styled'
import useTranslation from 'next-translate/useTranslation'

const BlogSection = styled.section`
  background-color: ${({ theme }) => theme.palette.gray[800]};
  overflow: hidden;
  padding-block: 1.5rem;
`

const Blog = styled.section`
  background-color: ${({ theme }) => theme.palette.gray[100]};
  overflow: hidden;
  padding: 1.2rem;
  border-radius: 2px;
  .blog-img {
    position: relative;
    width: 400px;
    max-width: 100%;
    z-index: 1;
    height: 180px;
    img {
      max-width: 100%;
      object-fit: cover;
    }
    &:after {
      content: '';
      position: absolute;
      background-color: ${({ theme }) => theme.palette.gray[350]};
      width: 100%;
      height: 100%;
      top: 11px;
      bottom: 0;
      left: 11px;
      z-index: -1;
    }
  }
  h3 {
    font-size: 1.35rem;
    font-weight: 700;
    color: black;
  }
  p {
    color: black;
    font-size: 1rem;
    font-weight: 500;
  }
  .date {
    font-weight: 700;
    color: ${({ theme }) => theme.palette.gray[350]};
  }
`
const MoreButton = styled(Button)`
  color: ${({ theme }) => theme.palette.gray[100]};
  border: solid 1px;
  bordercolor: ${({ theme }) => theme.palette.gray[100]};
  textdecoration: uppercase;
  background-color: transparent;
`

const Post = ({ title, date, content, featured_media }) => {
  const defaultImg = '/Algodex_Skyline_draft_02-1-e1641253822183-768x346 1.png'
  const [imgLink, setImgLink] = useState('')

  const getImageLink = async () => {
    if (featured_media !== 0) {
      try {
        const res = await fetchBlogMedia(featured_media)
        setImgLink(res.source_url)
      } catch (error) {
        console.debug(error)
        setImgLink(defaultImg)
      }
    }
  }
  getImageLink()
  return (
    <Blog className="lg:flex mb-12">
      <div className="blog-img lg:w-2/5 lg:mr-10 mb-8 lg:mb-0">
        <img src={imgLink || defaultImg} width={400} height={180} alt="blog post" />
      </div>
      <div className="content-wrapper lg:w-3/5">
        <h3 className="mb-3" dangerouslySetInnerHTML={{ __html: title }} />
        <p className="date">{date}</p>
        <hr />
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </div>
    </Blog>
  )
}

Post.propTypes = {
  title: PropTypes.string,
  date: PropTypes.string,
  content: PropTypes.string,
  featured_media: PropTypes.number
}

const BlogPreview = ({ staticBlogPosts }) => {
  // console.log(staticBlogPosts)
  const { t } = useTranslation('about')

  if (staticBlogPosts.length < 1) {
    return <></>
  }

  return (
    <BlogSection>
      <AboutContainer>
        <div className="w-4/5 lg:w-2/6 md:w-1/2 sm:w-3/5 mb-9">
          <AboutTitle className="uppercase">{t('blog')}</AboutTitle>
          <hr />
        </div>
        <div>
          {staticBlogPosts.slice(0, 4).map((post) => (
            <Post
              key={post.guid.rendered}
              title={post.title.rendered}
              date={moment(post.date).format('LL')}
              content={post.excerpt.rendered}
              featured_media={post.featured_media}
            />
          ))}
        </div>
        <div className="text-center my-9">
          <a href="https://about.algodex.com/blog/" target="_blank" rel="noreferrer" className='no-underline'>
            <MoreButton>{t('View More Posts')}</MoreButton>
          </a>
        </div>
      </AboutContainer>
    </BlogSection>
  )
}

BlogPreview.propTypes = {
  staticBlogPosts: PropTypes.array
}

export default BlogPreview
