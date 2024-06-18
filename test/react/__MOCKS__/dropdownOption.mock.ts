import { DropdownOption } from '../../../src/react/components/base/form/utilities/InputFieldDropdown'

export type FakeDropdownData = {
  cardTraderExpansionId: number
  name: string
  symbol: ''
}

const FAKE_1: FakeDropdownData = {
  cardTraderExpansionId: 1,
  name: 'Pokémon Products',
  symbol: '',
}
const FAKE_2: FakeDropdownData = {
  cardTraderExpansionId: 2,
  name: 'Miscellaneous Promos',
  symbol: '',
}
const FAKE_3: FakeDropdownData = {
  cardTraderExpansionId: 3,
  name: 'League Promos',
  symbol: '',
}
const FAKE_4: FakeDropdownData = {
  cardTraderExpansionId: 4,
  name: 'Base Set',
  symbol: '',
}
const FAKE_5: FakeDropdownData = {
  cardTraderExpansionId: 5,
  name: 'Jungle',
  symbol: '',
}
const FAKE_6: FakeDropdownData = {
  cardTraderExpansionId: 6,
  name: 'Wizards Black Star Promos',
  symbol: '',
}
const FAKE_7: FakeDropdownData = {
  cardTraderExpansionId: 7,
  name: 'W Promos',
  symbol: '',
}
const FAKE_8: FakeDropdownData = {
  cardTraderExpansionId: 8,
  name: 'Fossil',
  symbol: '',
}

export const DROPDOWN_OPTION_1: DropdownOption<FakeDropdownData> = {
  title: FAKE_1.name,
  data: FAKE_1,
  imageSource: FAKE_1.symbol,
}
export const DROPDOWN_OPTION_2: DropdownOption<FakeDropdownData> = {
  title: FAKE_2.name,
  data: FAKE_2,
  imageSource: FAKE_2.symbol,
}
export const DROPDOWN_OPTION_3: DropdownOption<FakeDropdownData> = {
  title: FAKE_3.name,
  data: FAKE_3,
  imageSource: FAKE_3.symbol,
}
export const DROPDOWN_OPTION_4: DropdownOption<FakeDropdownData> = {
  title: FAKE_4.name,
  data: FAKE_4,
  imageSource: FAKE_4.symbol,
}
export const DROPDOWN_OPTION_5: DropdownOption<FakeDropdownData> = {
  title: FAKE_5.name,
  data: FAKE_5,
  imageSource: FAKE_5.symbol,
}
export const DROPDOWN_OPTION_6: DropdownOption<FakeDropdownData> = {
  title: FAKE_6.name,
  data: FAKE_6,
  imageSource: FAKE_6.symbol,
}
export const DROPDOWN_OPTION_7: DropdownOption<FakeDropdownData> = {
  title: FAKE_7.name,
  data: FAKE_7,
  imageSource: FAKE_7.symbol,
}
export const DROPDOWN_OPTION_8: DropdownOption<FakeDropdownData> = {
  title: FAKE_8.name,
  data: FAKE_8,
  imageSource: FAKE_8.symbol,
}
