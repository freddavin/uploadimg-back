import { Config } from 'jest';
import { globalConfig } from '../../jest.global.config';

const config: Config = {
  ...globalConfig,
  displayName: {
    name: 'unit-tests',
    color: 'green',
  },
  testMatch: ['**/tests/unit/**/*.test.ts'],
  collectCoverage: true,
  coverageDirectory: 'coverage',
};

export default config;
