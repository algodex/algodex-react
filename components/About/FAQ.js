import React from 'react'
import styled from '@emotion/styled'

// Styled components
import { AboutContainer, AboutTitle } from './styles.css'

// MUI Styles
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

const FAQuestions = [
  {
    q: 'What is Algodex?',
    a: 'Algodex is a decentralized marketplace for Algorand Standard Assets. Algodex uses a speedy and elegant order book model for transactions, a first of its kind in the Algorand space. This allows for a higher degree of sophistication and control of trading your assets. Algodex’s feature packed platform brings a whole new kind of trading to the Algorand ecosystem.'
  },
  {
    q: 'How does Algodex Work?',
    a: 'Algodex uses Algorand smart contracts to create an order book mechanism for Algorand Standard Assets (ASA) that allows users to transact any ASA at a price the user chooses. Users can add or fulfill orders from the order book using Algodex’s online interface. Learn more about Algodex and how it works by reading our whitepaper.'
  },
  {
    q: 'What Algorand Standard Assets can be traded on Algodex?',
    a: 'All Algorand Standard Assets can be listed on Algodex, except for scam tokens that are proven fraudulent or illegal. These measures are in place to protect users from known scams while maintaining decentralization.'
  },
  {
    q: 'How do I list my token on Algodex?',
    a: 'Newly created Algorand Standard Asset (ASA) will be available for immediate trading on Algodex. You can add liquidity to your ASA on Algodex by searching for it by the asset ID and placing a buy or sell order.'
  },
  {
    q: 'How can a project apply to be listed for trading in North America?',
    a: 'Please fill out  <a href="https://docs.google.com/forms/d/e/1FAIpQLSdJ7s73pweD83A9FP9X3zxelj4WN7jUvjNzuSCDL7wpfTmElQ/viewform" target="_blank" rel="noreferrer">this form</a> to apply to be listed on the Algodex exchange for North American trading. This form is only required for tokens that want to be listed and tradeable in North America, as the rest of the world can currently trade ASAs without restrictions.'
  },
  {
    q: 'Where can I follow Algodex and keep up with announcements?',
    a: 'You can follow Algodex on the following social media websites: <br/>',
    socialLink: true
  }
]

const BlogSection = styled.section`
  background-color: ${({ theme }) => theme.palette.gray[600]};
  overflow: hidden;
  padding-block: 1.5rem;
`

const Title = styled.p`
  color: ${({ theme }) => theme.palette.gray['000']};
`

const Body = styled.div`
  color: ${({ theme }) => theme.palette.gray['300']};
  line-height: 1.5rem;
  a {
    color: ${({ theme }) => theme.palette.green['400']};
  }
`

const List = styled.ul`
  margin-top: 0.5rem;
  color: ${({ theme }) => theme.palette.gray['300']};
  line-height: 1.5rem;
  a {
    color: ${({ theme }) => theme.palette.green['400']};
  }
`

const styles = {
  accordionStyles: {
    marginBlock: '1rem',
    border: '2px solid',
    borderColor: '#f9f9f9',
    backgroundColor: '#2F3746',
    borderRadius: '6px'
  }
}
export const FAQSection = () => {
  return (
    <BlogSection>
      <AboutContainer>
        <div className="w-4/5 lg:w-2/6 md:w-1/2 sm:w-3/5 mb-9">
          <AboutTitle className="uppercase">FAQ</AboutTitle>
          <hr />
        </div>
        <div>
          {FAQuestions.map((faq, index) => (
            <Accordion key={index} style={styles.accordionStyles}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon style={{ color: '#F9F9F9' }} />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Title>{faq.q}</Title>
              </AccordionSummary>
              <AccordionDetails style={{ paddingTop: 0 }}>
                <Body dangerouslySetInnerHTML={{ __html: faq.a }} />
                {faq.socialLink && (
                  <List>
                    <li>
                      <span className="font-bold">Twitter:</span>{' '}
                      <a
                        href="https://twitter.com/AlgodexOfficial"
                        target="_blank"
                        rel="noreferrer"
                      >
                        @AlgodexOfficial
                      </a>
                    </li>
                    <li className="flex">
                      <span className="font-bold mr-1">Telegram:</span>
                      <ul>
                        <li>
                          <a
                            href="http://t.me/AlgodexAnnouncements"
                            target="_blank"
                            rel="noreferrer"
                          >
                            t.me/AlgodexAnnouncements
                          </a>
                        </li>
                        <li>
                          <a href="http://t.me/algodex" target="_blank" rel="noreferrer">
                            t.me/algodex
                          </a>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <span className="font-bold">Reddit:</span>{' '}
                      <a href="https://www.reddit.com/r/Algodex/" target="_blank" rel="noreferrer">
                        r/Algodex
                      </a>
                    </li>
                    <li>
                      <span className="font-bold">Discord:</span>{' '}
                      <a href="https://discord.gg/qS3Q7AqwF6" target="_blank" rel="noreferrer">
                        Algodex Discussion
                      </a>
                    </li>
                  </List>
                )}
              </AccordionDetails>
            </Accordion>
          ))}
        </div>
        <div className="text-center my-9">
          <a
            href="https://about.algodex.com/docs/algodex-faq/"
            target="_blank"
            rel="noreferrer"
            className="text-white font-bold underline italic text-xl"
          >
            View More FAQs
          </a>
        </div>
      </AboutContainer>
    </BlogSection>
  )
}
