import { IGetExpansionsLogic } from '../../../src/server/logic/catalog/GetExpansionsLogic'

class GetExpansionsLogic_FAKE implements IGetExpansionsLogic {
  GET = jest.fn()
  get = this.GET
}

export default GetExpansionsLogic_FAKE
