import { ICardTraderAdaptor } from '../../clients/CardTrader/CardTraderAdaptor'
import { BlueprintValue } from '../../types/BlueprintValue'

export interface IGetExpansionBlueprintValueLogic {
  add: (
    expansionId: number,
    blueprintValueMap: Map<string, BlueprintValue>
  ) => Promise<void>
}

class GetExpansionBlueprintValueLogic
  implements IGetExpansionBlueprintValueLogic
{
  private cardTraderAdaptor: ICardTraderAdaptor

  constructor(cardTraderAdaptor: ICardTraderAdaptor) {
    this.cardTraderAdaptor = cardTraderAdaptor
  }
  add = async (
    expansionId: number,
    blueprintValueMap: Map<string, BlueprintValue>
  ) => {
    const cardValueMap =
      await this.cardTraderAdaptor.getPokemonCardValues(expansionId)

    cardValueMap.forEach((cardValues, expansionId) => {
      const cardPrices = cardValues.map((v) => v.priceCents)

      const blueprintValue: BlueprintValue = {
        minCents: Math.min(...cardPrices),
        maxCents: Math.max(...cardPrices),
        averageCents: Math.round(this.average(cardPrices)),
        medianCents: Math.round(this.median(cardPrices)),
      }
      blueprintValueMap.set(expansionId, blueprintValue)
    })
  }

  private average = (values: number[]): number => {
    return values.reduce((a, b) => a + b) / values.length
  }

  private median = (values: number[]): number => {
    if (values.length === 0) return 0

    values = [...values].sort((a, b) => a - b)

    const half = Math.floor(values.length / 2)

    return values.length % 2
      ? values[half]
      : (values[half - 1] + values[half]) / 2
  }
}

export default GetExpansionBlueprintValueLogic
