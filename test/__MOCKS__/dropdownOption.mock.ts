import { DropdownOption } from '../../src/react/components/base/form/utilities/InputFieldDropdown'

export type FakeDropdownData = {
  id: number
  name: string
}

const FAKE_1: FakeDropdownData = { id: 1, name: 'Pokémon Products' }
const FAKE_2: FakeDropdownData = { id: 2, name: 'Miscellaneous Promos' }
const FAKE_3: FakeDropdownData = { id: 3, name: 'League Promos' }
const FAKE_4: FakeDropdownData = { id: 4, name: 'Base Set' }
const FAKE_5: FakeDropdownData = { id: 5, name: 'Jungle' }
const FAKE_6: FakeDropdownData = { id: 6, name: 'Wizards Black Star Promos' }
const FAKE_7: FakeDropdownData = { id: 7, name: 'W Promos' }
const FAKE_8: FakeDropdownData = { id: 8, name: 'Fossil' }

export const DROPDOWN_OPTION_1: DropdownOption<FakeDropdownData> = {
  title: FAKE_1.name,
  data: FAKE_1,
}
export const DROPDOWN_OPTION_2: DropdownOption<FakeDropdownData> = {
  title: FAKE_2.name,
  data: FAKE_2,
}
export const DROPDOWN_OPTION_3: DropdownOption<FakeDropdownData> = {
  title: FAKE_3.name,
  data: FAKE_3,
}
export const DROPDOWN_OPTION_4: DropdownOption<FakeDropdownData> = {
  title: FAKE_4.name,
  data: FAKE_4,
}
export const DROPDOWN_OPTION_5: DropdownOption<FakeDropdownData> = {
  title: FAKE_5.name,
  data: FAKE_5,
}
export const DROPDOWN_OPTION_6: DropdownOption<FakeDropdownData> = {
  title: FAKE_6.name,
  data: FAKE_6,
}
export const DROPDOWN_OPTION_7: DropdownOption<FakeDropdownData> = {
  title: FAKE_7.name,
  data: FAKE_7,
}
export const DROPDOWN_OPTION_8: DropdownOption<FakeDropdownData> = {
  title: FAKE_8.name,
  data: FAKE_8,
}
