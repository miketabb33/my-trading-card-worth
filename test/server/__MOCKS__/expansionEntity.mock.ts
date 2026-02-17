import { ExpansionEntity } from '../../../src/server/repository/ExpansionRepo'

export const EXPANSION_ENTITY_ORIGINAL: ExpansionEntity = {
  id: 1,
  name: 'Base Set',
  expansionNumberInSeries: 1,
  series: 'Original Series',
  expansionType: 'Main Series Expansion',
  numberOfCards: 102,
  numberOfSecretCards: 0,
  releaseDate: new Date(1999, 1, 9),
  abbreviation: 'BS',
  symbolUrl: null,
  logoUrl:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/269px-International_Pok%C3%A9mon_logo.svg.png',
  bulbapediaUrl: 'https://bulbapedia.bulbagarden.net/wiki/Base_Set_(TCG)',
  cardTraderExpansionId: 0,
  createdAt: new Date(2024, 1, 9),
  updatedAt: new Date(2024, 1, 9),
}

export const EXPANSION_ENTITY_FOSSIL: ExpansionEntity = {
  id: 2,
  name: 'Fossil',
  expansionNumberInSeries: 3,
  series: 'Original Series',
  expansionType: 'Main Series Expansion',
  numberOfCards: 62,
  numberOfSecretCards: 0,
  releaseDate: new Date(1999, 10, 10),
  abbreviation: 'FO',
  bulbapediaUrl: 'https://bulbapedia.bulbagarden.net/wiki/Fossil_(TCG)',
  symbolUrl: 'https://archives.bulbagarden.net/media/upload/thumb/e/e6/SetSymbolFossil.png/40px-SetSymbolFossil.png',
  logoUrl: 'https://archives.bulbagarden.net/media/upload/thumb/7/7f/Fossil_Logo.png/90px-Fossil_Logo.png',
  cardTraderExpansionId: 0,
  createdAt: new Date(2024, 1, 9),
  updatedAt: new Date(2024, 1, 9),
}

export const EXPANSION_ENTITY_PLATINUM: ExpansionEntity = {
  id: 3,
  name: 'Platinum',
  expansionNumberInSeries: 1,
  series: 'Platinum Series',
  expansionType: 'Main Series Expansion',
  numberOfCards: 127,
  numberOfSecretCards: 3,
  releaseDate: new Date(2009, 2, 11),
  abbreviation: 'PL',
  bulbapediaUrl: 'https://bulbapedia.bulbagarden.net/wiki/Platinum_(TCG)',
  symbolUrl:
    'https://archives.bulbagarden.net/media/upload/thumb/7/7c/SetSymbolPlatinum.png/40px-SetSymbolPlatinum.png',
  logoUrl: 'https://archives.bulbagarden.net/media/upload/thumb/4/47/PL1_Logo_EN.png/150px-PL1_Logo_EN.png',
  cardTraderExpansionId: 0,
  createdAt: new Date(2024, 1, 9),
  updatedAt: new Date(2024, 1, 9),
}

export const EXPANSION_ENTITY_MCDONALD: ExpansionEntity = {
  id: 4,
  name: "McDonald's Collection 2014",
  expansionNumberInSeries: 4,
  series: "McDonald's Collection",
  expansionType: 'Other Expansion',
  numberOfCards: 12,
  numberOfSecretCards: 0,
  releaseDate: new Date(2014, 5, 23),
  abbreviation: 'MCD14',
  bulbapediaUrl: 'https://bulbapedia.bulbagarden.net/wiki/McDonald%27s_Collection_2014_(TCG)',
  symbolUrl:
    'https://archives.bulbagarden.net/media/upload/thumb/e/ee/SetSymbolMcDonalds_Collection_2014.png/40px-SetSymbolMcDonalds_Collection_2014.png',
  logoUrl: null,
  cardTraderExpansionId: 0,
  createdAt: new Date(2024, 1, 9),
  updatedAt: new Date(2024, 1, 9),
}

export const EXPANSION_ENTITY_POP: ExpansionEntity = {
  id: 5,
  name: 'POP Series 3',
  expansionNumberInSeries: 3,
  series: 'Pop / Play! Pokemon Prize Packs',
  expansionType: 'Other Expansion',
  numberOfCards: 17,
  numberOfSecretCards: 0,
  releaseDate: new Date(2006, 4, 1),
  abbreviation: 'POP3',
  bulbapediaUrl: 'https://bulbapedia.bulbagarden.net/wiki/POP_Series_3_(TCG)',
  symbolUrl:
    'https://archives.bulbagarden.net/media/upload/thumb/4/4c/SetSymbolPOP_Series_3.png/40px-SetSymbolPOP_Series_3.png',
  logoUrl: null,
  cardTraderExpansionId: 0,
  createdAt: new Date(2024, 1, 9),
  updatedAt: new Date(2024, 1, 9),
}
