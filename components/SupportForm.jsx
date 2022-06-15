import React from 'react'
import styled from '@emotion/styled'

const SupportWrapper = styled.section`
  margin-top: 18vh;
  text-align: center;
  font-size: 1.3rem;
  a {
    color: ${({ theme }) => theme.palette.green[400]};
    font-weight: 500;
  }
`
export const SupportForm = () => {
  return (
    <SupportWrapper>
      Kindly leave a message for our support at{' '}
      <a href="mailTo:support@algodex.com">support@algodex.com </a>
    </SupportWrapper>
  )
}
