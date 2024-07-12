import GetCardLogic from '../../../../src/server/logic/myCard/GetCardLogic'
import { BlueprintValue } from '../../../../src/server/types/BlueprintValue'
import MyCardCRUD_FAKE from '../../__FAKES__/MyCardCRUD.fake'
import { makeMyCardEntityMock } from '../../__MOCKS__/myCardEntity.mock'

describe('Add Card Logic', () => {
  let getCardLogic: GetCardLogic
  let myCardCRUD_FAKE: MyCardCRUD_FAKE

  const USER_ID = 'anyUserId'

  const minCents = 1000
  const maxCents = 2599
  const medianCents = 1534
  const averageCents = 1895

  const BLUEPRINT_VALUES = new Map<string, BlueprintValue>([
    ['1234', { minCents, maxCents, medianCents, averageCents }],
  ])

  beforeEach(() => {
    jest.clearAllMocks()
    myCardCRUD_FAKE = new MyCardCRUD_FAKE()
    getCardLogic = new GetCardLogic(myCardCRUD_FAKE)
  })

  it('should return card details', async () => {
    const blueprintId = 1234
    const expansionId = 2345
    const name = 'anyName'
    const previewUrl = 'anyPreviewUrl'
    const showUrl = 'anyShowUrl'

    myCardCRUD_FAKE.GET_ALL.mockResolvedValue([
      makeMyCardEntityMock({
        cardTrader: {
          blueprintId,
          expansionId,
        },
        name,
        imageUrlPreview: previewUrl,
        imageUrlShow: showUrl,
      }),
    ])

    const result = await getCardLogic.get(USER_ID, BLUEPRINT_VALUES)

    expect(myCardCRUD_FAKE.GET_ALL).toHaveBeenCalled()
    expect(result.length).toEqual(1)
    expect(result[0].blueprintId).toEqual(blueprintId)
    expect(result[0].expansionId).toEqual(expansionId)
    expect(result[0].name).toEqual(name)
    expect(result[0].imageUrlPreview).toEqual(previewUrl)
    expect(result[0].imageUrlShow).toEqual(showUrl)
    expect(result[0].owned).toEqual(1)
    expect(result[0].minMarketValueCents).toEqual(minCents)
    expect(result[0].maxMarketValueCents).toEqual(maxCents)
    expect(result[0].medianMarketValueCents).toEqual(medianCents)
    expect(result[0].averageMarketValueCents).toEqual(averageCents)
  })

  it('should return default values for values when blueprint cant be found', async () => {
    myCardCRUD_FAKE.GET_ALL.mockResolvedValue([makeMyCardEntityMock({})])

    const result = await getCardLogic.get(USER_ID, BLUEPRINT_VALUES)

    expect(result[0].minMarketValueCents).toEqual(-1)
    expect(result[0].maxMarketValueCents).toEqual(-1)
    expect(result[0].medianMarketValueCents).toEqual(-1)
    expect(result[0].averageMarketValueCents).toEqual(-1)
  })

  it('should return many items', async () => {
    myCardCRUD_FAKE.GET_ALL.mockResolvedValue([
      makeMyCardEntityMock({
        cardTrader: { blueprintId: 10, expansionId: 11 },
      }),
      makeMyCardEntityMock({
        cardTrader: { blueprintId: 20, expansionId: 21 },
      }),
      makeMyCardEntityMock({
        cardTrader: { blueprintId: 30, expansionId: 31 },
      }),
      makeMyCardEntityMock({
        cardTrader: { blueprintId: 40, expansionId: 41 },
      }),
      makeMyCardEntityMock({
        cardTrader: { blueprintId: 50, expansionId: 51 },
      }),
    ])

    const result = await getCardLogic.get(USER_ID, BLUEPRINT_VALUES)

    expect(result.length).toEqual(5)
  })

  it('should increment owned count and prune duplicates when duplicate blueprint ids exist', async () => {
    myCardCRUD_FAKE.GET_ALL.mockResolvedValue([
      makeMyCardEntityMock({
        cardTrader: { blueprintId: 10, expansionId: 11 },
      }),
      makeMyCardEntityMock({
        cardTrader: { blueprintId: 10, expansionId: 11 },
      }),
      makeMyCardEntityMock({
        cardTrader: { blueprintId: 10, expansionId: 11 },
      }),
      makeMyCardEntityMock({
        cardTrader: { blueprintId: 20, expansionId: 21 },
      }),
      makeMyCardEntityMock({
        cardTrader: { blueprintId: 20, expansionId: 21 },
      }),
      makeMyCardEntityMock({
        cardTrader: { blueprintId: 10, expansionId: 11 },
      }),
      makeMyCardEntityMock({
        cardTrader: { blueprintId: 30, expansionId: 31 },
      }),
    ])

    const result = await getCardLogic.get(USER_ID, BLUEPRINT_VALUES)

    expect(result.length).toEqual(3)
    expect(result[0].owned).toEqual(4)
    expect(result[1].owned).toEqual(2)
    expect(result[2].owned).toEqual(1)
  })
})
