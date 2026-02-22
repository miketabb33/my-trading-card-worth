import { IGetBlueprintValueUseCase } from '../../../src/server/use-cases/price/GetBlueprintValueUseCase'

class GetBlueprintValueUseCase_FAKE implements IGetBlueprintValueUseCase {
  ADD = jest.fn()
  get = this.ADD
}

export default GetBlueprintValueUseCase_FAKE
