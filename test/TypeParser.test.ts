/* eslint-disable @typescript-eslint/no-unsafe-return */
import TypeParser from '../src/TypeParser'

const PARSER_NAME = 'testParser'

const unknownData = {
  name: 'Bob',
  age: 100,
}

const parser = new TypeParser(unknownData, PARSER_NAME)

describe('Type Parser', () => {
  it('should parse ROOT as array correctly', () => {
    const result = TypeParser.rootIsArray([], PARSER_NAME)
    expect(Array.isArray(result)).toEqual(true)
  })

  it('should throw when not an array', () => {
    expect(() => TypeParser.rootIsArray('not array', PARSER_NAME)).toThrow(
      'Unable to parse "root" as "array" for "testParser"'
    )
  })

  it('should parse STRING correctly', () => {
    const result = parser.str('name')
    expect(result).toEqual('Bob')
  })

  it('should throw when could not parse STRING correctly', () => {
    expect(() => parser.str('age')).toThrow(
      'Unable to parse "age" as "string" for "testParser"'
    )
  })

  it('should parse NUMBER correctly', () => {
    const result = parser.num('age')
    expect(result).toEqual(100)
  })

  it('should throw when could not parse NUMBER correctly', () => {
    expect(() => parser.num('name')).toThrow(
      'Unable to parse "name" as "number" for "testParser"'
    )
  })
})
