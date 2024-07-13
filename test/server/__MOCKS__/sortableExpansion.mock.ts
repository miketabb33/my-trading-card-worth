import { SortableExpansion } from '../../../src/server/logic/set/ExpansionSorter'
import {
  CARD_EXPANSION_FOSSIL_MOCK,
  CARD_EXPANSION_MCDONALD_MOCK,
  CARD_EXPANSION_ORIGINAL_MOCK,
  CARD_EXPANSION_OTHER1_MOCK,
  CARD_EXPANSION_OTHER2_MOCK,
  CARD_EXPANSION_PARADOX_RIFT,
  CARD_EXPANSION_PLATINUM_MOCK,
  CARD_EXPANSION_POP_MOCK,
} from './cardExpansion.mock'
import {
  EXPANSION_DATA_FOSSIL,
  EXPANSION_DATA_MCDONALD,
  EXPANSION_DATA_ORIGINAL,
  EXPANSION_DATA_PLATINUM,
  EXPANSION_DATA_POP,
} from './expansionData.mock'

export const SORTABLE_EXPANSION_ORIGINAL_MOCK: SortableExpansion = {
  cardSet: CARD_EXPANSION_ORIGINAL_MOCK,
  expansionData: EXPANSION_DATA_ORIGINAL,
}

export const SORTABLE_EXPANSION_FOSSIL_MOCK: SortableExpansion = {
  cardSet: CARD_EXPANSION_FOSSIL_MOCK,
  expansionData: EXPANSION_DATA_FOSSIL,
}

export const SORTABLE_EXPANSION_PLATINUM_MOCK: SortableExpansion = {
  cardSet: CARD_EXPANSION_PLATINUM_MOCK,
  expansionData: EXPANSION_DATA_PLATINUM,
}

export const SORTABLE_EXPANSION_MCDONALD_MOCK: SortableExpansion = {
  cardSet: CARD_EXPANSION_MCDONALD_MOCK,
  expansionData: EXPANSION_DATA_MCDONALD,
}

export const SORTABLE_EXPANSION_POP_MOCK: SortableExpansion = {
  cardSet: CARD_EXPANSION_POP_MOCK,
  expansionData: EXPANSION_DATA_POP,
}

export const SORTABLE_EXPANSION_OTHER1_MOCK: SortableExpansion = {
  cardSet: CARD_EXPANSION_OTHER1_MOCK,
  expansionData: null,
}

export const SORTABLE_EXPANSION_OTHER2_MOCK: SortableExpansion = {
  cardSet: CARD_EXPANSION_OTHER2_MOCK,
  expansionData: null,
}

export const SORTABLE_EXPANSION_PARADOX_RIFT_MOCK: SortableExpansion = {
  cardSet: CARD_EXPANSION_PARADOX_RIFT,
  expansionData: null,
}
