import { CardSetDto } from '../../../core/types/CardSetDto'

export const filterSets = (sets: CardSetDto[] | null, newValue: string) => {
  if (!sets) return []
  if (newValue === '') return sets
  else return filterSetsFromInput(sets, newValue)
}

const filterSetsFromInput = (sets: CardSetDto[], inputValue: string) => {
  return sets.filter((set) => {
    const downcaseSetName = set.name.toLowerCase()
    const noEAcute = downcaseSetName.replace(/é/g, 'e')
    const downcaseNewValue = inputValue.toLowerCase()
    return noEAcute.includes(downcaseNewValue)
  })
}
