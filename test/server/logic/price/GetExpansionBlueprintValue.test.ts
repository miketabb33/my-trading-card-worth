import GetExpansionBlueprintValueLogic from '../../../../src/server/logic/price/GetExpansionBlueprintValueLogic'
import { BlueprintValue } from '../../../../src/server/types/BlueprintValue'
import { CardValue } from '../../../../src/server/types/CardValue'
import CardTraderAdaptor_FAKE from '../../__FAKES__/CardTraderAdaptor.fake'
import { makeCardValueMock } from '../../__MOCKS__/cardValue.mock'

describe('Get Expansion Blueprint Value Logic', () => {
  const EXPANSION_ID = 1234
  let cardTraderAdaptor_FAKE: CardTraderAdaptor_FAKE
  let getExpansionBlueprintValueLogic: GetExpansionBlueprintValueLogic
  let blueprintValueMap: Map<string, BlueprintValue>

  beforeEach(() => {
    blueprintValueMap = new Map<string, BlueprintValue>()
    cardTraderAdaptor_FAKE = new CardTraderAdaptor_FAKE()
    getExpansionBlueprintValueLogic = new GetExpansionBlueprintValueLogic(
      cardTraderAdaptor_FAKE
    )
  })

  it('should add results to map', async () => {
    const cardValueMap = new Map<string, CardValue[]>([
      [
        '1',
        [
          makeCardValueMock({ priceCents: 1 }),
          makeCardValueMock({ priceCents: 2 }),
          makeCardValueMock({ priceCents: 3 }),
          makeCardValueMock({ priceCents: 4 }),
          makeCardValueMock({ priceCents: 5 }),
          makeCardValueMock({ priceCents: 6 }),
        ],
      ],
      [
        '2',
        [
          makeCardValueMock({ priceCents: 10304 }),
          makeCardValueMock({ priceCents: 20353 }),
          makeCardValueMock({ priceCents: 40596 }),
          makeCardValueMock({ priceCents: 100023 }),
          makeCardValueMock({ priceCents: 93924 }),
          makeCardValueMock({ priceCents: 13 }),
        ],
      ],
    ])
    cardTraderAdaptor_FAKE.GET_POKEMON_CARD_VALUES.mockResolvedValue(
      cardValueMap
    )

    await getExpansionBlueprintValueLogic.add(EXPANSION_ID, blueprintValueMap)

    expect(cardTraderAdaptor_FAKE.GET_POKEMON_CARD_VALUES).toHaveBeenCalledWith(
      EXPANSION_ID
    )

    expect(blueprintValueMap.size).toEqual(2)
    expect(blueprintValueMap.get('1')!.minCents).toEqual(1)
    expect(blueprintValueMap.get('1')!.maxCents).toEqual(6)
    expect(blueprintValueMap.get('1')!.averageCents).toEqual(4)
    expect(blueprintValueMap.get('1')!.medianCents).toEqual(4)

    expect(blueprintValueMap.get('2')!.minCents).toEqual(13)
    expect(blueprintValueMap.get('2')!.maxCents).toEqual(100023)
    expect(blueprintValueMap.get('2')!.averageCents).toEqual(44202)
    expect(blueprintValueMap.get('2')!.medianCents).toEqual(30475)
  })
})
