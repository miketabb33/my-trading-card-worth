import BlueprintValueStore from '../../../src/server/stores/BlueprintValueStore'
import { BlueprintValue } from '../../../src/server/types/BlueprintValue'
import GetExpansionBlueprintValueLogic_FAKE from '../__FAKES__/GetExpansionBlueprintValueLogic.fake'

describe('Blueprint Value Store', () => {
  let blueprintValueStore: BlueprintValueStore
  let getExpansionBlueprintValueLogic_FAKE: GetExpansionBlueprintValueLogic_FAKE

  beforeEach(() => {
    getExpansionBlueprintValueLogic_FAKE =
      new GetExpansionBlueprintValueLogic_FAKE()
    blueprintValueStore = new BlueprintValueStore(
      getExpansionBlueprintValueLogic_FAKE
    )
  })

  it('should init and get', async () => {
    getExpansionBlueprintValueLogic_FAKE.ADD.mockImplementation(
      (id: number) => {
        const cache = new Map<string, BlueprintValue>()
        const blueprintValue: BlueprintValue = {
          minCents: id,
          maxCents: id,
          averageCents: id,
          medianCents: id,
        }
        cache.set(`${id}`, blueprintValue)
        return cache
      }
    )
    await blueprintValueStore.initStore([1, 2])

    const result = blueprintValueStore.get()
    expect(result.get('1')!.averageCents).toEqual(1)
    expect(result.size).toEqual(2)
  })
})
