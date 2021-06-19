module.exports = {
  setupFilesAfterEnv: ['./jest.setup.js'],
  moduleDirectories: ['node_modules', '.'],
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '^components(.*)$': '<rootDir>/components$1',
    '^lib(.*)$': '<rootDir>/lib$1',
    '^theme(.*)$': '<rootDir>/theme$1'
  },
  transformIgnorePatterns: ['node_modules/(?!(lightweight-charts|fancy-canvas)/)']
}
