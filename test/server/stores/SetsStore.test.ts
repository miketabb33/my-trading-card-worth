import SetsStore from '../../../src/server/stores/SetsStore'
import { EXPANSION_DTO_1 } from '../../core/__MOCKS__/expansionDto.mock'
import GetSetsLogic_FAKE from '../__FAKES__/GetSetsLogic.fake'

describe('Sets Store', () => {
  let setsStore: SetsStore
  let getSetsLogic_FAKE: GetSetsLogic_FAKE

  beforeEach(() => {
    getSetsLogic_FAKE = new GetSetsLogic_FAKE()
    setsStore = new SetsStore(getSetsLogic_FAKE)
  })

  it('should call Get Sets Logic when cache is not initialized', async () => {
    getSetsLogic_FAKE.GET.mockResolvedValue([EXPANSION_DTO_1])

    const result = await setsStore.get()

    expect(result).toEqual([EXPANSION_DTO_1])
  })

  it('should use cache for Get Sets Logic', async () => {
    getSetsLogic_FAKE.GET.mockResolvedValue([EXPANSION_DTO_1])

    await setsStore.initStore()

    const result1 = await setsStore.get()
    const result2 = await setsStore.get()

    expect(getSetsLogic_FAKE.GET).toHaveBeenCalledTimes(1)

    expect(result1).toEqual([EXPANSION_DTO_1])
    expect(result2).toEqual([EXPANSION_DTO_1])
  })
})
