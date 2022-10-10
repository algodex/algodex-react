/* 
 * Algodex Frontend (algodex-react) 
 * Copyright (C) 2022 Algodex VASP (BVI) Corp.
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

import styled from '@emotion/styled'
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

export const BlogWrapper = styled.section`
  padding-top: 4rem;
  padding-bottom: 4rem;
  .btn-gray {
    padding: 0.2rem 0.6rem 0.2rem 0.6rem;
    border-radius: 0.13rem;
    background-color: ${({ theme }) => rgba(theme.palette.gray['800'], 0.1)};
    color: ${({ theme }) => theme.palette.gray['700']};
    margin-bottom: 0.6rem;
  }
  .update-container {
    margin: 1.8rem 0 1.8rem -1.8rem;
    @media (max-width: 992px) {
      margin: 0;
    }
  }
`

export const AboutTitle = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  line-height: 1.5rem;
  color: ${({ theme }) => theme.palette.gray[100]};
  margin-block: 1.7rem 0.8rem;
`
export const AboutContainer = styled.section`
  padding-inline: 4vw;
  @media (min-width: 1024px) {
    padding-inline: 6vw;
  }
`
