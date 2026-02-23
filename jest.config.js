const moduleNameMapper = {
  '^@core/(.*)$': '<rootDir>/src/core/$1',
  '^@controllers/(.*)$': '<rootDir>/src/server/controllers/$1',
  '^@clients/(.*)$': '<rootDir>/src/server/clients/$1',
  '^@domain/(.*)$': '<rootDir>/src/server/domain/$1',
  '^@use-cases/(.*)$': '<rootDir>/src/server/use-cases/$1',
  '^@repository/(.*)$': '<rootDir>/src/server/repository/$1',
  '^@stores/(.*)$': '<rootDir>/src/server/stores/$1',
}

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
      moduleNameMapper,
    },
    {
      preset: 'ts-jest',
      displayName: 'server',
      testEnvironment: 'node',
      testMatch: ['**/test/server/**/*.test.ts'],
      moduleNameMapper,
    },
    {
      preset: 'ts-jest',
      displayName: 'core',
      testEnvironment: 'node',
      testMatch: ['**/test/core/**/*.test.ts'],
      moduleNameMapper,
    },
  ],
}
