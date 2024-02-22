import { Config } from 'jest';
import { globalConfig } from '../../jest.global.config';

const config: Config = {
  ...globalConfig,
  displayName: {
    name: 'integration-tests',
    color: 'magenta',
  },
  testMatch: ['**/tests/integration/**/*.test.ts'],
  collectCoverage: false,
};

export default config;
