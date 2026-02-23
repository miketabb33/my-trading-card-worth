import GetBlueprintValueUseCase from '../../../../src/server/use-cases/price/GetBlueprintValueUseCase'
import { CardValue } from '../../../../src/server/types/CardValue'
import CardTraderAdaptor_FAKE from '../../__FAKES__/CardTraderAdaptor.fake'
import { makeCardValueMock } from '../../__MOCKS__/cardValue.mock'

describe('Get Expansion Blueprint Value UseCase', () => {
  const EXPANSION_ID = 1234
  let cardTraderAdaptor_FAKE: CardTraderAdaptor_FAKE
  let getBlueprintValueUseCase: GetBlueprintValueUseCase

  beforeEach(() => {
    cardTraderAdaptor_FAKE = new CardTraderAdaptor_FAKE()
    getBlueprintValueUseCase = new GetBlueprintValueUseCase(cardTraderAdaptor_FAKE)
  })

  it('should get results from map', async () => {
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
    cardTraderAdaptor_FAKE.GET_POKEMON_CARD_VALUES.mockResolvedValue(cardValueMap)

    const blueprintValueMap = await getBlueprintValueUseCase.call(EXPANSION_ID)

    expect(cardTraderAdaptor_FAKE.GET_POKEMON_CARD_VALUES).toHaveBeenCalledWith(EXPANSION_ID)

    expect(blueprintValueMap.value.size).toEqual(2)
    expect(blueprintValueMap.value.get('1')!.medianCents).toEqual(4)
    expect(blueprintValueMap.value.get('1')!.listingCount).toEqual(6)

    expect(blueprintValueMap.value.get('2')!.medianCents).toEqual(30475)
    expect(blueprintValueMap.value.get('2')!.listingCount).toEqual(6)
  })
})
