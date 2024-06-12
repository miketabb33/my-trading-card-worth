import { DropdownOption } from './InputFieldDropdown'

export const filterAutocomplete = <T extends object>(
  options: DropdownOption<T>[] | null,
  newValue: string
) => {
  if (!options) return []
  if (newValue === '') return options
  else return filterAutocompleteFromInput(options, newValue)
}

const filterAutocompleteFromInput = <T extends object>(
  options: DropdownOption<T>[],
  inputValue: string
) => {
  return options.filter((set) => {
    const downcaseSetName = set.title.toLowerCase()
    const noEAcute = downcaseSetName.replace(/é/g, 'e')
    const downcaseNewValue = inputValue.toLowerCase()
    return noEAcute.includes(downcaseNewValue)
  })
}
