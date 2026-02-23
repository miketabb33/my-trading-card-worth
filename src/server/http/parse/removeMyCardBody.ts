import TypeParser from '../../../core/TypeParser'

export const parseRemoveMyCardBody = (body: unknown): number => {
  const typeParser = new TypeParser(body, 'Remove my card body')

  return typeParser.num('blueprintId')
}
