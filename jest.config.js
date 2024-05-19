module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  collectCoverage: true,
  reporters: ['default', ['jest-junit', { outputDirectory: 'coverage' }]],
  coveragePathIgnorePatterns: ['<rootDir/test>'],
}
