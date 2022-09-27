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
  logRemote('Error', message)
}
export const logInfo = async (message: string) => {
  logRemote('Info', message)
}
export const logDebug = async (message: string) => {
  logRemote('Debug', message)
}

export const throttleLog = (message) => {
  // const _message = throttle(() => logInfo(message), 2000)
  // return _message()
  return
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
