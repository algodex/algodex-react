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

import axios from 'axios'
import { throttle } from 'lodash'

export type Severity = 'Error' | 'Info' | 'Debug'

export interface LogMessage {
  message: string
  severity: Severity
  unixTime: number
  environment: string
  href: string
}

export const logError = async (message: string) => {
  // logRemote('Error', message)
  console.error(message)
}
export const logInfo = async (message: string) => {
  // logRemote('Info', message)
  console.info(message)
}
export const logDebug = async (message: string) => {
  // logRemote('Debug', message)
  console.debug(message)
}

const _message = throttle((message) => logInfo(message), 50)

export const throttleLog = (message) => {
  return _message(message)
}

const logRemote = async (severity: Severity, message: string) => {
  const body = {
    severity,
    message,
    environment: process.env.NEXT_PUBLIC_ENV,
    href: window.location.href,
    unixTime: Date.now()
  }

  axios.post('/api/v2/debug/log/post', body)
}
