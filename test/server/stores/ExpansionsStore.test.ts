import ExpansionsStore from '../../../src/server/stores/ExpansionsStore'
import { EXPANSION_DTO_1 } from '../../core/__MOCKS__/expansionDto.mock'
import GetExpansionsLogic_FAKE from '../__FAKES__/GetExpansionsLogic.fake'

describe('Expansions Store', () => {
  let expansionsStore: ExpansionsStore
  let getExpansionsLogic_FAKE: GetExpansionsLogic_FAKE

  beforeEach(() => {
    getExpansionsLogic_FAKE = new GetExpansionsLogic_FAKE()
    expansionsStore = new ExpansionsStore(getExpansionsLogic_FAKE)
  })

  it('should call Get Expansions Logic when cache is not initialized', async () => {
    getExpansionsLogic_FAKE.GET.mockResolvedValue([EXPANSION_DTO_1])

    const result = await expansionsStore.getState()

    expect(result).toEqual([EXPANSION_DTO_1])
  })

  it('should use cache for Get Expansions Logic', async () => {
    getExpansionsLogic_FAKE.GET.mockResolvedValue([EXPANSION_DTO_1])

    await expansionsStore.refreshStore()

    const result1 = await expansionsStore.getState()
    const result2 = await expansionsStore.getState()

    expect(getExpansionsLogic_FAKE.GET).toHaveBeenCalledTimes(1)

    expect(result1).toEqual([EXPANSION_DTO_1])
    expect(result2).toEqual([EXPANSION_DTO_1])
  })

  it('should set last updated date when refresh is called', async () => {
    getExpansionsLogic_FAKE.GET.mockResolvedValue([EXPANSION_DTO_1])
    expect(expansionsStore.getLastUpdated()).toBeNull()

    await expansionsStore.refreshStore()

    expect(expansionsStore.getLastUpdated()).not.toBeNull()
  })
})
