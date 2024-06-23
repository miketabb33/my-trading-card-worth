import { CardCondition } from '../../../src/core/types/MyCardCondition'
import { CardValue } from '../../../src/server/types/CardValue'

type MakeCardValueMockArgs = {
  blueprintId?: number
  priceCents?: number
  condition?: CardCondition
}

export const makeCardValueMock = ({
  blueprintId = 0,
  priceCents = 0,
  condition = 'Unknown',
}: MakeCardValueMockArgs): CardValue => ({
  blueprintId,
  priceCents,
  condition,
})
