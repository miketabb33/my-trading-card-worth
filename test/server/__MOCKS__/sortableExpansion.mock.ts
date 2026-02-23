import { SortableExpansion } from '../../../src/server/use-cases/catalog/ExpansionSorter'
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
  EXPANSION_ENTITY_FOSSIL,
  EXPANSION_ENTITY_MCDONALD,
  EXPANSION_ENTITY_ORIGINAL,
  EXPANSION_ENTITY_PLATINUM,
  EXPANSION_ENTITY_POP,
} from './expansionEntity.mock'

export const SORTABLE_EXPANSION_ORIGINAL_MOCK: SortableExpansion = {
  cardExpansion: CARD_EXPANSION_ORIGINAL_MOCK,
  expansionEntity: EXPANSION_ENTITY_ORIGINAL,
}

export const SORTABLE_EXPANSION_FOSSIL_MOCK: SortableExpansion = {
  cardExpansion: CARD_EXPANSION_FOSSIL_MOCK,
  expansionEntity: EXPANSION_ENTITY_FOSSIL,
}

export const SORTABLE_EXPANSION_PLATINUM_MOCK: SortableExpansion = {
  cardExpansion: CARD_EXPANSION_PLATINUM_MOCK,
  expansionEntity: EXPANSION_ENTITY_PLATINUM,
}

export const SORTABLE_EXPANSION_MCDONALD_MOCK: SortableExpansion = {
  cardExpansion: CARD_EXPANSION_MCDONALD_MOCK,
  expansionEntity: EXPANSION_ENTITY_MCDONALD,
}

export const SORTABLE_EXPANSION_POP_MOCK: SortableExpansion = {
  cardExpansion: CARD_EXPANSION_POP_MOCK,
  expansionEntity: EXPANSION_ENTITY_POP,
}

export const SORTABLE_EXPANSION_OTHER1_MOCK: SortableExpansion = {
  cardExpansion: CARD_EXPANSION_OTHER1_MOCK,
  expansionEntity: null,
}

export const SORTABLE_EXPANSION_OTHER2_MOCK: SortableExpansion = {
  cardExpansion: CARD_EXPANSION_OTHER2_MOCK,
  expansionEntity: null,
}

export const SORTABLE_EXPANSION_PARADOX_RIFT_MOCK: SortableExpansion = {
  cardExpansion: CARD_EXPANSION_PARADOX_RIFT,
  expansionEntity: null,
}
