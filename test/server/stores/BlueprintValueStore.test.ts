import BlueprintValueStore from '../../../src/server/stores/BlueprintValueStore'
import { Result } from '../../../src/server/use-cases/Result'
import { BlueprintValue } from '../../../src/server/types/BlueprintValue'
import { makeExpansionDto } from '../../core/__MOCKS__/catalog.mock'
import ExpansionStore_FAKE from '../__FAKES__/ExpansionsStore.fake'
import GetBlueprintValueUseCase_FAKE from '../__FAKES__/GetBlueprintValueUseCase.fake'

describe('Blueprint Value Store', () => {
  let blueprintValueStore: BlueprintValueStore
  let getBlueprintValueUseCase_FAKE: GetBlueprintValueUseCase_FAKE
  let expansionsStore_FAKE: ExpansionStore_FAKE

  beforeEach(() => {
    getBlueprintValueUseCase_FAKE = new GetBlueprintValueUseCase_FAKE()
    expansionsStore_FAKE = new ExpansionStore_FAKE()
    blueprintValueStore = new BlueprintValueStore(getBlueprintValueUseCase_FAKE, expansionsStore_FAKE)
    expansionsStore_FAKE.GET_STATE.mockReturnValue([
      makeExpansionDto({ expansionId: 1 }),
      makeExpansionDto({ expansionId: 2 }),
    ])
  })

  it('should refresh and get state', async () => {
    getBlueprintValueUseCase_FAKE.CALL.mockImplementation((id: number) => {
      const cache = new Map<string, BlueprintValue>()
      const blueprintValue: BlueprintValue = {
        medianCents: id,
        listingCount: id,
      }
      cache.set(`${id}`, blueprintValue)
      return Result.success(cache)
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
    getBlueprintValueUseCase_FAKE.CALL.mockImplementation((id: number) => {
      const cache = new Map<string, BlueprintValue>()
      const blueprintValue: BlueprintValue = {
        medianCents: id,
        listingCount: id,
      }
      cache.set(`${id}`, blueprintValue)
      return Result.success(cache)
    })
    expect(blueprintValueStore.getLastUpdated()).toBeNull()

    await blueprintValueStore.refreshStore()

    expect(blueprintValueStore.getLastUpdated()).not.toBeNull()
  })
})
