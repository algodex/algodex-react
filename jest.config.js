const config = {
  coverageProvider: 'v8',
  setupFilesAfterEnv: ['./jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  collectCoverage: true,
  coverageThreshold: {
    //TODO: Raise confidence
    global: {
      branches: 45
    }
  },
  collectCoverageFrom: [
    '**/components/**/*.{js,jsx}',
    // '**/hooks/**/*.{js,jsx}',
    // '**/utils/**/*.{js,jsx}',
    // '**/services/**/*.{js,jsx}',
    '!**/components/**/index.{js,jsx}',
    '!**/components/Input/**/*.{js,jsx}',
    '!**/components/Pages/**/*.{js,jsx}',
    '!**/components/**/*.stories.{js,jsx}',
    '!**/components/**/*demo.{js,jsx}',
    '!**/components/**/*spec.{js,jsx}'
  ],
  coverageReporters: ['lcov', 'text', 'json-summary'],
  moduleFileExtensions: ['js', 'jsx', 'json'],
  moduleNameMapper: {
    '^@/components(.*)$': '<rootDir>/components$1',
    '^@/lib(.*)$': '<rootDir>/lib$1',
    '^@/hooks(.*)$': '<rootDir>/hooks$1',
    '^@/services(.*)$': '<rootDir>/services$1',
    '^@/store(.*)$': '<rootDir>/store$1',
    '^@/utils(.*)$': '<rootDir>/utils$1',
    '^@/test(.*)$': '<rootDir>/test$1',
    '^i18n.json$': '<rootDir>/i18n.json',
    '^theme(.*)$': '<rootDir>/theme$1'
  }
}
module.exports = config
