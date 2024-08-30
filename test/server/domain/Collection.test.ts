import Collection from '../../../src/server/domain/Collection'
import { BlueprintValue } from '../../../src/server/types/BlueprintValue'
import { makeMyCardEntityMock } from '../__MOCKS__/myCardEntity.mock'

describe('Collection', () => {
  const MEDIAN_CENTS = 1534
  const BLUEPRINT_VALUES = new Map<string, BlueprintValue>([
    ['1234', { medianCents: MEDIAN_CENTS, listingCount: 25 }],
    [
      '1001',
      {
        medianCents: 4,
        listingCount: 25,
      },
    ],
    [
      '1002',
      {
        medianCents: 40,
        listingCount: 25,
      },
    ],
    [
      '1003',
      {
        medianCents: 400,
        listingCount: 25,
      },
    ],
    [
      '1004',
      {
        medianCents: 4000,
        listingCount: 25,
      },
    ],
  ])

  it('should return card details', () => {
    const blueprintId = 1234
    const expansionId = 2345
    const name = 'anyName'
    const previewUrl = 'anyPreviewUrl'
    const showUrl = 'anyShowUrl'

    const cardsEntities = makeMyCardEntityMock({
      cardTrader: {
        blueprintId,
        expansionId,
      },
      name,
      imageUrlPreview: previewUrl,
      imageUrlShow: showUrl,
    })

    const collection = new Collection([cardsEntities], BLUEPRINT_VALUES)
    const cards = collection.cards()

    expect(cards.length).toEqual(1)
    expect(cards[0].blueprintId).toEqual(blueprintId)
    expect(cards[0].expansionId).toEqual(expansionId)
    expect(cards[0].name).toEqual(name)
    expect(cards[0].imageUrlPreview).toEqual(previewUrl)
    expect(cards[0].imageUrlShow).toEqual(showUrl)
    expect(cards[0].owned).toEqual(1)
    expect(cards[0].medianMarketValueCents).toEqual(MEDIAN_CENTS)
    expect(cards[0].listingCount).toEqual(25)
  })

  it('should return default values for values when blueprint cant be found', () => {
    const collection = new Collection(
      [makeMyCardEntityMock({})],
      BLUEPRINT_VALUES
    )
    const cards = collection.cards()

    expect(cards[0].medianMarketValueCents).toEqual(-1)
  })

  it('should return many items', () => {
    const cardEntities = [
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
    ]
    const collection = new Collection(cardEntities, BLUEPRINT_VALUES)
    const cards = collection.cards()
    expect(cards.length).toEqual(5)
  })

  it('should return owned amounts', () => {
    const cardEntities = [
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
    ]
    const collection = new Collection(cardEntities, BLUEPRINT_VALUES)
    const cards = collection.cards()

    expect(cards.length).toEqual(3)
    expect(cards[0].owned).toEqual(4)
    expect(cards[1].owned).toEqual(2)
    expect(cards[2].owned).toEqual(1)
  })

  it('should total up blueprint values for my cards', () => {
    const cardEntities = [
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
    ]

    const collection = new Collection(cardEntities, BLUEPRINT_VALUES)
    const details = collection.details()

    expect(details.medianMarketValueCents).toEqual(4444)
  })

  it('should total up blueprint values for a single my cards with multiple items', () => {
    const cardEntities = [
      makeMyCardEntityMock({
        cardTrader: { blueprintId: 1001, expansionId: 11 },
        items: [{ condition: 0 }, { condition: 0 }, { condition: 0 }],
      }),
    ]
    const collection = new Collection(cardEntities, BLUEPRINT_VALUES)
    const details = collection.details()

    expect(details.medianMarketValueCents).toEqual(12)
  })

  it('should total up blueprint values for many my cards with multiple items', () => {
    const cardEntities = [
      makeMyCardEntityMock({
        cardTrader: { blueprintId: 1001, expansionId: 11 },
        items: [{ condition: 0 }, { condition: 0 }, { condition: 0 }],
      }),
      makeMyCardEntityMock({
        cardTrader: { blueprintId: 1002, expansionId: 11 },
        items: [{ condition: 0 }, { condition: 0 }],
      }),
    ]
    const collection = new Collection(cardEntities, BLUEPRINT_VALUES)
    const details = collection.details()

    expect(details.medianMarketValueCents).toEqual(92)
  })
})
