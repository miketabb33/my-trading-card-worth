import ExpansionsStore from '../../../src/server/stores/ExpansionsStore'
import { Result } from '../../../src/server/use-cases/Result'
import { EXPANSION_DTO_1 } from '../../core/__MOCKS__/expansionDto.mock'
import GetExpansionsUseCase_FAKE from '../__FAKES__/GetExpansionsUseCase.fake'

describe('Expansions Store', () => {
  let expansionsStore: ExpansionsStore
  let getExpansionsUseCase_FAKE: GetExpansionsUseCase_FAKE

  beforeEach(() => {
    getExpansionsUseCase_FAKE = new GetExpansionsUseCase_FAKE()
    expansionsStore = new ExpansionsStore(getExpansionsUseCase_FAKE)
  })

  it('should return empty cache when refresh is not called ', () => {
    getExpansionsUseCase_FAKE.GET.mockResolvedValue(Result.success([EXPANSION_DTO_1]))

    const result = expansionsStore.getState()

    expect(result).toEqual([])
  })

  it('should use cache for Get Expansions UseCase', async () => {
    getExpansionsUseCase_FAKE.GET.mockResolvedValue(Result.success([EXPANSION_DTO_1]))

    await expansionsStore.refreshStore()

    const result1 = expansionsStore.getState()
    const result2 = expansionsStore.getState()

    expect(getExpansionsUseCase_FAKE.GET).toHaveBeenCalledTimes(1)

    expect(result1).toEqual([EXPANSION_DTO_1])
    expect(result2).toEqual([EXPANSION_DTO_1])
  })

  it('should set last updated date when refresh is called', async () => {
    getExpansionsUseCase_FAKE.GET.mockResolvedValue(Result.success([EXPANSION_DTO_1]))
    expect(expansionsStore.getLastUpdated()).toBeNull()

    await expansionsStore.refreshStore()

    expect(expansionsStore.getLastUpdated()).not.toBeNull()
  })

  describe('on failure', () => {
    it('should not update state', async () => {
      getExpansionsUseCase_FAKE.GET.mockResolvedValue(Result.failure('error'))

      await expansionsStore.refreshStore()

      expect(expansionsStore.getState()).toEqual([])
    })

    it('should not update last updated date', async () => {
      getExpansionsUseCase_FAKE.GET.mockResolvedValue(Result.failure('error'))

      await expansionsStore.refreshStore()

      expect(expansionsStore.getLastUpdated()).toBeNull()
    })
  })
})
