import { IGetExpansionsUseCase } from '../../../src/server/use-cases/catalog/GetExpansionsUseCase'

class GetExpansionsUseCase_FAKE implements IGetExpansionsUseCase {
  CALL = jest.fn()
  call = this.CALL
}

export default GetExpansionsUseCase_FAKE
