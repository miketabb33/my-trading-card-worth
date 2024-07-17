import { StoreStatusDto } from '../../../core/types/StoreStatusDto'

class GetStoreStatusLogic {
  get = (expansionLastUpdated: Date | null, pricesLastUpdated: Date | null) => {
    const storeStatusDto: StoreStatusDto = {
      expansionsStatus: this.buildStatusMessage(expansionLastUpdated),
      pricesStatus: this.buildStatusMessage(pricesLastUpdated),
    }
    return storeStatusDto
  }

  private buildStatusMessage = (lastUpdated: Date | null) => {
    if (!lastUpdated) return 'Try again later'
    const formattedDate = lastUpdated.toLocaleDateString()
    return `Last Updated ${formattedDate}`
  }
}

export default GetStoreStatusLogic
