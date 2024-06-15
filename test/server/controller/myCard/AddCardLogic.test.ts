import { AddCardLogic } from '../../../../src/server/controllers/myCard/AddCardLogic'
import { ICardTraderCRUD } from '../../../../src/server/database/CardTraderCRUD'
import { IMyCardCRUD } from '../../../../src/server/database/MyCardCRUD'
import { IMyCardCardTraderLookupCRUD } from '../../../../src/server/database/MyCardCardTraderLookupCRUD'
import { MY_CARD_DTO } from '../../../__MOCKS__/myCardDto.mock'

const ADD_MY_CARD = jest.fn()
const ADD_CARD_TRADER = jest.fn()
const FIND_CARD_TRADER = jest.fn()
const ADD_LOOKUP = jest.fn()

const USER_ID = 'anyUserId'

describe('Add Card Logic', () => {
  let addCardLogic: AddCardLogic

  beforeEach(() => {
    jest.clearAllMocks()
    addCardLogic = new AddCardLogic(
      new FakeCardTraderCRUD(),
      new FakeMyCardCRUD(),
      new FakeMyCardCardTraderLookupCRUD()
    )
  })

  it('should not add a card trader item when one exists', async () => {
    FIND_CARD_TRADER.mockResolvedValue({ something: 'something' })

    await addCardLogic.add(USER_ID, MY_CARD_DTO)

    expect(ADD_MY_CARD).toHaveBeenCalled()
    expect(FIND_CARD_TRADER).toHaveBeenCalled()
    expect(ADD_CARD_TRADER).not.toHaveBeenCalled()
    expect(ADD_LOOKUP).toHaveBeenCalled()
  })

  it("should add a card trader item when one doesn't exists", async () => {
    FIND_CARD_TRADER.mockResolvedValue(null)

    await addCardLogic.add(USER_ID, MY_CARD_DTO)

    expect(ADD_MY_CARD).toHaveBeenCalled()
    expect(FIND_CARD_TRADER).toHaveBeenCalled()
    expect(ADD_CARD_TRADER).toHaveBeenCalled()
    expect(ADD_LOOKUP).toHaveBeenCalled()
  })
})

class FakeMyCardCRUD implements IMyCardCRUD {
  add = ADD_MY_CARD
}

class FakeCardTraderCRUD implements ICardTraderCRUD {
  add = ADD_CARD_TRADER
  find = FIND_CARD_TRADER
}

class FakeMyCardCardTraderLookupCRUD implements IMyCardCardTraderLookupCRUD {
  add = ADD_LOOKUP
}
