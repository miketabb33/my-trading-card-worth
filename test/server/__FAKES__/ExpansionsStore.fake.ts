import { ExpansionDto } from '../../../src/core/types/ExpansionDto'
import { IStore } from '../../../src/server/stores/IStore'

class ExpansionStore_FAKE implements IStore<ExpansionDto[]> {
  GET_STATE = jest.fn()
  GET_LAST_UPDATED = jest.fn()
  REFRESH_STORE = jest.fn()

  getState = this.GET_STATE
  getLastUpdated = this.GET_LAST_UPDATED
  refreshStore = this.REFRESH_STORE
}

export default ExpansionStore_FAKE
