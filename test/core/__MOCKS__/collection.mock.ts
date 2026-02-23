import { AddUserCardBody, CollectionMetaDto } from '@core/network-types/collection'

export const COLLECTION_META_DTO: CollectionMetaDto = {
  medianMarketValueCents: 0,
  cardsInCollection: 0,
}

export const ADD_USER_CARD_DTO: AddUserCardBody = {
  blueprintId: 0,
  expansionId: 0,
  name: '',
  imageUrlPreview: '',
  imageUrlShow: '',
}
