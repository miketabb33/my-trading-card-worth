import { IGetBlueprintValueLogic } from '../../../src/server/logic/price/GetBlueprintValueLogic'

class GetBlueprintValueLogic_FAKE implements IGetBlueprintValueLogic {
  ADD = jest.fn()
  get = this.ADD
}

export default GetBlueprintValueLogic_FAKE
