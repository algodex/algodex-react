import React from 'react'
import styled from '@emotion/styled'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import Button from '@mui/material/Button'
import useTranslation from 'next-translate/useTranslation'

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
function QuestionForm({ vote }) {
  const { t } = useTranslation('vote')
  const { question } = vote[0]

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
                question.options.map((option) => (
                  <FormControlLabelStyled value={option} control={<Radio />} label={option} />
                ))}
            </RadioGroup>
          </FormControlStyled>
        </form>
        <VoteButton>{t('Submit Vote')}</VoteButton>
      </Container>
    </>
  )
}

export default QuestionForm
