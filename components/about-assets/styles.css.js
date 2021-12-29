import styled from 'styled-components'
import { rgba } from 'polished'

export const Container = styled.div`
  position: relative;
  padding: 2rem;
  line-height: 1.8;
  font-family: 'Alliance No.1';
  font-style: normal;
  font-weight: 400;
  @media (min-width: 320px) and (max-width: 656px) {
    max-width: 100%;
  }
`
export const BannerWrapper = styled.section`
  position: relative;
  overflow: hidden;
  &:before {
    background-image: url('/bg-blob-gradient.svg');
    background-position: center right;
    background-repeat: no-repeat;
    background-size: contain;
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    opacity: 0.1;
  }
  input {
    background-color: ${({ theme }) => rgba(theme.colors.gray['000'], 0.25)};
    color: ${({ theme }) => theme.colors.gray['800']};
    font-size: 1rem;
    font-weight: 400;
    width: 100%;
    min-width: unset;
    max-width: unset;
    height: auto;
    min-height: unset;
    max-height: unset;
    display: block;
    margin: 0;
    padding: 0.6rem;
    border-width: 0;
    border-style: none;
    border-radius: 0;
    background-image: unset;
    line-height: 1.3em;
    transition: 0.2s ease;
    &:focus {
      background-color: ${({ theme }) => rgba(theme.colors.gray['000'], 0.72)};
      outline: none;
    }
  }
  h2 {
    font-size: 3rem;
    font-weight: 500;
    line-height: 1.2;
    word-break: break-all;
    color: ${({ theme }) => theme.colors.gray['000']};
  }
  button {
    font-size: 0.8rem;
    font-weight: 500;
    padding: 0.6rem;
    min-width: 6.2rem;
    margin-top: 2rem;
    color: ${({ theme }) => theme.colors.gray['800']};
    background-color: ${({ theme }) => theme.colors.gray['000']};
  }

  .tagline {
    color: ${({ theme }) => rgba(theme.colors.gray['000'], 0.64)};
  }
`

export const HowItWorksWrapper = styled.section`
  font-size: 0.8rem;
  font-weight: 500;
  padding: 0.1rem;
  min-width: 6.2rem;
  color: ${({ theme }) => theme.colors.gray['800']};
  background-color: ${({ theme }) => theme.colors.gray['000']};
  h2 {
    font-size: 3rem;
    font-weight: 500;
    line-height: 1.2;
    word-break: break-all;
    color: ${({ theme }) => theme.colors.gray['800']};
  }
  img {
    padding: 1rem 9rem 0px 0px;
  }
  .btn-outline {
    color: ${({ theme }) => theme.colors.gray['800']};
    border-radius: 0.4rem;
    background-color: #ed141400;
    border: ${({ theme }) => theme.colors.gray['800']} solid 0.12rem;
    font-size: 0.875rem;
    padding: 0.6rem 2rem;
    font-weight: bold;
  }
`

export const BlogWrapper = styled.section`
  padding-top: 4rem;
  padding-bottom: 4rem;
  .btn-gray {
    padding: 0.2rem 0.6rem 0.2rem 0.6rem;
    border-radius: 0.13rem;
    background-color: ${({ theme }) => rgba(theme.colors.gray['800'], 0.1)};
    color: ${({ theme }) => theme.colors.gray['700']};
    margin-bottom: 0.6rem;
  }
  .update-container {
    margin: 1.8rem 0 1.8rem -1.8rem;
    @media (max-width: 992px) {
      margin: 0;
    }
  }
`
export const Accordion = styled.section`
  .accordion-header {
    span {
      color: ${({ theme }) => theme.colors.red['500']};
      transition: all 0.3s ease;
      margin-right: 0.7rem;
      &.angle-down {
        transform: rotate(-90deg);
      }
    }
    h3 {
      font-size: 1rem;
      font-weight: 500;
      transition: all 0.3s ease;
    }
  }
  .accordion-content {
    margin: 0.7rem 1rem;
    transition: all 0.3s ease;
    p {
      font-size: 1rem;
      color: ${({ theme }) => theme.colors.gray[('800', 0.6)]};
    }
  }
`
