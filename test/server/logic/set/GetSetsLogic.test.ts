import { SortableExpansion } from '../../../../src/server/logic/set/ExpansionSorter'
import GetSetsLogic from '../../../../src/server/logic/set/GetSetsLogic'
import { CardSet } from '../../../../src/server/types/CardSet'
import CardTraderAdaptor_FAKE from '../../__FAKES__/CardTraderAdaptor.fake'
import ExpansionSorter_FAKE from '../../__FAKES__/ExpansionSorter.fake'
import {
  CARD_SET_FOSSIL_MOCK,
  CARD_SET_MCDONALD_MOCK,
  CARD_SET_ORIGINAL_MOCK,
  CARD_SET_OTHER2_MOCK,
} from '../../__MOCKS__/cardSet.mock'
import { EXPANSION_STORE_MAP_MOCK } from '../../__MOCKS__/expansionStoreMap.mock'
import {
  SORTABLE_EXPANSION_FOSSIL_MOCK,
  SORTABLE_EXPANSION_MCDONALD_MOCK,
  SORTABLE_EXPANSION_ORIGINAL_MOCK,
  SORTABLE_EXPANSION_OTHER2_MOCK,
} from '../../__MOCKS__/sortableExpansion.mock'

describe('Get Sets Logic', () => {
  let getSetsLogic: GetSetsLogic
  let cardTraderAdaptor_FAKE: CardTraderAdaptor_FAKE
  let expansionSorter_FAKE: ExpansionSorter_FAKE

  beforeEach(() => {
    cardTraderAdaptor_FAKE = new CardTraderAdaptor_FAKE()
    expansionSorter_FAKE = new ExpansionSorter_FAKE()
    getSetsLogic = new GetSetsLogic(
      cardTraderAdaptor_FAKE,
      expansionSorter_FAKE,
      EXPANSION_STORE_MAP_MOCK
    )
  })

  it("should get pokemon sets and return card dto's", async () => {
    const cardSets: CardSet[] = [
      CARD_SET_ORIGINAL_MOCK,
      CARD_SET_FOSSIL_MOCK,
      CARD_SET_MCDONALD_MOCK,
      CARD_SET_OTHER2_MOCK,
    ]

    cardTraderAdaptor_FAKE.GET_POKEMON_SETS.mockResolvedValue(cardSets)

    const sortableExpansions: SortableExpansion[] = [
      SORTABLE_EXPANSION_ORIGINAL_MOCK,
      SORTABLE_EXPANSION_FOSSIL_MOCK,
      SORTABLE_EXPANSION_MCDONALD_MOCK,
      SORTABLE_EXPANSION_OTHER2_MOCK,
    ]

    expansionSorter_FAKE.SORT.mockReturnValue(sortableExpansions)

    const result = await getSetsLogic.get()

    expect(expansionSorter_FAKE.SORT).toHaveBeenCalledWith(sortableExpansions)

    expect(result.length).toEqual(4)
    expect(result[0].name).toEqual(
      SORTABLE_EXPANSION_ORIGINAL_MOCK.cardSet.name
    )
    expect(result[0].cardTraderExpansionId).toEqual(
      SORTABLE_EXPANSION_ORIGINAL_MOCK.cardSet.expansionId
    )
    expect(result[0].symbol).toEqual(
      SORTABLE_EXPANSION_ORIGINAL_MOCK.expansionData!.symbolUrl
    )

    expect(result[3].name).toEqual(SORTABLE_EXPANSION_OTHER2_MOCK.cardSet.name)
    expect(result[3].cardTraderExpansionId).toEqual(
      SORTABLE_EXPANSION_OTHER2_MOCK.cardSet.expansionId
    )
    expect(result[3].symbol).toBeNull()
  })
})
