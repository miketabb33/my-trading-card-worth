import { validatedEnv } from '../../src/server/env'

describe('Validate Env', () => {
  it('should throw when given undefined', () => {
    expect(() => validatedEnv('env_identifier', undefined)).toThrow('Missing Environment Variable: env_identifier')
  })
  it('should return variable', () => {
    expect(validatedEnv('env_identifier', 'Any Value')).toEqual('Any Value')
  })
})
