import { IExpansionSorter } from '../../../src/server/logic/set/ExpansionSorter'

class ExpansionSorter_FAKE implements IExpansionSorter {
  SORT = jest.fn()

  sort = this.SORT
}

export default ExpansionSorter_FAKE
