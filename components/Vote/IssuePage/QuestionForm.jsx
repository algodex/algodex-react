import React, { useContext, useState } from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import Button from '@mui/material/Button'
import useTranslation from 'next-translate/useTranslation'
import { WalletReducerContext } from '@/hooks/WalletsReducerProvider.js'

const Container = styled.div`
  border-radius: 8px;
  border: 1px solid white;
  color: white;
  font-family: 'Roboto', sans-serif;
  margin: auto;
  margin-top: 16px;
  padding-left: 18px;
  padding-right: 18px;
  text-align: center;
  width: 94%;

  @media (min-width: 1024px) {
    margin: inherit;
    margin-left: 66px;
    padding-left: 67px;
    padding-right: 67px;
    width: 88%;
  }
`
const FormControlStyled = styled(FormControl)`
  display: flex;
  height: 236px;
  width: 100%;
`
const QuestionNumber = styled.p`
  font-size: 16px;
  font-weight: 500;
  margin: 0;
  margin-top: 16px;
  text-align: left;

  @media (min-width: 1024px) {
    font-family: Roboto;
    font-size: 16px;
    font-weight: 500;
    margin-top: 16px;
  }
`
const QuestionTitle = styled.h3`
  font-size: 20px;
  font-weight: 500;
  margin-bottom: 0px;
  margin-top: 4px;
  text-align: left;

  @media (min-width: 1024px) {
    font-size: 24px;
    margin-top: 20px;
  }
`
const QuestionDescription = styled.p`
  font-size: 14px;
  font-weight: 500;
  line-height: 17px;
  margin-bottom: 24px;
  margin-top: 12px;
  text-align: left;
`
const FormControlLabelStyled = styled(FormControlLabel)`
  margin: auto 0px;
  margin-bottom: 22px;

  .MuiRadio-colorPrimary {
    color: #718096;
  }
  .Mui-checked {
    color: white !important;
  }

  .MuiTypography-root {
    font-size: 14px;
    font-weight: 500;
    text-align: left;
  }

  @media (min-width: 1024px) {
    .MuiTypography-root {
      font-size: 18px;
      font-weight: 500;
      padding-left: 33px;
    }
  }
`
const VoteButton = styled(Button)`
  background-color: #38a169;
  border-radius: 4px;
  color: white;
  font-size: 13px;
  font-weight: 500;
  height: 30px;
  line-height: 22px;
  margin-bottom: 18px;
  margin-top: 22px;
  text-align: center;
  text-transform: uppercase;
  width: 108px;

  :hover {
    background-color: #38a169;
  }

  @media (min-width: 1024px) {
    font-size: 16px;
    font-weight: 500;
    height: 42px;
    line-height: 26px;
    margin-bottom: 40px;
    width: 151px;
  }
`
const DisabledVoteButton = styled(Button)`
  background-color: rgba(255, 255, 255, 0.12);
  border-radius: 4px;
  color: rgba(255, 255, 255, 0.3);
  font-size: 13px;
  font-weight: 500;
  height: 30px;
  line-height: 22px;
  margin-bottom: 18px;
  margin-top: 22px;
  text-align: center;
  text-transform: uppercase;
  width: 108px;
  cursor: default;
  :hover {
    background-color: rgba(255, 255, 255, 0.12);
  }

  @media (min-width: 1024px) {
    font-size: 16px;
    font-weight: 500;
    height: 42px;
    line-height: 26px;
    margin-bottom: 40px;
    width: 151px;
  }
`
function QuestionForm({ vote, voted, assetBalance, active, optInAndSubmitVote }) {
  const { t } = useTranslation('vote')
  const { activeWallet } = useContext(WalletReducerContext)
  const { question, appId } = vote[0]
  const [userOption, setUserOption] = useState(null)

  return (
    <>
      <Container>
        <QuestionNumber>{t('Question')} #1</QuestionNumber>
        <QuestionTitle>{question.title}</QuestionTitle>
        <QuestionDescription>{question.description}</QuestionDescription>
        <form action="">
          <FormControlStyled>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="female"
              name="radio-buttons-group"
            >
              {question.options &&
                question.options.map((option, i) => (
                  <FormControlLabelStyled
                    value={option}
                    control={<Radio />}
                    label={option}
                    key={i}
                    onClick={() => setUserOption(`option_${i + 1}`)}
                  />
                ))}
            </RadioGroup>
          </FormControlStyled>
        </form>
        {userOption !== null && assetBalance !== null && voted === false && active === true ? (
          <VoteButton onClick={() => optInAndSubmitVote(appId, activeWallet.address, userOption)}>
            {t('Submit Vote')}
          </VoteButton>
        ) : (
          <DisabledVoteButton>{t('Submit Vote')}</DisabledVoteButton>
        )}
      </Container>
    </>
  )
}
QuestionForm.propTypes = {
  vote: PropTypes.array,
  question: PropTypes.object,
  title: PropTypes.string,
  description: PropTypes.string,
  options: PropTypes.array,
  voteSubmit: PropTypes.func,
  optInAndSubmitVote: PropTypes.func,
  voted: PropTypes.bool,
  assetBalance: PropTypes.number,
  active: PropTypes.bool
}
export default QuestionForm
