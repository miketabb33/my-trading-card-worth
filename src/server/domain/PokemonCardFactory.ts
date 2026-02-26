import { ICardTraderAdaptor } from '../clients/CardTrader/CardTraderAdaptor'
import { ICardBlueprintPokemonRepo } from '../repository/CardBlueprintPokemonRepo'
import PokemonCard from './PokemonCard'

export interface IPokemonCardFactory {
  fromPostgres: (cardTraderExpansionId: number) => Promise<PokemonCard[]>
  fromCardTrader: (cardTraderExpansionId: number) => Promise<PokemonCard[]>
}

class PokemonCardFactory implements IPokemonCardFactory {
  private readonly cardBlueprintPokemonRepo: ICardBlueprintPokemonRepo
  private readonly cardTraderAdaptor: ICardTraderAdaptor

  constructor(cardBlueprintPokemonRepo: ICardBlueprintPokemonRepo, cardTraderAdaptor: ICardTraderAdaptor) {
    this.cardBlueprintPokemonRepo = cardBlueprintPokemonRepo
    this.cardTraderAdaptor = cardTraderAdaptor
  }

  fromPostgres = async (cardTraderExpansionId: number): Promise<PokemonCard[]> => {
    const blueprints = await this.cardBlueprintPokemonRepo.listByExpansion(cardTraderExpansionId)
    return blueprints.map((b) => {
      const link = b.platformLinks.find((l) => l.platform === 'CARD_TRADER')
      return new PokemonCard({
        blueprintId: Number(link?.externalId ?? 0),
        expansionId: cardTraderExpansionId,
        name: b.name,
        collectorNumber: b.collectorNumber,
        pokemonRarity: b.pokemonCardBlueprint?.rarity ?? '',
        imageUrlPreview: b.imagePreviewUrl,
        imageUrlShow: b.imageShowUrl,
      })
    })
  }

  fromCardTrader = async (cardTraderExpansionId: number): Promise<PokemonCard[]> => {
    const blueprints = await this.cardTraderAdaptor.getPokemonBlueprints(cardTraderExpansionId)
    return blueprints.map(
      (b) =>
        new PokemonCard({
          blueprintId: b.blueprintId,
          expansionId: b.expansionId,
          name: b.name,
          collectorNumber: b.collectorNumber,
          pokemonRarity: b.pokemonRarity,
          imageUrlPreview: b.imageUrlPreview,
          imageUrlShow: b.imageUrlShow,
        })
    )
  }
}

export default PokemonCardFactory
