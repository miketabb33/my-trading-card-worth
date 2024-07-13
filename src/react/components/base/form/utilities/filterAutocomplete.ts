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
  return options.filter((option) => {
    const downcaseOptionName = option.title.toLowerCase()
    const noEAcute = downcaseOptionName.replace(/é/g, 'e')
    const downcaseNewValue = inputValue.toLowerCase()
    return noEAcute.includes(downcaseNewValue)
  })
}
