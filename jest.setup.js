import '@testing-library/jest-dom/extend-expect'

import { loadEnvConfig } from '@next/env'
export default async () => {
  const projectDir = process.cwd()
  loadEnvConfig(projectDir)
}
