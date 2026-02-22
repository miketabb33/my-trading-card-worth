import { IGetExpansionsUseCase } from '../../../src/server/use-cases/catalog/GetExpansionsUseCase'

class GetExpansionsUseCase_FAKE implements IGetExpansionsUseCase {
  GET = jest.fn()
  get = this.GET
}

export default GetExpansionsUseCase_FAKE
