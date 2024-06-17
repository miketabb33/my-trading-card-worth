import GetSetBlueprintsLogic from '../../../../src/server/logic/set/GetSetBlueprintsLogic'
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
    const result = await getSetBlueprintsLogic.get(null, EXPANSION_ID)
    expect(
      cardTraderAdaptor_FAKE.GET_POKEMON_SET_BLUEPRINTS
    ).toHaveBeenCalledWith(EXPANSION_ID)
    expect(result).toEqual([])
  })

  it('should return blueprints when user is not logged in', async () => {
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
    const result = await getSetBlueprintsLogic.get(null, EXPANSION_ID)

    expect(result[0]).toEqual({
      cardTraderBlueprintId: 1,
      cardTraderExpansionId: 2,
      name: 'name',
      version: 'version',
      imageUrlPreview: 'preview',
      imageUrlShow: 'show',
      owned: 0,
    })
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

    const result = await getSetBlueprintsLogic.get(USER_ID, EXPANSION_ID)

    expect(myCardCRUD_FAKE.FIND_BY_SET).toHaveBeenCalledWith(
      USER_ID,
      EXPANSION_ID
    )

    expect(result.length).toEqual(5)
    expect(result[0].owned).toEqual(0)
    expect(result[1].owned).toEqual(3)
    expect(result[2].owned).toEqual(2)
    expect(result[3].owned).toEqual(0)
    expect(result[4].owned).toEqual(1)
  })
})
