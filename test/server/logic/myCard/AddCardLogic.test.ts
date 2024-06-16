import { AddCardLogic } from '../../../../src/server/logic/myCard/AddCardLogic'
import { IMyCardCRUD } from '../../../../src/server/database/repository/MyCardCRUD'
import { MY_CARD_DTO } from '../../../__MOCKS__/myCardDto.mock'

const ADD_MY_CARD = jest.fn()

const USER_ID = 'anyUserId'

describe('Add Card Logic', () => {
  let addCardLogic: AddCardLogic

  beforeEach(() => {
    jest.clearAllMocks()
    addCardLogic = new AddCardLogic(new FakeMyCardCRUD())
  })

  it('should not add a card trader item when one exists', async () => {
    await addCardLogic.add(USER_ID, MY_CARD_DTO)

    expect(ADD_MY_CARD).toHaveBeenCalled()
  })
})

class FakeMyCardCRUD implements IMyCardCRUD {
  add = ADD_MY_CARD
  findBySet = ADD_MY_CARD
}
