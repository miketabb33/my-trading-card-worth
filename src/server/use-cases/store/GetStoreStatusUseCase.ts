import { Result } from '@use-cases/Result'
import { StoreStatusDto } from '../../../core/types/StoreStatusDto'

class GetStoreStatusUseCase {
  get = (expansionLastUpdated: Date | null, pricesLastUpdated: Date | null) => {
    const storeStatusDto: StoreStatusDto = {
      expansionsLastUpdatedDateString: expansionLastUpdated?.toISOString() ?? null,
      pricesLastUpdatedDateString: pricesLastUpdated?.toISOString() ?? null,
    }
    return Result.success(storeStatusDto)
  }
}

export default GetStoreStatusUseCase
