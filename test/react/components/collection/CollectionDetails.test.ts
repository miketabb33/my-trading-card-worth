import { CollectionMetaDto } from '../../../../src/core/types/CollectionMetaDto'
import { collectionDetailsController } from '../../../../src/react/components/collection/CollectionDetails'
import { COLLECTION_META_DTO } from '../../../core/__MOCKS__/collectionMetaDto.mock'

describe('Collection Details Controller', () => {
  it('should return formatted amount', () => {
    const myCollectionDetailsDto: CollectionMetaDto = {
      ...COLLECTION_META_DTO,
      medianMarketValueCents: 312391,
    }

    const result = collectionDetailsController(myCollectionDetailsDto)

    expect(result.medianValue).toEqual('$3,123.91')
  })

  it('should return formatted card count', () => {
    const myCollectionDetailsDto: CollectionMetaDto = {
      ...COLLECTION_META_DTO,
      cardsInCollection: 1100500,
    }

    const result = collectionDetailsController(myCollectionDetailsDto)

    expect(result.formattedCardsInCollection).toEqual('1,100,500')
  })
})
