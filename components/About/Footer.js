/* eslint-disable max-len */
import React, { useState } from 'react'
import useTranslation from 'next-translate/useTranslation'
import { ReactSVG } from 'react-svg'
import styled from '@emotion/styled'
import toast from 'react-hot-toast'

//Iconify icon
import { Icon } from '@iconify/react'

// Custom Styled Components
import Button from 'components/Button'
import { AboutContainer } from './styles.css'
import { addSubscriber } from '@/services/algodex'
import Spinner from '../Spinner'

const FooterWrapper = styled.div`
  background-color: ${({ theme }) => theme.palette.gray[500]};
  padding-block: 3rem;
`
const Form = styled.form`
  display: flex;
  align-items: center;
  position: relative;
  flex-wrap: wrap;
  .icon {
    color: ${({ theme }) => theme.palette.gray[600]};
    position: absolute;
    left: 0.5rem;
    top: 0.68rem;
    font-size: 1rem;
  }
  input {
    height: 2.3rem;
    margin-right: 1rem;
    flex: 1;
    padding-left: 1.8rem;
    color: ${({ theme }) => theme.palette.gray[700]};
    background-color: ${({ theme }) => theme.palette.gray[300]};
    border: 2px solid;
    border-color: ${({ theme }) => theme.palette.gray[600]};
    border-radius: 0.19rem;
    transition: all ease 0.3s;
    font-size: 1rem;
    &:focus {
      outline: none;
      border-color: ${({ theme }) => theme.palette.gray[400]};
    }
    &::placeholder {
      color: ${({ theme }) => theme.palette.gray[600]};
      font-size: 1rem;
      font-weight: bold;
      font-style: italic;
    }
  }
`
const Title = styled.h4`
  font-size: 1.25rem;
  margin-bottom: 1rem;
  font-weight: 700;
  color: ${({ theme }) => theme.palette.gray[100]};
  border-bottom: 0.4px solid;
  border-color: ${({ theme }) => theme.palette.gray[100]};
  line-height: 30px;
`
const FooterLinks = styled.a`
  font-weight: 500;
  color: ${({ theme }) => theme.palette.gray[100]};
  margin-bottom: 1.1rem;
  cursor: pointer;
  text-decoration: none;
  display: block;
  text-transform: capitalize;
`

const FooterButton = styled(Button)`
  color: ${({ theme }) => theme.palette.gray[100]};
  border: solid 1px;
  border-color: ${({ theme }) => theme.palette.gray[100]};
  text-decoration: uppercase;
  background-color: ${({ theme }) => theme.palette.gray[600]};
`
const InlineLogo = styled(ReactSVG)`
  height: auto;
  width: 15rem;
  max-width: 100%;
`

export const AboutFooter = () => {
  const { t } = useTranslation('about')
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const payload = {
      fields: [
        {
          objectTypeId: '0-1',
          name: 'email',
          value: email
        }
      ]
    }

    if (email) {
      setLoading(true)
      const res = await addSubscriber(payload)
      setLoading(false)
      if (res instanceof Error) {
        const error =
          res.response?.data?.errors[0].errorType == 'INVALID_EMAIL'
            ? 'Invalid Email Address'
            : 'Sorry, an error occurred'
        toast.error(error)
      } else {
        toast.success(res.inlineMessage)
        setEmail('')
      }
    }
  }
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
          <Form onSubmit={handleSubmit}>
            <span className="icon">
              <Icon icon="mi:email" />
            </span>
            <input
              type="email"
              placeholder="Email Address"
              name="email"
              value={email}
              onChange={({ target: { value } }) => {
                setEmail(value)
              }}
            />

            <FooterButton type="submit" disabled={loading} className="text-center">
              Submit
              {loading && (
                <span className="ml-2">
                  <Spinner size={1} color={'white'} />
                </span>
              )}
            </FooterButton>
          </Form>
        </div>

        <div className="pb-5 grid lg:grid-flow-col grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="col-span-2">
            <InlineLogo src="/logo-inline-dark.svg" />
            <Title className="mt-5 border-0">{t('Decentralized marketplace on Algorand')}</Title>
          </div>
          <div className="col-span-1">
            <Title className="mb-6">{t('RESOURCES')}</Title>
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
            <Title className="mb-6">{t('COMPANY')}</Title>
            <FooterLinks target={'_blank'} href="https://about.algodex.com/">
              {t('about')}
            </FooterLinks>
            <FooterLinks target={'_blank'} href="https://about.algodex.com/blog/">
              {t('blog')}
            </FooterLinks>
          </div>
          <div className="col-span-1">
            <Title className="mb-6 pr-10">{t('COMMUNITY')}</Title>

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
