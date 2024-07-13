import { CardConditionOptions } from '../../../core/types/CardCondition'

export const parseCardCondition = (
  condition: string | null
): CardConditionOptions => {
  if (condition === 'Mint') return 'Mint'
  if (condition === 'Near Mint') return 'Near Mint'
  if (condition === 'Slightly Played') return 'Slightly Played'
  if (condition === 'Moderately Played') return 'Moderately Played'
  if (condition === 'Played') return 'Played'
  if (condition === 'Heavily Played') return 'Heavily Played'
  if (condition === 'Poor') return 'Poor'

  return 'Unknown'
}
