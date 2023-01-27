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

/* eslint-disable max-len */
import React, { useState } from 'react'

import { AboutContainer } from './styles.css'
// Custom Styled Components
import Button from 'components/Button'
//Iconify icon
import { Icon } from '@iconify/react'
import Spinner from '../Spinner'
import styled from '@emotion/styled'
import { submitHubspotForm } from '@/services/cms'
import toast from 'react-hot-toast'
import useTranslation from 'next-translate/useTranslation'

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
    top: 0.58rem;
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
const InlineLogo = styled.img`
  height: auto;
  width: 15rem;
  max-width: 100%;
  margin-inline: auto;
`

const FooterCopyright = styled.div`
  display: flex;
  justify-content: center;
  column-gap: 8px;
  align-items: center;
  color: ${({ theme }) => theme.palette.gray[100]};
  font-size: 35px;
  p, a {
    font-weight: 600;
    font-size: 18px;
    margin:0;
  }
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
    const formId = process.env.NEXT_PUBLIC_SUBSCRIBER_FORM_ID
    if (email) {
      setLoading(true)
      const res = await submitHubspotForm({ payload, formId })
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
              <Icon icon="mi:email" fontSize={'1.05rem'} />
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
          <div className="col-span-2 pr-9 text-center">
            <InlineLogo src="/logo-inline-dark.svg" />
            <Title className="mt-5 border-0">{t('A Decentralized marketplace on Algorand')}</Title>
            <hr className="my-9 opacity-40" />
            <InlineLogo src="/Softech-Logo.svg" />
          </div>
          <div className="col-span-1">
            <Title className="mb-6">{t('RESOURCES')}</Title>
            <FooterLinks target="_blank" href="https://about.algodex.com/disclaimers/">
              {t('disclaimers')}
            </FooterLinks>

            <FooterLinks target="_blank" href="https://docs.algodex.com/">
              {t('docs')}
            </FooterLinks>
            <FooterLinks target="_blank" href="https://github.com/algodex/">
              Github
            </FooterLinks>
            <FooterLinks target="_blank" href="/support" matches={/^\/support/}>
              {t('support')}
            </FooterLinks>

            <FooterLinks
              target="_blank"
              href="https://github.com/algodex/algodex-public-documents/blob/master/Algodex%20Whitepaper%201.0.pdf"
            >
              {t('white paper')}
            </FooterLinks>
            <FooterLinks
              target="_blank"
              href="https://github.com/algodex/algodex-public-documents/blob/master/Algodex%20Tokenomics.pdf"
            >
              {t('tokenomics')}
            </FooterLinks>
            <FooterLinks
              target="_blank"
              href="https://docs.google.com/forms/d/e/1FAIpQLSdJ7s73pweD83A9FP9X3zxelj4WN7jUvjNzuSCDL7wpfTmElQ/viewform"
              className="leading-5"
            >
              Apply for North American Listing
            </FooterLinks>
          </div>
          <div className="col-span-1">
            <Title className="mb-6">{t('COMPANY')}</Title>
            <FooterLinks target={'_blank'} href="/about">
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
        <FooterCopyright className='mt-9'>
          <p>© 2023 Algonaut Capital</p>|
          <FooterLinks target={'_blank'} href="https://app.algodex.com/algodex_tos.pdf">Terms of Service</FooterLinks>
        </FooterCopyright>
      </AboutContainer>
    </FooterWrapper>
  )
}
