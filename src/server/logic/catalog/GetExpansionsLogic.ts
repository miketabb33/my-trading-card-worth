import { PrismaClient } from '@prisma/client'
import { ExpansionDto } from '../../../core/types/ExpansionDto'
import { ICardTraderAdaptor } from '../../clients/CardTrader/CardTraderAdaptor'
import { IExpansionPokemonRepo } from '../../repository/ExpansionPokemonRepo'
import { CardExpansion } from '../../types/CardExpansion'
import { IExpansionSorter, SortableExpansion } from './ExpansionSorter'

export interface IGetExpansionsLogic {
  get: () => Promise<ExpansionDto[]>
}

class GetExpansionsLogic implements IGetExpansionsLogic {
  private readonly prisma: PrismaClient
  private readonly cardTraderAdaptor: ICardTraderAdaptor
  private readonly expansionSorter: IExpansionSorter
  private readonly expansionPokemonRepo: IExpansionPokemonRepo

  constructor(
    prisma: PrismaClient,
    cardTraderAdaptor: ICardTraderAdaptor,
    expansionSorter: IExpansionSorter,
    expansionPokemonRepo: IExpansionPokemonRepo,
  ) {
    this.prisma = prisma
    this.cardTraderAdaptor = cardTraderAdaptor
    this.expansionSorter = expansionSorter
    this.expansionPokemonRepo = expansionPokemonRepo
  }

  get = async (): Promise<ExpansionDto[]> => {
    const pokemonExpansions = await this.cardTraderAdaptor.getPokemonExpansions()

    const sortableExpansions = await this.getSortableExpansions(pokemonExpansions)

    const record = await this.prisma.expansionPokemonOrder.findFirst()
    if (!record) throw Error('Missing expansion order')

    const expansionOrder = {
      mainSeries: record.mainSeries as string[],
      otherSeries: record.otherSeries as string[],
    }

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
        expansionEntity: await this.expansionPokemonRepo.find(cardExpansion.expansionId),
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
