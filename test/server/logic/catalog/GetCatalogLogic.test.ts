import GetCatalogLogic from '../../../../src/server/logic/catalog/GetCatalogLogic'
import { BlueprintValue } from '../../../../src/server/types/BlueprintValue'
import CardTraderAdaptor_FAKE from '../../__FAKES__/CardTraderAdaptor.fake'
import MyCardCRUD_FAKE from '../../__FAKES__/MyCardCRUD.fake'
import { BLUEPRINT_VALUE_MOCK } from '../../__MOCKS__/blueprintValue.mock'
import { makeCardBlueprintMock } from '../../__MOCKS__/cardBlueprint.mock'
import { makeMyCardEntityMock } from '../../__MOCKS__/myCardEntity.mock'

describe('Get Catalog Logic', () => {
  let getCatalogLogic: GetCatalogLogic
  let myCardCRUD_FAKE: MyCardCRUD_FAKE
  let cardTraderAdaptor_FAKE: CardTraderAdaptor_FAKE

  const BASE_SET_EXPANSION_ID = 1472
  const USER_ID = '10'

  const BLUEPRINT_VALUES = new Map<string, BlueprintValue>([
    [
      '1',
      { minCents: 1000, maxCents: 2599, medianCents: 1534, averageCents: 1895 },
    ],
  ])

  beforeEach(() => {
    myCardCRUD_FAKE = new MyCardCRUD_FAKE()
    cardTraderAdaptor_FAKE = new CardTraderAdaptor_FAKE()
    getCatalogLogic = new GetCatalogLogic(
      myCardCRUD_FAKE,
      cardTraderAdaptor_FAKE
    )

    cardTraderAdaptor_FAKE.GET_POKEMON_BLUEPRINTS.mockResolvedValue([])
    myCardCRUD_FAKE.FIND_BY_EXPANSION.mockResolvedValue([])
  })

  describe('Details', () => {
    it('should return null when expansion id does not exist in expansion store', async () => {
      const result = await getCatalogLogic.get(
        USER_ID,
        1,
        new Map<string, BlueprintValue>()
      )
      expect(result.details).toBeNull()
    })
    it('should return prices as 0 when store has no values', async () => {
      const result = await getCatalogLogic.get(
        USER_ID,
        BASE_SET_EXPANSION_ID,
        new Map<string, BlueprintValue>()
      )
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
        USER_ID,
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
        ])
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
      const result = await getCatalogLogic.get(
        null,
        BASE_SET_EXPANSION_ID,
        BLUEPRINT_VALUES
      )
      expect(
        cardTraderAdaptor_FAKE.GET_POKEMON_BLUEPRINTS
      ).toHaveBeenCalledWith(BASE_SET_EXPANSION_ID)
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

      cardTraderAdaptor_FAKE.GET_POKEMON_BLUEPRINTS.mockResolvedValue([
        blueprint1,
      ])
      const result = await getCatalogLogic.get(
        null,
        BASE_SET_EXPANSION_ID,
        BLUEPRINT_VALUES
      )

      expect(result.cards[0]).toEqual({
        blueprintId: 1,
        expansionId: 2,
        name: 'name',
        imageUrlPreview: 'preview',
        imageUrlShow: 'show',
        owned: 0,
        medianMarketValueCents: 1534,
      })
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

      cardTraderAdaptor_FAKE.GET_POKEMON_BLUEPRINTS.mockResolvedValue([
        blueprint1,
      ])
      const result = await getCatalogLogic.get(
        null,
        BASE_SET_EXPANSION_ID,
        new Map<string, BlueprintValue>()
      )

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

      const myCardEntity1 = makeMyCardEntityMock({
        cardTrader: { blueprintId: 2 },
        items: [{ condition: 0 }, { condition: 0 }, { condition: 0 }],
      })

      const myCardEntity2 = makeMyCardEntityMock({
        cardTrader: { blueprintId: 3 },
        items: [{ condition: 0 }, { condition: 0 }],
      })

      const myCardEntity3 = makeMyCardEntityMock({
        cardTrader: { blueprintId: 5 },
        items: [{ condition: 0 }],
      })

      myCardCRUD_FAKE.FIND_BY_EXPANSION.mockResolvedValue([
        myCardEntity1,
        myCardEntity2,
        myCardEntity3,
      ])

      const result = await getCatalogLogic.get(
        USER_ID,
        BASE_SET_EXPANSION_ID,
        BLUEPRINT_VALUES
      )

      expect(myCardCRUD_FAKE.FIND_BY_EXPANSION).toHaveBeenCalledWith(
        USER_ID,
        BASE_SET_EXPANSION_ID
      )

      expect(result.cards.length).toEqual(5)
      expect(result.cards[0].owned).toEqual(0)
      expect(result.cards[1].owned).toEqual(3)
      expect(result.cards[2].owned).toEqual(2)
      expect(result.cards[3].owned).toEqual(0)
      expect(result.cards[4].owned).toEqual(1)
    })
  })
})
