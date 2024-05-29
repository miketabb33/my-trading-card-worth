import { uuid } from '../../src/core/uuid'

describe('uuid', () => {
  it('should create a uuid with 36 characters', () => {
    expect(uuid().length).toEqual(36)
  })
})
