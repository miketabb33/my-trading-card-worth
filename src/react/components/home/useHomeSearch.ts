import { useEffect } from 'react'
import { useWithAutocomplete } from '../base/form/Autocomplete'
import { useExpansion } from '../../providers/ExpansionProvider'
import { useRouter } from '../../router/useRouter'
import { PATH_VALUES } from '../../router/pathValues'
import { ExpansionDto } from '@core/network-types/catalog'
import { DropdownOption } from '../base/form/utilities/InputFieldDropdown'

const useHomeSearch = () => {
  const { expansions } = useExpansion()
  const { navigateTo } = useRouter()

  const { bind, setOptions } = useWithAutocomplete<ExpansionDto>({
    didSelectOption: (expansion) => navigateTo(PATH_VALUES.catalog(expansion.slug)),
  })

  useEffect(() => {
    if (!expansions) return
    const options: DropdownOption<ExpansionDto>[] = expansions.map((e) => ({
      data: e,
      title: e.name,
      imageSource: e.symbol,
    }))
    setOptions(options)
  }, [expansions])

  return { autocompleteBind: { ...bind, id: 'HomeSearchAutocomplete' } }
}

export default useHomeSearch
