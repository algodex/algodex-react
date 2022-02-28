import '@testing-library/jest-dom/extend-expect'
import { loadEnvConfig } from '@next/env'
import { matchers } from '@emotion/jest'
expect.extend(matchers)
export default async () => {
  const projectDir = process.cwd()
  loadEnvConfig(projectDir)
}
