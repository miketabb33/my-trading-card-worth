import { IGetBlueprintValueUseCase } from '../../../src/server/use-cases/price/GetBlueprintValueUseCase'

class GetBlueprintValueUseCase_FAKE implements IGetBlueprintValueUseCase {
  CALL = jest.fn()
  call = this.CALL
}

export default GetBlueprintValueUseCase_FAKE
