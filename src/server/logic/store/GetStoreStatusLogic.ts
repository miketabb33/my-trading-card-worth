import { StoreStatusDto } from '../../../core/types/StoreStatusDto'

class GetStoreStatusLogic {
  get = (expansionLastUpdated: Date | null, pricesLastUpdated: Date | null) => {
    const storeStatusDto: StoreStatusDto = {
      expansionsLastUpdatedDateString: expansionLastUpdated?.toISOString() ?? null,
      pricesLastUpdatedDateString: pricesLastUpdated?.toISOString() ?? null,
    }
    return storeStatusDto
  }
}

export default GetStoreStatusLogic
