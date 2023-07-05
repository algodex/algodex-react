import React from 'react'
import Link from 'next/link'
import styled from '@emotion/styled'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

const AnchorContainer = styled.a`
  align-items: center;
  color: #acbcd3;
  display: flex;
  font-family: Inter;
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0em;
  line-height: 17px;
  margin-left: 22px;
  margin-top: 12px;

  svg {
    margin-right: 9px;
  }

  @media (min-width: 1024px) {
    margin-left: 83px;
  }
`
function BackNavigation() {
  return (
    <>
      <Link href="/vote">
        <AnchorContainer>
          <ArrowBackIcon />
          Back to Voting Homepage
        </AnchorContainer>
      </Link>
    </>
  )
}

export default BackNavigation
