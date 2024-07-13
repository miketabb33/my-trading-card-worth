import { ExpansionDto } from '../../../core/types/ExpansionDto'
import { ICardTraderAdaptor } from '../../clients/CardTrader/CardTraderAdaptor'
import { ExpansionData } from '../../types/ExpansionData'
import { IExpansionSorter, SortableExpansion } from './ExpansionSorter'
export interface IGetExpansionsLogic {
  get: () => Promise<ExpansionDto[]>
}

class GetExpansionsLogic implements IGetExpansionsLogic {
  private readonly cardTraderAdaptor: ICardTraderAdaptor
  private readonly expansionSorter: IExpansionSorter
  private readonly expansionStoreMap: Map<number, ExpansionData>

  constructor(
    cardTraderAdaptor: ICardTraderAdaptor,
    expansionSorter: IExpansionSorter,
    expansionStoreMap: Map<number, ExpansionData>
  ) {
    this.cardTraderAdaptor = cardTraderAdaptor
    this.expansionSorter = expansionSorter
    this.expansionStoreMap = expansionStoreMap
  }

  get = async (): Promise<ExpansionDto[]> => {
    const pokemonExpansions =
      await this.cardTraderAdaptor.getPokemonExpansions()

    const sortableExpansions: SortableExpansion[] = pokemonExpansions.map(
      (cardExpansion) => ({
        cardExpansion,
        expansionData:
          this.expansionStoreMap.get(cardExpansion.expansionId) || null,
      })
    )

    const sortedExpansions = this.expansionSorter.sort(sortableExpansions)

    const expansionDto: ExpansionDto[] = sortedExpansions.map(
      (sortedExpansion) => ({
        name: sortedExpansion.cardExpansion.name,
        expansionId: sortedExpansion.cardExpansion.expansionId,
        symbol: sortedExpansion.expansionData?.symbolUrl ?? null,
        slug: this.formatSlug(sortedExpansion.cardExpansion.name),
      })
    )

    return expansionDto
  }

  private formatSlug = (expansionName: string) => {
    const withHyphens = expansionName.replace(' ', '-')
    const onlyNumOrChar = withHyphens.replace(/[^a-zA-Z0-9|-]/g, '')
    return onlyNumOrChar.toLowerCase()
  }
}

export default GetExpansionsLogic
