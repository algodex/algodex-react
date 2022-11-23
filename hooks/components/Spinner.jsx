/*
 * Algodex Hooks
 * Copyright (C) 2021-2022 Algodex VASP (BVI) Corp.
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

import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import {keyframes} from '@emotion/react';

const rotate = keyframes`
  100% {
    transform: rotate(360deg);
  }
`;

const dash = keyframes`
  0% {
    stroke-dasharray: 1, 150;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -35;
  }
  100% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -124;
  }
`;

/**
 * @todo Move to components/Layout.jsx
 * @type {StyledComponent}
 */
const FlexContainer = styled.div`
  flex: 1 1 0%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

/**
 * Spinner SVG
 * @return {StyledComponent}
 */
const Svg = styled.svg`
  animation: ${rotate} 2s linear infinite;
  width: ${({size}) => `${size}rem`};
  height: ${({size}) => `${size}rem`};
  opacity: 0.75;
  will-change: transform;

  circle {
    stroke: gray;
    stroke-width: 4;
    stroke-linecap: round;
    fill: none;
    animation: ${dash} 1300ms ease-in-out infinite;
    will-change: stroke-dasharray, stroke-dashoffset;
  }
`;
Svg.defaultProps = {
  viewBox: '0 0 50 50',
};
/**
 * Loading Spinner
 *
 * Used to show a loading screen for asynchronous operations
 *
 * @param {object} props Component Properties
 * @param {number} props.size SVG Size
 * @param {string} props.color SVG Color
 * @param {boolean} props.flex Enable Flex
 * @return {JSX.Element}
 *
 * @todo Refactor to Tailwinds class="spinner"
 * @constructor
 */
export function Spinner({size, color, flex, ...rest}) {
  if (flex) {
    return (
      <FlexContainer data-testid="spinner-flex-container">
        <Svg size={size} color={color} {...rest} data-testid="spinner-svg">
          <circle cx="25" cy="25" r="20" />
        </Svg>
      </FlexContainer>
    );
  } else {
    return (
      <Svg size={size} color={color} {...rest} data-testid="spinner-svg">
        <circle cx="25" cy="25" r="20" />
      </Svg>
    );
  }
}

Spinner.propTypes = {
  size: PropTypes.number,
  color: PropTypes.string,
  flex: PropTypes.bool,
};

Spinner.defaultProps = {
  size: 5,
  color: 'gray.800',
  flex: true,
};

export default Spinner;
