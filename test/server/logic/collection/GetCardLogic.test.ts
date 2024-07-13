import GetCardLogic from '../../../../src/server/logic/collection/GetCardLogic'
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
    [
      '1001',
      {
        minCents: 1,
        maxCents: 2,
        averageCents: 3,
        medianCents: 4,
      },
    ],
    [
      '1002',
      {
        minCents: 10,
        maxCents: 20,
        averageCents: 30,
        medianCents: 40,
      },
    ],
    [
      '1003',
      {
        minCents: 100,
        maxCents: 200,
        averageCents: 300,
        medianCents: 400,
      },
    ],
    [
      '1004',
      {
        minCents: 1000,
        maxCents: 2000,
        averageCents: 3000,
        medianCents: 4000,
      },
    ],
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

    const { cards } = await getCardLogic.get(USER_ID, BLUEPRINT_VALUES)

    expect(myCardCRUD_FAKE.GET_ALL).toHaveBeenCalled()
    expect(cards.length).toEqual(1)
    expect(cards[0].blueprintId).toEqual(blueprintId)
    expect(cards[0].expansionId).toEqual(expansionId)
    expect(cards[0].name).toEqual(name)
    expect(cards[0].imageUrlPreview).toEqual(previewUrl)
    expect(cards[0].imageUrlShow).toEqual(showUrl)
    expect(cards[0].owned).toEqual(1)
    expect(cards[0].minMarketValueCents).toEqual(minCents)
    expect(cards[0].maxMarketValueCents).toEqual(maxCents)
    expect(cards[0].medianMarketValueCents).toEqual(medianCents)
    expect(cards[0].averageMarketValueCents).toEqual(averageCents)
  })

  it('should return default values for values when blueprint cant be found', async () => {
    myCardCRUD_FAKE.GET_ALL.mockResolvedValue([makeMyCardEntityMock({})])

    const { cards } = await getCardLogic.get(USER_ID, BLUEPRINT_VALUES)

    expect(cards[0].minMarketValueCents).toEqual(-1)
    expect(cards[0].maxMarketValueCents).toEqual(-1)
    expect(cards[0].medianMarketValueCents).toEqual(-1)
    expect(cards[0].averageMarketValueCents).toEqual(-1)
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

    const { cards } = await getCardLogic.get(USER_ID, BLUEPRINT_VALUES)

    expect(cards.length).toEqual(5)
  })

  it('should return owned amounts', async () => {
    myCardCRUD_FAKE.GET_ALL.mockResolvedValue([
      makeMyCardEntityMock({
        cardTrader: { blueprintId: 10, expansionId: 11 },
        items: [
          { condition: 0 },
          { condition: 0 },
          { condition: 0 },
          { condition: 0 },
        ],
      }),
      makeMyCardEntityMock({
        cardTrader: { blueprintId: 20, expansionId: 21 },
        items: [{ condition: 0 }, { condition: 0 }],
      }),

      makeMyCardEntityMock({
        cardTrader: { blueprintId: 30, expansionId: 31 },
        items: [{ condition: 0 }],
      }),
    ])

    const { cards } = await getCardLogic.get(USER_ID, BLUEPRINT_VALUES)

    expect(cards.length).toEqual(3)
    expect(cards[0].owned).toEqual(4)
    expect(cards[1].owned).toEqual(2)
    expect(cards[2].owned).toEqual(1)
  })
  it('should total up blueprint values for my cards', async () => {
    myCardCRUD_FAKE.GET_ALL.mockResolvedValue([
      makeMyCardEntityMock({
        cardTrader: { blueprintId: 1001, expansionId: 11 },
        items: [{ condition: 0 }],
      }),
      makeMyCardEntityMock({
        cardTrader: { blueprintId: 1002, expansionId: 21 },
        items: [{ condition: 0 }],
      }),
      makeMyCardEntityMock({
        cardTrader: { blueprintId: 1003, expansionId: 31 },
        items: [{ condition: 0 }],
      }),
      makeMyCardEntityMock({
        cardTrader: { blueprintId: 1004, expansionId: 31 },
        items: [{ condition: 0 }],
      }),
    ])
    const { details } = await getCardLogic.get(USER_ID, BLUEPRINT_VALUES)
    expect(details.minMarketValueCents).toEqual(1111)
    expect(details.maxMarketValueCents).toEqual(2222)
    expect(details.averageMarketValueCents).toEqual(3333)
    expect(details.medianMarketValueCents).toEqual(4444)
  })

  it('should total up blueprint values for a single my cards with multiple items', async () => {
    myCardCRUD_FAKE.GET_ALL.mockResolvedValue([
      makeMyCardEntityMock({
        cardTrader: { blueprintId: 1001, expansionId: 11 },
        items: [{ condition: 0 }, { condition: 0 }, { condition: 0 }],
      }),
    ])
    const { details } = await getCardLogic.get(USER_ID, BLUEPRINT_VALUES)
    expect(details.minMarketValueCents).toEqual(3)
    expect(details.maxMarketValueCents).toEqual(6)
    expect(details.averageMarketValueCents).toEqual(9)
    expect(details.medianMarketValueCents).toEqual(12)
  })

  it('should total up blueprint values for many my cards with multiple items', async () => {
    myCardCRUD_FAKE.GET_ALL.mockResolvedValue([
      makeMyCardEntityMock({
        cardTrader: { blueprintId: 1001, expansionId: 11 },
        items: [{ condition: 0 }, { condition: 0 }, { condition: 0 }],
      }),
      makeMyCardEntityMock({
        cardTrader: { blueprintId: 1002, expansionId: 11 },
        items: [{ condition: 0 }, { condition: 0 }],
      }),
    ])
    const { details } = await getCardLogic.get(USER_ID, BLUEPRINT_VALUES)
    expect(details.minMarketValueCents).toEqual(23)
    expect(details.maxMarketValueCents).toEqual(46)
    expect(details.averageMarketValueCents).toEqual(69)
    expect(details.medianMarketValueCents).toEqual(92)
  })
})
