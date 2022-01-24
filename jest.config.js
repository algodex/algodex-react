module.exports = {
  setupFilesAfterEnv: ['./jest.setup.js'],
  moduleDirectories: ['node_modules', '<rootDir>'],
  testEnvironment: 'jsdom',
  collectCoverage: true,
  coverageThreshold: {
    //TODO: Raise confidence
    global: {
      branches: 10
    }
  },
  collectCoverageFrom: [
    '**/components/**/*.{js,jsx}',
    '!**/components/**/*.stories.{js,jsx}',
    '!**/components/**/*demo.{js,jsx}',
    '!**/components/**/*spec.{js,jsx}'
  ],
  coverageReporters: ['lcov', 'text', 'json-summary', 'text'],
  moduleNameMapper: {
    '^components(.*)$': '<rootDir>/components$1',
    '^lib(.*)$': '<rootDir>/lib$1',
    '^theme(.*)$': '<rootDir>/theme$1'
  },
  transformIgnorePatterns: ['node_modules/(?!(lightweight-charts|fancy-canvas)/)']
}
