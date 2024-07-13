import { ExpansionDto } from '../../../core/types/ExpansionDto'
import { ICardTraderAdaptor } from '../../clients/CardTrader/CardTraderAdaptor'
import { ExpansionData } from '../../types/ExpansionData'
import { IExpansionSorter, SortableExpansion } from './ExpansionSorter'
export interface IGetSetsLogic {
  get: () => Promise<ExpansionDto[]>
}

class GetSetsLogic implements IGetSetsLogic {
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
    const pokemonSets = await this.cardTraderAdaptor.getPokemonSets()

    const sets: SortableExpansion[] = pokemonSets.map((set) => ({
      cardSet: set,
      expansionData: this.expansionStoreMap.get(set.expansionId) || null,
    }))

    const sortedSets = this.expansionSorter.sort(sets)

    const dto: ExpansionDto[] = sortedSets.map((set) => ({
      name: set.cardSet.name,
      expansionId: set.cardSet.expansionId,
      symbol: set.expansionData?.symbolUrl ?? null,
      slug: this.formatSlug(set.cardSet.name),
    }))

    return dto
  }

  private formatSlug = (setName: string) => {
    const withHyphens = setName.replace(' ', '-')
    const onlyNumOrChar = withHyphens.replace(/[^a-zA-Z0-9|-]/g, '')
    return onlyNumOrChar.toLowerCase()
  }
}

export default GetSetsLogic
