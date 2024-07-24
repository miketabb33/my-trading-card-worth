import { ExpansionDto } from '../../../src/core/types/ExpansionDto'

export const EXPANSION_DTO_1: ExpansionDto = {
  expansionId: 1469,
  name: 'Pokémon Products',
  symbol: '',
  slug: 'slug-1',
}
export const EXPANSION_DTO_2: ExpansionDto = {
  expansionId: 1470,
  name: 'Miscellaneous Promos',
  symbol: '',
  slug: 'slug-2',
}
export const EXPANSION_DTO_3: ExpansionDto = {
  expansionId: 1471,
  name: 'League Promos',
  symbol: '',
  slug: '',
}
export const EXPANSION_DTO_4: ExpansionDto = {
  expansionId: 1472,
  name: 'Base Set',
  symbol: '',
  slug: '',
}
export const EXPANSION_DTO_5: ExpansionDto = {
  expansionId: 1473,
  name: 'Jungle',
  symbol: '',
  slug: '',
}
export const EXPANSION_DTO_6: ExpansionDto = {
  expansionId: 1474,
  name: 'Wizards Black Star Promos',
  symbol: '',
  slug: '',
}
export const EXPANSION_DTO_7: ExpansionDto = {
  expansionId: 1475,
  name: 'W Promos',
  symbol: '',
  slug: '',
}
export const EXPANSION_DTO_8: ExpansionDto = {
  expansionId: 1476,
  name: 'Fossil',
  symbol: '',
  slug: '',
}

export const EXPANSION_DTO_ARRAY = [
  EXPANSION_DTO_1,
  EXPANSION_DTO_2,
  EXPANSION_DTO_3,
  EXPANSION_DTO_4,
  EXPANSION_DTO_5,
  EXPANSION_DTO_6,
  EXPANSION_DTO_7,
  EXPANSION_DTO_8,
]

type MakeExpansionDtoArgs = {
  expansionId?: number
  name?: string
  symbol?: string
  slug?: string
}

export const makeExpansionDto = ({
  expansionId = 0,
  name = '',
  symbol = '',
  slug = '',
}: MakeExpansionDtoArgs) => {
  const dto: ExpansionDto = {
    expansionId,
    name,
    symbol,
    slug,
  }

  return dto
}
