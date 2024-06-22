import { CardSetDto } from '../../../core/types/CardSetDto'
import { ICardTraderAdaptor } from '../../clients/CardTrader/CardTraderAdaptor'
import { ExpansionData } from '../../types/ExpansionData'
import { IExpansionSorter, SortableExpansion } from './ExpansionSorter'

class GetSetsLogic {
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

  get = async (): Promise<CardSetDto[]> => {
    const pokemonSets = await this.cardTraderAdaptor.getPokemonSets()

    const sets: SortableExpansion[] = pokemonSets.map((set) => ({
      cardSet: set,
      expansionData: this.expansionStoreMap.get(set.expansionId) || null,
    }))

    const sortedSets = this.expansionSorter.sort(sets)

    const dto: CardSetDto[] = sortedSets.map((set) => ({
      name: set.cardSet.name,
      cardTraderExpansionId: set.cardSet.expansionId,
      symbol: set.expansionData?.symbolUrl ?? null,
    }))

    return dto
  }
}

export default GetSetsLogic
