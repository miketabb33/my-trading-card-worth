import GetStoreStatusUseCase from '../../../../src/server/use-cases/store/GetStoreStatusUseCase'

describe('Get Store Status UseCase', () => {
  let getStoreStatusUseCase: GetStoreStatusUseCase

  beforeEach(() => {
    getStoreStatusUseCase = new GetStoreStatusUseCase()
  })

  it('should return null when given null', () => {
    const result = getStoreStatusUseCase.get(null, null)

    expect(result.value.expansionsLastUpdatedDateString).toEqual(null)
    expect(result.value.pricesLastUpdatedDateString).toEqual(null)
  })

  it('should build iso date for price and expansions', () => {
    const expansionDate = new Date(2022, 0, 16)
    const pricesDate = new Date(1990, 1, 13)

    const result = getStoreStatusUseCase.get(expansionDate, pricesDate)

    expect(result.value.expansionsLastUpdatedDateString).toEqual(expansionDate.toISOString())
    expect(result.value.pricesLastUpdatedDateString).toEqual(pricesDate.toISOString())
  })
})
