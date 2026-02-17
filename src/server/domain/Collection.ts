import { CardDto } from '../../core/types/CardDto'
import { CollectionMetaDto } from '../../core/types/CollectionMetaDto'
import { MyCardEntity } from '../repository/MyCardRepo'
import { BlueprintValue } from '../types/BlueprintValue'

export interface ICollection {
  cards: () => CardDto[]
  details: () => CollectionMetaDto
}

class Collection implements ICollection {
  private cardCollection: CardDto[]
  private cardDetails: CollectionMetaDto

  constructor(myCardEntities: MyCardEntity[], blueprintValues: Map<string, BlueprintValue>) {
    const { cards, details } = this.calculateValues(myCardEntities, blueprintValues)
    this.cardCollection = cards
    this.cardDetails = details
  }

  cards = () => {
    return this.cardCollection
  }

  details = () => {
    return this.cardDetails
  }

  private calculateValues = (myCardEntities: MyCardEntity[], blueprintValues: Map<string, BlueprintValue>) => {
    const myCollectionTotalValue = this.getEmptyBlueprintValue()
    let cardsInCollection = 0

    const cardCollection = myCardEntities.map((myCardEntity) => {
      cardsInCollection += myCardEntity.items.length

      let blueprintValue = blueprintValues.get(`${myCardEntity.cardTrader.blueprintId}`)

      if (blueprintValue)
        this.addBlueprintValueToTotalValues(myCollectionTotalValue, blueprintValue, myCardEntity.items.length)

      if (!blueprintValue) blueprintValue = this.getMissingBlueprintValue()

      return this.buildCardDto(myCardEntity, blueprintValue)
    })

    const details: CollectionMetaDto = {
      medianMarketValueCents: myCollectionTotalValue.medianCents,
      cardsInCollection,
    }

    return {
      cards: cardCollection,
      details,
    }
  }

  private buildCardDto = (myCardEntity: MyCardEntity, blueprintValue: BlueprintValue) => {
    const cardDto: CardDto = {
      blueprintId: myCardEntity.cardTrader.blueprintId,
      expansionId: myCardEntity.cardTrader.expansionId,
      name: myCardEntity.name,
      imageUrlPreview: myCardEntity.imageUrlPreview,
      imageUrlShow: myCardEntity.imageUrlShow,
      owned: myCardEntity.items.length,
      medianMarketValueCents: blueprintValue.medianCents,
      listingCount: blueprintValue.listingCount,
    }
    return cardDto
  }

  private addBlueprintValueToTotalValues = (
    totalValues: BlueprintValue,
    blueprintValue: BlueprintValue,
    blueprintCount: number
  ) => {
    for (let i = 1; i <= blueprintCount; i++) {
      totalValues.medianCents += blueprintValue.medianCents
    }
  }

  private getEmptyBlueprintValue = (): BlueprintValue => {
    return {
      medianCents: 0,
      listingCount: 0,
    }
  }

  private getMissingBlueprintValue = (): BlueprintValue => {
    return {
      medianCents: -1,
      listingCount: -1,
    }
  }
}

export default Collection
