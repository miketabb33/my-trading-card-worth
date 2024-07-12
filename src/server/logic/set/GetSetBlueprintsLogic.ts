import { SetDetailsDto, SetDto } from '../../../core/types/CardBlueprintDto'
import { CardDto } from '../../../core/types/CardDto'
import { ICardTraderAdaptor } from '../../clients/CardTrader/CardTraderAdaptor'
import { IMyCardCRUD } from '../../database/repository/MyCardCRUD'
import { expansionStoreMap } from '../../stores/expansionStoreMap'
import { BlueprintValue } from '../../types/BlueprintValue'
import { CardBlueprint } from '../../types/CardBlueprint'

class GetSetBlueprintsLogic {
  private readonly myCardCRUD: IMyCardCRUD
  private readonly cardTraderAdaptor: ICardTraderAdaptor
  constructor(myCardCRUD: IMyCardCRUD, cardTraderAdaptor: ICardTraderAdaptor) {
    this.myCardCRUD = myCardCRUD
    this.cardTraderAdaptor = cardTraderAdaptor
  }
  get = async (
    userId: string | null,
    expansionId: number,
    blueprintValues: Map<string, BlueprintValue>
  ): Promise<SetDto> => {
    const cardBlueprints =
      await this.cardTraderAdaptor.getPokemonSetBlueprints(expansionId)

    let myCardMap: Map<number, number> | null

    if (userId) myCardMap = await this.buildMyCardMap(userId, expansionId)

    const cardDto: CardDto[] = cardBlueprints.map((blueprint) =>
      this.buildCardDto(blueprint, myCardMap, blueprintValues)
    )

    const dto: SetDto = {
      details: this.buildDetails(expansionId),
      blueprints: cardDto,
    }

    return dto
  }

  private buildCardDto = (
    cardBlueprint: CardBlueprint,
    myCardMap: Map<number, number> | null,
    blueprintValues: Map<string, BlueprintValue>
  ) => {
    const owned = myCardMap ? myCardMap.get(cardBlueprint.blueprintId) || 0 : 0
    const blueprintValue = blueprintValues.get(`${cardBlueprint.blueprintId}`)

    const cardDto: CardDto = {
      blueprintId: cardBlueprint.blueprintId,
      expansionId: cardBlueprint.expansionId,
      name: cardBlueprint.name,
      imageUrlPreview: cardBlueprint.imageUrlPreview,
      imageUrlShow: cardBlueprint.imageUrlShow,
      owned,
      minMarketValueCents: blueprintValue?.minCents ?? -1,
      maxMarketValueCents: blueprintValue?.maxCents ?? -1,
      averageMarketValueCents: blueprintValue?.averageCents ?? -1,
      medianMarketValueCents: blueprintValue?.medianCents ?? -1,
    }

    return cardDto
  }

  private buildDetails = (expansionId: number): SetDetailsDto | null => {
    const setDetails = expansionStoreMap.get(expansionId)

    if (!setDetails) return null

    const release = new Date(setDetails.releaseDate)

    const details: SetDetailsDto = {
      name: setDetails.name,
      setNumber: setDetails.setNumber,
      series: setDetails.series,
      cardCount: setDetails.numberOfCards,
      secretCardCount: setDetails.numberOfSecretCards,
      releaseDate: release.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
      logoUrl: setDetails.logoUrl,
      symbolUrl: setDetails.symbolUrl,
      bulbapediaUrl: setDetails.bulbapediaUrl,
    }

    return details
  }

  private buildMyCardMap = async (userId: string, expansionId: number) => {
    const myCards = await this.myCardCRUD.findBySet(userId, expansionId)

    const myCardMap = new Map<number, number>()

    myCards.forEach((card) => {
      const existingMapItemCount = myCardMap.get(card.cardTrader.blueprintId)
      if (!existingMapItemCount) {
        myCardMap.set(card.cardTrader.blueprintId, 1)
      } else {
        myCardMap.set(card.cardTrader.blueprintId, existingMapItemCount + 1)
      }
    })
    return myCardMap
  }
}

export default GetSetBlueprintsLogic
