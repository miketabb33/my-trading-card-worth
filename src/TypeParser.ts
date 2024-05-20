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

  str = (key: string): string => {
    if (typeof this.data[key] === 'string') {
      return this.data[key] as string
    }
    throw new Error(TypeParser.parserError(key, 'string', this.parserName))
  }

  num = (key: string): number => {
    if (typeof this.data[key] === 'number') {
      return this.data[key] as number
    }
    throw new Error(TypeParser.parserError(key, 'number', this.parserName))
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
