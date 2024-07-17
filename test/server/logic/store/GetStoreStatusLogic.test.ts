import GetStoreStatusLogic from '../../../../src/server/logic/store/GetStoreStatusLogic'

describe('Get Store Status Logic', () => {
  let getStoreStatusLogic: GetStoreStatusLogic

  beforeEach(() => {
    getStoreStatusLogic = new GetStoreStatusLogic()
  })

  it('should build status for no last updated', () => {
    const result = getStoreStatusLogic.get(null, null)

    expect(result.expansionsStatus).toEqual('Try again later')
    expect(result.pricesStatus).toEqual('Try again later')
  })

  it('should build status for last updated values', () => {
    const expansionDate = new Date(2022, 0, 16)
    const pricesDate = new Date(1990, 1, 13)

    const result = getStoreStatusLogic.get(expansionDate, pricesDate)

    expect(result.expansionsStatus).toEqual('Last Updated 1/16/2022')
    expect(result.pricesStatus).toEqual('Last Updated 2/13/1990')
  })
})
