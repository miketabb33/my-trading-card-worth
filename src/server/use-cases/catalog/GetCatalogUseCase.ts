import { CatalogDto, ExpansionDetailsDto, ExpansionPriceDetailsDto } from '@core/network-types/catalog'
import { CardDto } from '@core/network-types/card'
import { IUserCardRepo } from '../../repository/UserCardRepo'
import { BlueprintValue } from '../../types/BlueprintValue'
import { ExpansionPokemonEntity, IExpansionPokemonRepo } from '../../repository/ExpansionPokemonRepo'
import { IPokemonCardFactory } from '@domain/PokemonCardFactory'
import UserCardStack from '@domain/UserCardStack'
import { Result } from '@use-cases/Result'

class GetCatalogUseCase {
  private readonly userCardRepo: IUserCardRepo
  private readonly expansionPokemonRepo: IExpansionPokemonRepo
  private readonly pokemonCardFactory: IPokemonCardFactory

  constructor(
    userCardRepo: IUserCardRepo,
    expansionPokemonRepo: IExpansionPokemonRepo,
    pokemonCardFactory: IPokemonCardFactory
  ) {
    this.userCardRepo = userCardRepo
    this.expansionPokemonRepo = expansionPokemonRepo
    this.pokemonCardFactory = pokemonCardFactory
  }

  call = async (
    expansionId: number,
    blueprintValues: Map<string, BlueprintValue>,
    userId?: number
  ): Promise<Result<CatalogDto>> => {
    const [postgresCards, expansion] = await Promise.all([
      this.pokemonCardFactory.fromPostgres(expansionId),
      this.expansionPokemonRepo.find(expansionId),
    ])

    const pokemonCards =
      postgresCards.length > 0 ? postgresCards : await this.pokemonCardFactory.fromCardTrader(expansionId)

    let userCardStack: UserCardStack | undefined

    if (userId) {
      const userCards = await this.userCardRepo.listByExpansion(userId, expansionId)
      userCardStack = new UserCardStack(userCards)
    }

    const cards = pokemonCards.map((c) => c.toCardDto(blueprintValues, userCardStack))
    let details: ExpansionDetailsDto | null = null

    if (expansion) {
      const priceDetails = this.buildExpansionPriceDetails(cards)
      details = this.buildExpansionMainDetailsDto(expansion, priceDetails)
    }

    return Result.success({ details, cards })
  }

  private buildExpansionMainDetailsDto = (
    expansion: ExpansionPokemonEntity,
    priceDetails: ExpansionPriceDetailsDto
  ): ExpansionDetailsDto | null => {
    const release = new Date(expansion.releaseDate)

    return {
      name: expansion.name,
      expansionNumber: expansion.expansionNumberInSeries,
      series: expansion.series,
      cardCount: expansion.numberOfCards,
      secretCardCount: expansion.numberOfSecretCards,
      releaseDate: release.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
      logoUrl: expansion.logoUrl,
      symbolUrl: expansion.symbolUrl,
      bulbapediaUrl: expansion.bulbapediaUrl,
      priceDetails,
    }
  }

  private buildExpansionPriceDetails = (cards: CardDto[]): ExpansionPriceDetailsDto => {
    return cards.reduce(
      (acc, { medianMarketValueCents: v }) => {
        if (v >= 1 && v <= 49_99) acc.zeroToFifty++
        else if (v <= 99_99) acc.fiftyToOneHundred++
        else if (v <= 199_99) acc.oneHundredTwoHundred++
        else if (v >= 200_00) acc.twoHundredPlus++
        return acc
      },
      { zeroToFifty: 0, fiftyToOneHundred: 0, oneHundredTwoHundred: 0, twoHundredPlus: 0 }
    )
  }
}

export default GetCatalogUseCase
