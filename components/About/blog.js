import React from 'react'
import styled from '@emotion/styled'
import useTranslation from 'next-translate/useTranslation'
import Image from 'next/image'
import Link from 'next/link'

//Styled components
import { AboutContainer, AboutTitle } from './styles.css'
import Button from 'components/Button'

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
    img {
      max-width: 100%;
      object-fit: cover;
      z-index: 1;
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

const blogPost = [
  '/Algodex_Skyline_draft_02-1-e1641253822183-768x346 1.png',
  '/medicine-3298451_1920.jpeg',
  '/Algodex_Skyline_draft_02-1-e1641253822183-768x346 1.png',
  '/medicine-3298451_1920.jpeg'
]

// eslint-disable-next-line react/prop-types
const Preview = ({ img, title, date, content }) => {
  return (
    <Blog className="lg:flex mb-12">
      <div className="blog-img lg:w-2/5 lg:mr-10 mb-8 lg:mb-0">
        <Image src={img} width={400} height={180} />
      </div>
      <div className="content-wrapper lg:w-3/5">
        <h3 className="mb-3">{title}</h3>
        <p className="date">{date}</p>
        <hr />
        <p>{content}</p>
      </div>
    </Blog>
  )
}
export const BlogPreview = () => {
  const { t } = useTranslation('about')
  return (
    <BlogSection>
      <AboutContainer>
        <div className="w-4/5 lg:w-2/6 md:w-1/2 sm:w-3/5 mb-9">
          <AboutTitle className="uppercase">{t('blog')}</AboutTitle>
          <hr />
        </div>
        <div>
          {blogPost.map((link, index) => (
            <Preview
              key={index}
              img={link}
              title={'Algodex Token (ALGX) Airdrop Plan'}
              date={'March 7, 2022'}
              content={
                'Introduction: Algodex Token, symbol ALGX, is the token created by a subsidiary of Algonaut Capital Corporation, Algodex’s parent company. ALGX is not yet minted, and its token generation event will occur within the next 30 days. ALGX will be created as an Algorand Standard Asset .... Continue ....'
              }
            />
          ))}
        </div>
        <div className="text-center my-9">
          <Link href="https://about.algodex.com/blog/" target={'_blank'}>
            <MoreButton>{t('View More Posts')}</MoreButton>
          </Link>
        </div>
      </AboutContainer>
    </BlogSection>
  )
}
