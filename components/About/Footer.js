/* eslint-disable max-len */
import React from 'react'
import useTranslation from 'next-translate/useTranslation'
import { ReactSVG } from 'react-svg'
import styled from '@emotion/styled'

//Iconify icon
import { Icon } from '@iconify/react'

// Custom Styled Components
import Button from 'components/Button'
import { AboutContainer } from './styles.css'

const FooterWrapper = styled.div`
  background-color: ${({ theme }) => theme.palette.gray[500]};
  padding-block: 3rem;
`
const InputContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  flex-wrap: wrap;
  .icon {
    color: ${({ theme }) => theme.palette.gray[700]};
    position: absolute;
    left: 0.5rem;
    top: 0.6rem;
  }
  input {
    height: 2.3rem;
    margin-right: 1rem;
    flex: 1;
    padding-left: 2rem;
    color: ${({ theme }) => theme.palette.gray[700]};
    background-color: ${({ theme }) => theme.palette.gray[300]};
    border: 1px solid;
    border-color: ${({ theme }) => theme.palette.gray[100]};
    border-radius: 0.19rem;
    transition: all ease 0.3s;
    &:focus {
      outline: none;
      border-color: ${({ theme }) => theme.palette.gray[400]};
    }
  }
`
const Title = styled.h4`
  font-size: 1.25rem;
  margin-bottom: 1rem;
  font-weight: 700;
  color: ${({ theme }) => theme.palette.gray[100]};
`
const FooterLinks = styled.a`
  font-weight: 500;
  color: ${({ theme }) => theme.palette.gray[100]};
  margin-bottom: 0.5rem;
  color: ${({ theme }) => theme.palette.gray[100]};
  cursor: pointer;
  text-decoration: none;
  display: block;
  text-transform: capitalize;
`

const FooterButton = styled(Button)`
  color: ${({ theme }) => theme.palette.gray[100]};
  border: solid 1px;
  bordercolor: ${({ theme }) => theme.palette.gray[100]};
  textdecoration: uppercase;
  background-color: ${({ theme }) => theme.palette.gray[600]};
`
const InlineLogo = styled(ReactSVG)`
  height: auto;
  width: 15rem;
  max-width: 100%;
`

export const AboutFooter = () => {
  const { t } = useTranslation('about')
  return (
    <FooterWrapper>
      <AboutContainer>
        <div className="w-5/5 xl:2/5 lg:w-1/2 md:w-1/2 pt-4 mb-16">
          <p className="text-white font-medium text-xl mb-6">
            {t(
              'Stay up to date with info on Algodex updates, new features, and releases by joining our mailing list'
            )}
            .
          </p>
          <InputContainer>
            <span className="icon">
              <Icon icon="codicon:mail" />
            </span>
            <input type="email" placeholder="Email Address" />

            <FooterButton>Submit</FooterButton>
          </InputContainer>
        </div>

        <div className="pb-5 grid lg:grid-flow-col grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="col-span-2">
            <InlineLogo src="/logo-inline-dark.svg" />
            <Title className="mt-5">{t('Decentralized marketplace on Algorand')}</Title>
          </div>
          <div className="col-span-1">
            <Title>{t('RESOURCES')}</Title>
            <FooterLinks target="_blanc" href="https://about.algodex.com/disclaimers/">
              {t('disclaimers')}
            </FooterLinks>

            <FooterLinks target="_blanc" href="https://about.algodex.com/docs/">
              {t('docs')}
            </FooterLinks>
            <FooterLinks target="_blanc" href="https://github.com/algodex/algodex-mailbox">
              Github
            </FooterLinks>
            <FooterLinks target="_blanc" href="https://about.algodex.com/support/">
              {t('support')}
            </FooterLinks>

            <FooterLinks
              target="_blanc"
              href="https://github.com/algodex/algodex-public-documents/blob/master/Algodex%20Whitepaper%201.0.pdf"
            >
              {t('white paper')}
            </FooterLinks>
            <FooterLinks
              target="_blanc"
              href="https://github.com/algodex/algodex-public-documents/blob/master/Algodex%20Tokenomics.pdf"
            >
              {t('tokenomics')}
            </FooterLinks>
          </div>
          <div className="col-span-1">
            <Title>{t('COMPANY')}</Title>
            <FooterLinks target={'_blank'} href="https://about.algodex.com/">
              {t('about')}
            </FooterLinks>
            <FooterLinks target={'_blank'} href="https://about.algodex.com/blog/">
              {t('blog')}
            </FooterLinks>
          </div>
          <div className="col-span-1">
            <Title>{t('COMMUNITY')}</Title>

            <FooterLinks
              target={'_blank'}
              href="https://twitter.com/AlgodexOfficial?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor"
            >
              Twitter
            </FooterLinks>
            <FooterLinks target={'_blank'} href="https://discord.gg/qS3Q7AqwF6">
              Discord
            </FooterLinks>
            <FooterLinks target={'_blank'} href="https://www.reddit.com/r/algodex">
              Reddit
            </FooterLinks>
            <FooterLinks target={'_blank'} href="https://t.me/algodex">
              Telegram
            </FooterLinks>
          </div>
        </div>
      </AboutContainer>
    </FooterWrapper>
  )
}
