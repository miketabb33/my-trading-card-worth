import { SortableExpansion } from '../../../src/server/logic/set/ExpansionSorter'
import {
  CARD_SET_FOSSIL_MOCK,
  CARD_SET_MCDONALD_MOCK,
  CARD_SET_ORIGINAL_MOCK,
  CARD_SET_OTHER1_MOCK,
  CARD_SET_OTHER2_MOCK,
  CARD_SET_PLATINUM_MOCK,
  CARD_SET_POP_MOCK,
} from './cardSet.mock'
import {
  EXPANSION_DATA_FOSSIL,
  EXPANSION_DATA_MCDONALD,
  EXPANSION_DATA_ORIGINAL,
  EXPANSION_DATA_PLATINUM,
  EXPANSION_DATA_POP,
} from './expansionData.mock'

export const SORTABLE_EXPANSION_ORIGINAL_MOCK: SortableExpansion = {
  cardSet: CARD_SET_ORIGINAL_MOCK,
  expansionData: EXPANSION_DATA_ORIGINAL,
}

export const SORTABLE_EXPANSION_FOSSIL_MOCK: SortableExpansion = {
  cardSet: CARD_SET_FOSSIL_MOCK,
  expansionData: EXPANSION_DATA_FOSSIL,
}

export const SORTABLE_EXPANSION_PLATINUM_MOCK: SortableExpansion = {
  cardSet: CARD_SET_PLATINUM_MOCK,
  expansionData: EXPANSION_DATA_PLATINUM,
}

export const SORTABLE_EXPANSION_MCDONALD_MOCK: SortableExpansion = {
  cardSet: CARD_SET_MCDONALD_MOCK,
  expansionData: EXPANSION_DATA_MCDONALD,
}

export const SORTABLE_EXPANSION_POP_MOCK: SortableExpansion = {
  cardSet: CARD_SET_POP_MOCK,
  expansionData: EXPANSION_DATA_POP,
}

export const SORTABLE_EXPANSION_OTHER1_MOCK: SortableExpansion = {
  cardSet: CARD_SET_OTHER1_MOCK,
  expansionData: null,
}

export const SORTABLE_EXPANSION_OTHER2_MOCK: SortableExpansion = {
  cardSet: CARD_SET_OTHER2_MOCK,
  expansionData: null,
}
