import { CardValue } from '../../../src/server/types/CardValue'

type MakeCardValueMockArgs = {
  blueprintId?: number
  priceCents?: number
  condition?: string
}

export const makeCardValueMock = ({
  blueprintId = 0,
  priceCents = 0,
  condition = '',
}: MakeCardValueMockArgs): CardValue => ({
  blueprintId,
  priceCents,
  condition,
})
