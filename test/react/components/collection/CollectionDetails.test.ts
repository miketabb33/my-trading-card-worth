import { MyCollectionDetailsDto } from '../../../../src/core/types/MyCollectionDetailsDto'
import { collectionDetailsController } from '../../../../src/react/components/collection/CollectionDetails'

describe('Collection Details Controller', () => {
  it('should return formatted values', () => {
    const myCollectionDetailsDto: MyCollectionDetailsDto = {
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
