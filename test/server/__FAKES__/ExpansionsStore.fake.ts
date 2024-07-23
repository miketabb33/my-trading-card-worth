import { IExpansionsStore } from '../../../src/server/stores/ExpansionsStore'

class ExpansionStore_FAKE implements IExpansionsStore {
  GET_STATE = jest.fn()
  GET_EXPANSION_IDS = jest.fn()
  GET_LAST_UPDATED = jest.fn()
  REFRESH_STORE = jest.fn()
  INIT_STUBBED_STORE = jest.fn()

  getState = this.GET_STATE
  getExpansionIds = this.GET_EXPANSION_IDS
  getLastUpdated = this.GET_LAST_UPDATED
  refreshStore = this.REFRESH_STORE
  initStubbedStore = this.INIT_STUBBED_STORE
}

export default ExpansionStore_FAKE
