import React from 'react'
import styled from '@emotion/styled'
import useTranslation from 'next-translate/useTranslation'
import PropTypes from 'prop-types'

//Styled components
import { AboutContainer, AboutTitle } from './styles.css'
import Button from 'components/Button'
import moment from 'moment'

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

const Post = ({ title, date, content }) => {
  return (
    <Blog className="lg:flex mb-12">
      <div className="blog-img lg:w-2/5 lg:mr-10 mb-8 lg:mb-0">
        <img
          src={'/Algodex_Skyline_draft_02-1-e1641253822183-768x346 1.png'}
          width={400}
          height={180}
          alt="blog post"
        />
      </div>
      <div className="content-wrapper lg:w-3/5">
        <h3 className="mb-3">{title}</h3>
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
  content: PropTypes.string
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
            />
          ))}
        </div>
        <div className="text-center my-9">
          <a href="https://about.algodex.com/blog/" target="_blank" rel="noreferrer">
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
