import GetSetBlueprintsLogic from '../../../../src/server/logic/set/GetSetBlueprintsLogic'
import { BlueprintValue } from '../../../../src/server/types/BlueprintValue'
import CardTraderAdaptor_FAKE from '../../__FAKES__/CardTraderAdaptor.fake'
import MyCardCRUD_FAKE from '../../__FAKES__/MyCardCRUD.fake'
import { makeCardBlueprintMock } from '../../__MOCKS__/cardBlueprint.mock'
import { makeMyCardEntityMock } from '../../__MOCKS__/myCardEntity.mock'

describe('Get Set Blueprints Logic', () => {
  let getSetBlueprintsLogic: GetSetBlueprintsLogic
  let myCardCRUD_FAKE: MyCardCRUD_FAKE
  let cardTraderAdaptor_FAKE: CardTraderAdaptor_FAKE

  const EXPANSION_ID = 15
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
    getSetBlueprintsLogic = new GetSetBlueprintsLogic(
      myCardCRUD_FAKE,
      cardTraderAdaptor_FAKE
    )
  })

  it('should return an empty array when no blueprints and user is not logged in', async () => {
    cardTraderAdaptor_FAKE.GET_POKEMON_SET_BLUEPRINTS.mockResolvedValue([])
    const result = await getSetBlueprintsLogic.get(
      null,
      EXPANSION_ID,
      BLUEPRINT_VALUES
    )
    expect(
      cardTraderAdaptor_FAKE.GET_POKEMON_SET_BLUEPRINTS
    ).toHaveBeenCalledWith(EXPANSION_ID)
    expect(result.blueprints).toEqual([])
  })

  it('should return blueprints when user is not logged in', async () => {
    const blueprint1 = makeCardBlueprintMock({
      blueprintId: 1,
      expansionId: 2,
      name: 'name',
      imageUrlPreview: 'preview',
      imageUrlShow: 'show',
    })

    cardTraderAdaptor_FAKE.GET_POKEMON_SET_BLUEPRINTS.mockResolvedValue([
      blueprint1,
    ])
    const result = await getSetBlueprintsLogic.get(
      null,
      EXPANSION_ID,
      BLUEPRINT_VALUES
    )

    expect(result.blueprints[0]).toEqual({
      blueprintId: 1,
      expansionId: 2,
      name: 'name',
      imageUrlPreview: 'preview',
      imageUrlShow: 'show',
      owned: 0,
      minMarketValueCents: 1000,
      maxMarketValueCents: 2599,
      averageMarketValueCents: 1895,
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

    cardTraderAdaptor_FAKE.GET_POKEMON_SET_BLUEPRINTS.mockResolvedValue([
      blueprint1,
    ])
    const result = await getSetBlueprintsLogic.get(
      null,
      EXPANSION_ID,
      new Map<string, BlueprintValue>()
    )

    expect(result.blueprints[0].minMarketValueCents).toEqual(-1)
    expect(result.blueprints[0].maxMarketValueCents).toEqual(-1)
    expect(result.blueprints[0].averageMarketValueCents).toEqual(-1)
    expect(result.blueprints[0].medianMarketValueCents).toEqual(-1)
  })

  it('should return blueprints with owned values when user is logged in', async () => {
    const blueprint1 = makeCardBlueprintMock({ blueprintId: 1 })
    const blueprint2 = makeCardBlueprintMock({ blueprintId: 2 })
    const blueprint3 = makeCardBlueprintMock({ blueprintId: 3 })
    const blueprint4 = makeCardBlueprintMock({ blueprintId: 4 })
    const blueprint5 = makeCardBlueprintMock({ blueprintId: 5 })

    cardTraderAdaptor_FAKE.GET_POKEMON_SET_BLUEPRINTS.mockResolvedValue([
      blueprint1,
      blueprint2,
      blueprint3,
      blueprint4,
      blueprint5,
    ])

    const myCardEntity1 = makeMyCardEntityMock({
      cardTrader: { blueprintId: 2 },
    })
    const myCardEntity2 = makeMyCardEntityMock({
      cardTrader: { blueprintId: 2 },
    })
    const myCardEntity3 = makeMyCardEntityMock({
      cardTrader: { blueprintId: 2 },
    })
    const myCardEntity4 = makeMyCardEntityMock({
      cardTrader: { blueprintId: 3 },
    })
    const myCardEntity5 = makeMyCardEntityMock({
      cardTrader: { blueprintId: 3 },
    })
    const myCardEntity6 = makeMyCardEntityMock({
      cardTrader: { blueprintId: 5 },
    })

    myCardCRUD_FAKE.FIND_BY_SET.mockResolvedValue([
      myCardEntity1,
      myCardEntity2,
      myCardEntity3,
      myCardEntity4,
      myCardEntity5,
      myCardEntity6,
    ])

    const result = await getSetBlueprintsLogic.get(
      USER_ID,
      EXPANSION_ID,
      BLUEPRINT_VALUES
    )

    expect(myCardCRUD_FAKE.FIND_BY_SET).toHaveBeenCalledWith(
      USER_ID,
      EXPANSION_ID
    )

    expect(result.blueprints.length).toEqual(5)
    expect(result.blueprints[0].owned).toEqual(0)
    expect(result.blueprints[1].owned).toEqual(3)
    expect(result.blueprints[2].owned).toEqual(2)
    expect(result.blueprints[3].owned).toEqual(0)
    expect(result.blueprints[4].owned).toEqual(1)
  })
})
