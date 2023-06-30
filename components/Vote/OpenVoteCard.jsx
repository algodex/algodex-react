import React from 'react'
import styled from '@emotion/styled'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'

const CardContainer = styled.article`
  border: 1px solid white;
  border-radius: 8px;
  height: 143px;
  width: 95%;
  margin: auto;
`

function OpenVoteCard() {
  return (
    <>
      <CardContainer>
        <div>
          <div>
            <img src={'/VoteCardCheckbox.svg'} alt="Voting Card Checbox" />
          </div>
          <h3>Title / Question for Vote</h3>
          <p>Voting ends: June 18, 2023, 14:00 GMT</p>
        </div>
        <p>
          Porta arcu amet ut nunc feugiat mauris. Consectetur nunc ullamcorper tincidunt aenean
          lobortis nulla nunc facilisis. Gravida neque orci...
        </p>
      </CardContainer>
    </>
  )
}

export default OpenVoteCard
