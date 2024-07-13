import { CardConditionOptions } from '../../../src/core/types/CardCondition'
import { CardValue } from '../../../src/server/types/CardValue'

type MakeCardValueMockArgs = {
  blueprintId?: number
  priceCents?: number
  condition?: CardConditionOptions
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
