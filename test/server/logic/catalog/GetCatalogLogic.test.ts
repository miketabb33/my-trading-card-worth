import { CardDto } from '../../../../src/core/types/CardDto'
import GetCatalogLogic from '../../../../src/server/logic/catalog/GetCatalogLogic'
import { BlueprintValue } from '../../../../src/server/types/BlueprintValue'
import { EXPANSION_DTO_1 } from '../../../core/__MOCKS__/expansionDto.mock'
import CardTraderAdaptor_FAKE from '../../__FAKES__/CardTraderAdaptor.fake'
import ExpansionPokemonRepo_FAKE from '../../__FAKES__/ExpansionPokemonRepo.fake'
import UserCardRepo_FAKE from '../../__FAKES__/UserCardRepo.fake'
import { BLUEPRINT_VALUE_MOCK } from '../../__MOCKS__/blueprintValue.mock'
import { makeCardBlueprintMock } from '../../__MOCKS__/cardBlueprint.mock'
import { makeUserCardWithBlueprintMock } from '../../__MOCKS__/userCardWithBlueprint.mock'

describe('Get Catalog Logic', () => {
  let getCatalogLogic: GetCatalogLogic
  let userCardRepo_FAKE: UserCardRepo_FAKE
  let expansionPokemonRepo_FAKE: ExpansionPokemonRepo_FAKE
  let cardTraderAdaptor_FAKE: CardTraderAdaptor_FAKE

  const BASE_SET_EXPANSION_ID = 1472
  const USER_ID = 10

  const BLUEPRINT_VALUES = new Map<string, BlueprintValue>([['1', { medianCents: 1534, listingCount: 20 }]])

  beforeEach(() => {
    userCardRepo_FAKE = new UserCardRepo_FAKE()
    cardTraderAdaptor_FAKE = new CardTraderAdaptor_FAKE()
    expansionPokemonRepo_FAKE = new ExpansionPokemonRepo_FAKE()
    getCatalogLogic = new GetCatalogLogic(userCardRepo_FAKE, cardTraderAdaptor_FAKE, expansionPokemonRepo_FAKE)

    cardTraderAdaptor_FAKE.GET_POKEMON_BLUEPRINTS.mockResolvedValue([])
    userCardRepo_FAKE.FIND_BY_EXPANSION.mockResolvedValue([])
    expansionPokemonRepo_FAKE.FIND.mockResolvedValue(EXPANSION_DTO_1)
  })

  describe('Details', () => {
    it('should return null when expansion id does not exist in expansion store', async () => {
      expansionPokemonRepo_FAKE.FIND.mockResolvedValue(null)
      const result = await getCatalogLogic.get(1, new Map<string, BlueprintValue>(), USER_ID)
      expect(result.details).toBeNull()
    })
    it('should return prices as 0 when store has no values', async () => {
      const result = await getCatalogLogic.get(BASE_SET_EXPANSION_ID, new Map<string, BlueprintValue>(), USER_ID)
      expect(result.details?.priceDetails).toEqual({
        fiftyToOneHundred: 0,
        oneHundredTwoHundred: 0,
        twoHundredPlus: 0,
        zeroToFifty: 0,
      })
    })
    it('should return price count for median price details', async () => {
      cardTraderAdaptor_FAKE.GET_POKEMON_BLUEPRINTS.mockResolvedValue([
        makeCardBlueprintMock({ blueprintId: 1 }),
        makeCardBlueprintMock({ blueprintId: 2 }),
        makeCardBlueprintMock({ blueprintId: 3 }),
        makeCardBlueprintMock({ blueprintId: 4 }),
        makeCardBlueprintMock({ blueprintId: 5 }),
        makeCardBlueprintMock({ blueprintId: 6 }),
        makeCardBlueprintMock({ blueprintId: 7 }),
        makeCardBlueprintMock({ blueprintId: 8 }),
        makeCardBlueprintMock({ blueprintId: 9 }),
        makeCardBlueprintMock({ blueprintId: 10 }),
        makeCardBlueprintMock({ blueprintId: 11 }),
      ])
      const result = await getCatalogLogic.get(
        BASE_SET_EXPANSION_ID,
        new Map<string, BlueprintValue>([
          ['1', { ...BLUEPRINT_VALUE_MOCK, medianCents: 1 }],
          ['2', { ...BLUEPRINT_VALUE_MOCK, medianCents: 5 }],
          ['3', { ...BLUEPRINT_VALUE_MOCK, medianCents: 49_99 }],
          ['4', { ...BLUEPRINT_VALUE_MOCK, medianCents: 50_00 }],
          ['5', { ...BLUEPRINT_VALUE_MOCK, medianCents: 75_88 }],
          ['6', { ...BLUEPRINT_VALUE_MOCK, medianCents: 100_00 }],
          ['7', { ...BLUEPRINT_VALUE_MOCK, medianCents: 129_83 }],
          ['8', { ...BLUEPRINT_VALUE_MOCK, medianCents: 188_22 }],
          ['9', { ...BLUEPRINT_VALUE_MOCK, medianCents: 199_99 }],
          ['10', { ...BLUEPRINT_VALUE_MOCK, medianCents: 200_00 }],
          ['11', { ...BLUEPRINT_VALUE_MOCK, medianCents: 10_032_23 }],
        ]),
        USER_ID
      )
      expect(result.details?.priceDetails.zeroToFifty).toEqual(3)
      expect(result.details?.priceDetails.fiftyToOneHundred).toEqual(2)
      expect(result.details?.priceDetails.oneHundredTwoHundred).toEqual(4)
      expect(result.details?.priceDetails.twoHundredPlus).toEqual(2)
    })
  })

  describe('Cards', () => {
    it('should return an empty array when no blueprints and user is not logged in', async () => {
      cardTraderAdaptor_FAKE.GET_POKEMON_BLUEPRINTS.mockResolvedValue([])
      const result = await getCatalogLogic.get(BASE_SET_EXPANSION_ID, BLUEPRINT_VALUES)
      expect(cardTraderAdaptor_FAKE.GET_POKEMON_BLUEPRINTS).toHaveBeenCalledWith(BASE_SET_EXPANSION_ID)
      expect(result.cards).toEqual([])
    })
    it('should return blueprints when user is not logged in', async () => {
      const blueprint1 = makeCardBlueprintMock({
        blueprintId: 1,
        expansionId: 2,
        name: 'name',
        imageUrlPreview: 'preview',
        imageUrlShow: 'show',
      })
      cardTraderAdaptor_FAKE.GET_POKEMON_BLUEPRINTS.mockResolvedValue([blueprint1])
      const result = await getCatalogLogic.get(BASE_SET_EXPANSION_ID, BLUEPRINT_VALUES)
      const expectedResult: CardDto = {
        blueprintId: 1,
        expansionId: 2,
        name: 'name',
        imageUrlPreview: 'preview',
        imageUrlShow: 'show',
        owned: 0,
        medianMarketValueCents: 1534,
        listingCount: 20,
      }
      expect(result.cards[0]).toEqual(expectedResult)
    })
    it('should return blueprints with no prices when prices are not available', async () => {
      const blueprint1 = makeCardBlueprintMock({
        blueprintId: 1,
        expansionId: 2,
        name: 'name',
        version: 'version',
        imageUrlPreview: 'preview',
        imageUrlShow: 'show',
      })
      cardTraderAdaptor_FAKE.GET_POKEMON_BLUEPRINTS.mockResolvedValue([blueprint1])
      const result = await getCatalogLogic.get(BASE_SET_EXPANSION_ID, new Map<string, BlueprintValue>())
      expect(result.cards[0].medianMarketValueCents).toEqual(-1)
    })
    it('should return blueprints with owned values when user is logged in', async () => {
      const blueprint1 = makeCardBlueprintMock({ blueprintId: 1 })
      const blueprint2 = makeCardBlueprintMock({ blueprintId: 2 })
      const blueprint3 = makeCardBlueprintMock({ blueprintId: 3 })
      const blueprint4 = makeCardBlueprintMock({ blueprintId: 4 })
      const blueprint5 = makeCardBlueprintMock({ blueprintId: 5 })
      cardTraderAdaptor_FAKE.GET_POKEMON_BLUEPRINTS.mockResolvedValue([
        blueprint1,
        blueprint2,
        blueprint3,
        blueprint4,
        blueprint5,
      ])
      userCardRepo_FAKE.FIND_BY_EXPANSION.mockResolvedValue([
        makeUserCardWithBlueprintMock({ blueprintExternalId: 2, cardBlueprintId: 2 }),
        makeUserCardWithBlueprintMock({ blueprintExternalId: 2, cardBlueprintId: 2 }),
        makeUserCardWithBlueprintMock({ blueprintExternalId: 2, cardBlueprintId: 2 }),
        makeUserCardWithBlueprintMock({ blueprintExternalId: 3, cardBlueprintId: 3 }),
        makeUserCardWithBlueprintMock({ blueprintExternalId: 3, cardBlueprintId: 3 }),
        makeUserCardWithBlueprintMock({ blueprintExternalId: 5, cardBlueprintId: 5 }),
      ])
      const result = await getCatalogLogic.get(BASE_SET_EXPANSION_ID, BLUEPRINT_VALUES, USER_ID)
      expect(userCardRepo_FAKE.FIND_BY_EXPANSION).toHaveBeenCalledWith(USER_ID, BASE_SET_EXPANSION_ID)
      expect(result.cards.length).toEqual(5)
      expect(result.cards[0].owned).toEqual(0)
      expect(result.cards[1].owned).toEqual(3)
      expect(result.cards[2].owned).toEqual(2)
      expect(result.cards[3].owned).toEqual(0)
      expect(result.cards[4].owned).toEqual(1)
    })
  })
})
