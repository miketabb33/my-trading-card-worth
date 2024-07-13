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

  it('should init and get', async () => {
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
    await blueprintValueStore.initStore([1, 2])

    const result = blueprintValueStore.get()
    expect(result.get('1')!.averageCents).toEqual(1)
    expect(result.size).toEqual(2)
  })
})
