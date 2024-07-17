import BlueprintValueStore from '../../../src/server/stores/BlueprintValueStore'
import { BlueprintValue } from '../../../src/server/types/BlueprintValue'
import GetBlueprintValueLogic_FAKE from '../__FAKES__/GetBlueprintValueLogic.fake'

describe('Blueprint Value Store', () => {
  let blueprintValueStore: BlueprintValueStore
  let getBlueprintValueLogic_FAKE: GetBlueprintValueLogic_FAKE

  beforeEach(() => {
    getBlueprintValueLogic_FAKE = new GetBlueprintValueLogic_FAKE()
    blueprintValueStore = new BlueprintValueStore(getBlueprintValueLogic_FAKE)
  })

  it('should refresh and get state', async () => {
    getBlueprintValueLogic_FAKE.ADD.mockImplementation((id: number) => {
      const cache = new Map<string, BlueprintValue>()
      const blueprintValue: BlueprintValue = {
        minCents: id,
        maxCents: id,
        averageCents: id,
        medianCents: id,
      }
      cache.set(`${id}`, blueprintValue)
      return cache
    })

    await blueprintValueStore.refreshStore([1, 2])

    const state = blueprintValueStore.getState()
    expect(state.get('1')!.averageCents).toEqual(1)
    expect(state.size).toEqual(2)
    expect(blueprintValueStore.getLastUpdated()).not.toBeNull()
  })

  it('should refresh and get last updated', async () => {
    getBlueprintValueLogic_FAKE.ADD.mockImplementation((id: number) => {
      const cache = new Map<string, BlueprintValue>()
      const blueprintValue: BlueprintValue = {
        minCents: id,
        maxCents: id,
        averageCents: id,
        medianCents: id,
      }
      cache.set(`${id}`, blueprintValue)
      return cache
    })
    expect(blueprintValueStore.getLastUpdated()).toBeNull()

    await blueprintValueStore.refreshStore([1, 2])

    expect(blueprintValueStore.getLastUpdated()).not.toBeNull()
  })
})
