/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
class TypeParser {
  private data: any
  private parserName: string

  constructor(data: unknown, parserName: string) {
    this.data = data
    this.parserName = parserName
  }

  static rootIsArray = (data: unknown, parserName: string) => {
    if (Array.isArray(data)) {
      return data as any[]
    }
    throw new Error(TypeParser.parserError('root', 'array', parserName))
  }

  static rootIsObject = (data: unknown, parserName: string) => {
    if (typeof data === 'object' && !Array.isArray(data) && data !== null) {
      return data as object
    }
    throw new Error(TypeParser.parserError('root', 'object', parserName))
  }

  obj = (key: string) => {
    const value = this.objOrNull(key)
    if (!value)
      throw new Error(TypeParser.parserError(key, 'object', this.parserName))
    return value
  }

  objOrNull = (key: string) => {
    if (
      typeof this.data[key] === 'object' &&
      !Array.isArray(this.data[key]) &&
      this.data[key] !== null
    ) {
      return this.data[key] as object
    }
    return null
  }

  str = (key: string): string => {
    const value = this.strOrNull(key)
    if (!value)
      throw new Error(TypeParser.parserError(key, 'string', this.parserName))
    return value
  }

  strOrNull = (key: string): string | null => {
    if (typeof this.data[key] === 'string') {
      return this.data[key] as string
    }
    return null
  }

  num = (key: string): number => {
    const value = this.numOrNull(key)
    if (value === null)
      throw new Error(TypeParser.parserError(key, 'number', this.parserName))
    return value
  }

  numOrNull = (key: string): number | null => {
    if (typeof this.data[key] === 'number') {
      return this.data[key] as number
    }
    return null
  }

  bool = (key: string): boolean => {
    const value = this.boolOrNull(key)
    if (value === null)
      throw new Error(TypeParser.parserError(key, 'boolean', this.parserName))
    return value
  }

  boolOrNull = (key: string): boolean | null => {
    if (typeof this.data[key] === 'boolean') {
      return this.data[key] as boolean
    }
    return null
  }

  private static parserError = (
    key: string,
    type: string,
    parserName: string
  ) => {
    return `Unable to parse "${key}" as "${type}" for "${parserName}"`
  }
}

export default TypeParser
