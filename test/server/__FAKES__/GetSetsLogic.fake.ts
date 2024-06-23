import { IGetSetsLogic } from '../../../src/server/logic/set/GetSetsLogic'

class GetSetsLogic_FAKE implements IGetSetsLogic {
  GET = jest.fn()
  get = this.GET
}

export default GetSetsLogic_FAKE
