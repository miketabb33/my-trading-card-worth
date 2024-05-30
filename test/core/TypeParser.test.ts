/* eslint-disable @typescript-eslint/no-unsafe-return */

import TypeParser from '../../src/core/TypeParser'

const PARSER_NAME = 'testParser'

const unknownData = {
  name: 'Bob',
  age: 100,
  isAdult: true,
  isChild: false,
  zero: 0,
}

const parser = new TypeParser(unknownData, PARSER_NAME)

describe('Type Parser', () => {
  describe('Root Array', () => {
    it('should parse ROOT as array correctly', () => {
      const result = TypeParser.rootIsArray([], PARSER_NAME)
      expect(Array.isArray(result)).toEqual(true)
    })

    it('should throw when ROOT is NOT an array', () => {
      expect(() => TypeParser.rootIsArray('not array', PARSER_NAME)).toThrow(
        'Unable to parse "root" as "array" for "testParser"'
      )
    })
  })

  describe('String', () => {
    it('should parse STRING correctly', () => {
      const result = parser.str('name')
      expect(result).toEqual('Bob')
    })

    it('should throw when could not parse STRING correctly', () => {
      expect(() => parser.str('age')).toThrow(
        'Unable to parse "age" as "string" for "testParser"'
      )
    })
  })

  describe('String or null', () => {
    it('should parse STRING correctly', () => {
      const result = parser.strOrNull('name')
      expect(result).toEqual('Bob')
    })

    it('should return null when can not parse STRING correctly', () => {
      const result = parser.strOrNull('age')
      expect(result).toBeNull()
    })
  })

  describe('Number', () => {
    it('should parse NUMBER correctly', () => {
      const result = parser.num('age')
      expect(result).toEqual(100)
    })

    it('should parse 0 as number correctly', () => {
      const result = parser.num('zero')
      expect(result).toEqual(0)
    })

    it('should throw when could not parse NUMBER correctly', () => {
      expect(() => parser.num('name')).toThrow(
        'Unable to parse "name" as "number" for "testParser"'
      )
    })
  })

  describe('Number or null', () => {
    it('should parse NUMBER correctly', () => {
      const result = parser.numOrNull('age')
      expect(result).toEqual(100)
    })

    it('should return null when can not parse NUMBER correctly', () => {
      const result = parser.numOrNull('name')
      expect(result).toBeNull()
    })
  })

  describe('Boolean', () => {
    it('should parse BOOLEAN correctly', () => {
      const result = parser.bool('isAdult')
      expect(result).toEqual(true)
    })

    it('should parse false correctly', () => {
      const result = parser.bool('isChild')
      expect(result).toEqual(false)
    })

    it('should throw when could not parse BOOLEAN correctly', () => {
      expect(() => parser.bool('name')).toThrow(
        'Unable to parse "name" as "boolean" for "testParser"'
      )
    })
  })

  describe('Boolean or null', () => {
    it('should parse BOOLEAN correctly', () => {
      const result = parser.boolOrNull('isAdult')
      expect(result).toEqual(true)
    })

    it('should return null when can not parse BOOLEAN correctly', () => {
      const result = parser.boolOrNull('age')
      expect(result).toBeNull()
    })
  })
})
