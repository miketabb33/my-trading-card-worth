import { ExpansionDto } from '../../../core/types/ExpansionDto'
import { ICardTraderAdaptor } from '../../clients/CardTrader/CardTraderAdaptor'
import { IExpansionRepo } from '../../repository/ExpansionRepo'
import { IExpansionOrderRepo } from '../../repository/ExpansionOrderRepo'
import { CardExpansion } from '../../types/CardExpansion'
import { IExpansionSorter, SortableExpansion } from './ExpansionSorter'
export interface IGetExpansionsLogic {
  get: () => Promise<ExpansionDto[]>
}

class GetExpansionsLogic implements IGetExpansionsLogic {
  private readonly cardTraderAdaptor: ICardTraderAdaptor
  private readonly expansionSorter: IExpansionSorter
  private readonly expansionRepo: IExpansionRepo
  private readonly expansionOrderRepo: IExpansionOrderRepo

  constructor(
    cardTraderAdaptor: ICardTraderAdaptor,
    expansionSorter: IExpansionSorter,
    expansionStoreMap: IExpansionRepo,
    expansionOrderRepo: IExpansionOrderRepo
  ) {
    this.cardTraderAdaptor = cardTraderAdaptor
    this.expansionSorter = expansionSorter
    this.expansionRepo = expansionStoreMap
    this.expansionOrderRepo = expansionOrderRepo
  }

  get = async (): Promise<ExpansionDto[]> => {
    const pokemonExpansions = await this.cardTraderAdaptor.getPokemonExpansions()

    const sortableExpansions = await this.getSortableExpansions(pokemonExpansions)

    const expansionOrder = await this.expansionOrderRepo.get()

    if (!expansionOrder) throw Error('Missing expansion order')

    const sortedExpansions = this.expansionSorter.sort(sortableExpansions, expansionOrder)

    const expansionDto: ExpansionDto[] = sortedExpansions.map((sortedExpansion) => ({
      name: sortedExpansion.cardExpansion.name,
      expansionId: sortedExpansion.cardExpansion.expansionId,
      symbol: sortedExpansion.expansionEntity?.symbolUrl ?? null,
      slug: this.formatSlug(sortedExpansion.cardExpansion.name),
    }))

    return expansionDto
  }

  private getSortableExpansions = async (pokemonExpansions: CardExpansion[]) => {
    const sortableExpansions: SortableExpansion[] = []

    for (let i = 0; i < pokemonExpansions.length; i++) {
      const cardExpansion = pokemonExpansions[i]
      const sortableExpansion: SortableExpansion = {
        cardExpansion,
        expansionEntity: await this.expansionRepo.find(cardExpansion.expansionId),
      }
      sortableExpansions.push(sortableExpansion)
    }

    return sortableExpansions
  }

  private formatSlug = (expansionName: string) => {
    const withHyphens = expansionName.replace(' ', '-')
    const onlyNumOrChar = withHyphens.replace(/[^a-zA-Z0-9|-]/g, '')
    return onlyNumOrChar.toLowerCase()
  }
}

export default GetExpansionsLogic
