/*
 * Algodex Frontend (algodex-react) 
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

import {default as Component} from './Spinner';
import React from 'react';
import styled from '@emotion/styled';
const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: #F8FAFC;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 0;
  margin: 0;
`;
export default {
  title: '@algodex/components/Spinner',
  component: Component,
  parameters: {layout: 'fullscreen'},
  argTypes: {
    color: {
      options: [
        '#EDF2F6',
        '#E2E8F0',
        '#CBD5E0',
        '#A1AEC0',
        '#4A5568',
      ],
      control: {type: 'select'},
    },
    flex: {
      options: [true, false],
      control: {type: 'radio'},
    },
    size: {
      control: {type: 'range', min: 1, max: 10},
    },
  },
  decorators: [
    (Story) => (
      <Container>
        <Story />
      </Container>
    ),
  ],
};

const Template = (args) => <Component {...args} />;

export const Spinner = Template.bind({});
Spinner.args = {
  color: 'gray.600',
  flex: true,
  size: 5,
};
