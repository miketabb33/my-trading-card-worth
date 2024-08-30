import BlueprintValueStore from '../../../src/server/stores/BlueprintValueStore'
import { BlueprintValue } from '../../../src/server/types/BlueprintValue'
import { makeExpansionDto } from '../../core/__MOCKS__/expansionDto.mock'
import ExpansionStore_FAKE from '../__FAKES__/ExpansionsStore.fake'
import GetBlueprintValueLogic_FAKE from '../__FAKES__/GetBlueprintValueLogic.fake'

describe('Blueprint Value Store', () => {
  let blueprintValueStore: BlueprintValueStore
  let getBlueprintValueLogic_FAKE: GetBlueprintValueLogic_FAKE
  let expansionsStore_FAKE: ExpansionStore_FAKE

  beforeEach(() => {
    getBlueprintValueLogic_FAKE = new GetBlueprintValueLogic_FAKE()
    expansionsStore_FAKE = new ExpansionStore_FAKE()
    blueprintValueStore = new BlueprintValueStore(
      getBlueprintValueLogic_FAKE,
      expansionsStore_FAKE
    )
    expansionsStore_FAKE.GET_STATE.mockReturnValue([
      makeExpansionDto({ expansionId: 1 }),
      makeExpansionDto({ expansionId: 2 }),
    ])
  })

  it('should refresh and get state', async () => {
    getBlueprintValueLogic_FAKE.ADD.mockImplementation((id: number) => {
      const cache = new Map<string, BlueprintValue>()
      const blueprintValue: BlueprintValue = {
        medianCents: id,
        listingCount: id,
      }
      cache.set(`${id}`, blueprintValue)
      return cache
    })

    await blueprintValueStore.refreshStore()

    const state = blueprintValueStore.getState()

    expect(state.get('1')!.medianCents).toEqual(1)
    expect(state.get('1')!.listingCount).toEqual(1)
    expect(state.size).toEqual(2)
    expect(blueprintValueStore.getLastUpdated()).not.toBeNull()
    expect(expansionsStore_FAKE.GET_STATE).toHaveBeenCalled()
  })

  it('should refresh and get last updated', async () => {
    getBlueprintValueLogic_FAKE.ADD.mockImplementation((id: number) => {
      const cache = new Map<string, BlueprintValue>()
      const blueprintValue: BlueprintValue = {
        medianCents: id,
        listingCount: id,
      }
      cache.set(`${id}`, blueprintValue)
      return cache
    })
    expect(blueprintValueStore.getLastUpdated()).toBeNull()

    await blueprintValueStore.refreshStore()

    expect(blueprintValueStore.getLastUpdated()).not.toBeNull()
  })
})
