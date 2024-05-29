module.exports = {
  collectCoverage: true,
  reporters: ['default', ['jest-junit', { outputDirectory: 'coverage' }]],
  coveragePathIgnorePatterns: ['<rootDir/test>'],
  projects: [
    {
      preset: 'ts-jest',
      displayName: 'react',
      testEnvironment: 'jsdom',
      testMatch: ['**/test/react/**/*.test.ts'],
    },
    {
      preset: 'ts-jest',
      displayName: 'server',
      testEnvironment: 'node',
      testMatch: ['**/test/server/**/*.test.ts'],
    },
    {
      preset: 'ts-jest',
      displayName: 'core',
      testEnvironment: 'node',
      testMatch: ['**/test/core/**/*.test.ts'],
    },
  ],
}
