module.exports = {
  globalSetup: './jest.setup.js',
  setupFilesAfterEnv: ['./jest.setup.after-env.js'],
  moduleDirectories: ['node_modules', '<rootDir>'],
  testEnvironment: 'jsdom',
  collectCoverage: true,
  coverageThreshold: {
    //TODO: Raise confidence
    global: {
      branches: 5
    }
  },
  collectCoverageFrom: [
    '**/components/**/*.{js,jsx}',
    '!**/components/**/*.stories.{js,jsx}',
    '!**/components/**/*demo.{js,jsx}'
  ],
  coverageReporters: ['json-summary', 'text', 'lcov'],
  moduleNameMapper: {
    '^components(.*)$': '<rootDir>/components$1',
    '^lib(.*)$': '<rootDir>/lib$1',
    '^theme(.*)$': '<rootDir>/theme$1'
  },
  transformIgnorePatterns: ['node_modules/(?!(lightweight-charts|fancy-canvas)/)']
}
