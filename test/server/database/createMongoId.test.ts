import { createMongoId } from '../../../src/server/database/createMongoId'

describe('Create Mongo Id', () => {
  it('should ', () => {
    const result = createMongoId()
    expect(result.length).toEqual(24)
  })
})
