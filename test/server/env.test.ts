import { validatedEnv } from '../../src/server/env'

describe('Validate Env', () => {
  it('should throw when given undefined', () => {
    expect(() => validatedEnv(undefined)).toThrow()
  })
  it('should return variable', () => {
    expect(validatedEnv('Any Value')).toEqual('Any Value')
  })
})
