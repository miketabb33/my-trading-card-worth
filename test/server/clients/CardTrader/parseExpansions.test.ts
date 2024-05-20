import { tryToParseExpansions } from '../../../../src/server/clients/CardTrader/parseExpansions'

const unknownData = [
  {
    id: 1,
    game_id: 1,
    code: 'gnt',
    name: 'Game Night',
  },
  {
    id: 3,
    game_id: 1,
    code: 'pgrn',
    name: 'Guilds of Ravnica Promos',
  },
  {
    id: 4,
    game_id: 1,
    code: 'gk1',
    name: 'GRN Guild Kit',
  },
]

describe('Try To Parse Expansion', () => {
  it('should throw when root is not array', () => {
    expect(() => tryToParseExpansions('not Array')).toThrow()
  })

  it('should throw when array is missing properties', () => {
    expect(() => tryToParseExpansions([{ id: '' }])).toThrow()
  })

  it('should parse', () => {
    const result = tryToParseExpansions(unknownData)
    expect(result.length).toEqual(3)
    expect(result[0].id).toEqual(unknownData[0].id)
    expect(result[0].gameId).toEqual(unknownData[0].game_id)
    expect(result[0].code).toEqual(unknownData[0].code)
    expect(result[0].name).toEqual(unknownData[0].name)
  })
})
