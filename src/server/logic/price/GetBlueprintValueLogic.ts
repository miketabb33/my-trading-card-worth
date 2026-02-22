import { Result } from '@logic/Result'
import { ICardTraderAdaptor } from '../../clients/CardTrader/CardTraderAdaptor'
import { BlueprintValue } from '../../types/BlueprintValue'

export interface IGetBlueprintValueLogic {
  get: (expansionId: number) => Promise<Result<Map<string, BlueprintValue>>>
}

class GetBlueprintValueLogic implements IGetBlueprintValueLogic {
  private cardTraderAdaptor: ICardTraderAdaptor

  constructor(cardTraderAdaptor: ICardTraderAdaptor) {
    this.cardTraderAdaptor = cardTraderAdaptor
  }
  get = async (expansionId: number) => {
    const blueprintIdToBlueprintValueMap = new Map<string, BlueprintValue>()
    const blueprintIdToCardValueMap = await this.cardTraderAdaptor.getPokemonCardValues(expansionId)

    blueprintIdToCardValueMap.forEach((cardValues, blueprintId) => {
      const cardPrices = cardValues.map((v) => v.priceCents)

      const blueprintValue: BlueprintValue = {
        medianCents: Math.round(this.median(cardPrices)),
        listingCount: cardPrices.length,
      }
      blueprintIdToBlueprintValueMap.set(blueprintId, blueprintValue)
    })
    return Result.success(blueprintIdToBlueprintValueMap)
  }

  private median = (values: number[]): number => {
    if (values.length === 0) return 0

    values = [...values].sort((a, b) => a - b)

    const half = Math.floor(values.length / 2)

    return values.length % 2 ? values[half] : (values[half - 1] + values[half]) / 2
  }
}

export default GetBlueprintValueLogic
