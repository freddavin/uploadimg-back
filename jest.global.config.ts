import { Config } from 'jest';

export const globalConfig: Config = {
  rootDir: `${__dirname}`,
  preset: 'ts-jest',
  clearMocks: true,
  verbose: true,
  testEnvironment: 'node',
  collectCoverageFrom: ['<rootDir>/src/**/*.ts'],
  coveragePathIgnorePatterns: ['/models/'],
  testPathIgnorePatterns: ['/node_modules/'],
  coverageReporters: ['json', 'lcov', 'text', 'clover'],
};
