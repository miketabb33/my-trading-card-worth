import GetStoreStatusLogic from '../../../../src/server/logic/store/GetStoreStatusLogic'

describe('Get Store Status Logic', () => {
  let getStoreStatusLogic: GetStoreStatusLogic

  beforeEach(() => {
    getStoreStatusLogic = new GetStoreStatusLogic()
  })

  it('should return null when given null', () => {
    const result = getStoreStatusLogic.get(null, null)

    expect(result.value.expansionsLastUpdatedDateString).toEqual(null)
    expect(result.value.pricesLastUpdatedDateString).toEqual(null)
  })

  it('should build iso date for price and expansions', () => {
    const expansionDate = new Date(2022, 0, 16)
    const pricesDate = new Date(1990, 1, 13)

    const result = getStoreStatusLogic.get(expansionDate, pricesDate)

    expect(result.value.expansionsLastUpdatedDateString).toEqual(expansionDate.toISOString())
    expect(result.value.pricesLastUpdatedDateString).toEqual(pricesDate.toISOString())
  })
})
