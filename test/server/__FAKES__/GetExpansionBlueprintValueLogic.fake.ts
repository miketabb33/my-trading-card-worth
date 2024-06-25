import { IGetExpansionBlueprintValueLogic } from '../../../src/server/logic/price/GetExpansionBlueprintValueLogic'

class GetExpansionBlueprintValueLogic_FAKE
  implements IGetExpansionBlueprintValueLogic
{
  ADD = jest.fn()
  get = this.ADD
}

export default GetExpansionBlueprintValueLogic_FAKE
