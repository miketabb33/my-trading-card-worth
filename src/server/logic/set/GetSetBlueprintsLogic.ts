import { CardBlueprintDto } from '../../../core/types/CardBlueprintDto'
import { ICardTraderAdaptor } from '../../clients/CardTrader/CardTraderAdaptor'
import { IMyCardCRUD } from '../../database/repository/MyCardCRUD'
import { CardBlueprint } from '../../types/CardBlueprint'

class GetSetBlueprintsLogic {
  private readonly myCardCRUD: IMyCardCRUD
  private readonly cardTraderAdaptor: ICardTraderAdaptor
  constructor(myCardCRUD: IMyCardCRUD, cardTraderAdaptor: ICardTraderAdaptor) {
    this.myCardCRUD = myCardCRUD
    this.cardTraderAdaptor = cardTraderAdaptor
  }
  get = async (userId: string | null, expansionId: number) => {
    const set =
      await this.cardTraderAdaptor.getPokemonSetBlueprints(expansionId)

    let myCardMap: Map<number, number> | null

    if (userId) myCardMap = await this.buildMyCardMap(userId, expansionId)

    const dto: CardBlueprintDto[] = set.map((blueprint) =>
      this.buildDto(blueprint, myCardMap)
    )

    return dto
  }

  private buildDto = (
    item: CardBlueprint,
    myCardMap: Map<number, number> | null
  ) => {
    const owned = myCardMap ? myCardMap.get(item.blueprintId) || 0 : 0

    const cardBlueprintDto: CardBlueprintDto = {
      cardTraderBlueprintId: item.blueprintId,
      cardTraderExpansionId: item.expansionId,
      name: item.name,
      version: item.version,
      imageUrlPreview: item.imageUrlPreview,
      imageUrlShow: item.imageUrlShow,
      owned,
    }

    return cardBlueprintDto
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
