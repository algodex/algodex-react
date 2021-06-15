const esModules = ['fancy-canvas', 'lightweight-charts'].join('|')
module.exports = {
  setupFilesAfterEnv: ['./jest.setup.js'],
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '^components(.*)$': '<rootDir>/components$1'
  },
  transformIgnorePatterns: [`/node_modules/(?!${esModules})`]
}
