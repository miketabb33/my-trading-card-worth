import { collectionDetailsController } from '../../../../src/react/components/collection/CollectionDetails'
import { MY_COLLECTION_DETAILS_DTO } from '../../../core/__MOCKS__/myCollectionDetailsDto.mock'

describe('Collection Details Controller', () => {
  it('should return formatted values', () => {
    const myCollectionDetailsDto = {
      ...MY_COLLECTION_DETAILS_DTO,
      minMarketValueCents: 1034,
      maxMarketValueCents: 2349,
      averageMarketValueCents: 21331,
      medianMarketValueCents: 312391,
    }

    const result = collectionDetailsController(myCollectionDetailsDto)

    expect(result.minMaxValue).toEqual('$10.34-$23.49')
    expect(result.averageValue).toEqual('$213.31')
    expect(result.medianValue).toEqual('$3,123.91')
  })
})
