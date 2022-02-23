module.exports = {
  globalSetup: './jest.setup.js',
  setupFilesAfterEnv: ['./jest.setup.after-env.js'],
  moduleDirectories: ['node_modules', '<rootDir>'],
  testEnvironment: 'jsdom',
  collectCoverage: true,
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/.next/'],
  coverageThreshold: {
    //TODO: Raise confidence
    global: {
      branches: 20
    }
  },
  collectCoverageFrom: [
    '**/components/**/*.{js,jsx}',
    // '**/hooks/**/*.{js,jsx}',
    // '**/utils/**/*.{js,jsx}',
    // '**/services/**/*.{js,jsx}',
    '!**/components/**/index.{js,jsx}',
    '!**/components/Input/*.{js,jsx}',
    '!**/components/Pages/*.{js,jsx}',
    '!**/components/**/*.stories.{js,jsx}',
    '!**/components/**/*demo.{js,jsx}',
    '!**/components/**/*spec.{js,jsx}'
  ],
  coverageReporters: ['lcov', 'text', 'json-summary'],
  moduleNameMapper: {
    '^@/components(.*)$': '<rootDir>/components$1',
    '^@/lib(.*)$': '<rootDir>/lib$1',
    '^@/hooks(.*)$': '<rootDir>/hooks$1',
    '^@/services(.*)$': '<rootDir>/services$1',
    '^@/store(.*)$': '<rootDir>/store$1',
    '^@/utils(.*)$': '<rootDir>/utils$1',
    '^theme(.*)$': '<rootDir>/theme$1'
  },
  transformIgnorePatterns: ['node_modules/(?!(lightweight-charts|fancy-canvas)/)']
}
