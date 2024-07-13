import AddCardLogic from '../../../../src/server/logic/collection/AddCardLogic'
import { ADD_MY_CARD_DTO } from '../../../core/__MOCKS__/addMyCardDto.mock'
import MyCardCRUD_FAKE from '../../__FAKES__/MyCardCRUD.fake'

describe('Add Card Logic', () => {
  let addCardLogic: AddCardLogic
  let myCardCRUD_FAKE: MyCardCRUD_FAKE

  const USER_ID = 'anyUserId'

  beforeEach(() => {
    jest.clearAllMocks()
    myCardCRUD_FAKE = new MyCardCRUD_FAKE()
    addCardLogic = new AddCardLogic(myCardCRUD_FAKE)
  })

  it('should not add a card trader item when one exists', async () => {
    await addCardLogic.add(USER_ID, ADD_MY_CARD_DTO)

    expect(myCardCRUD_FAKE.ADD_MY_CARD).toHaveBeenCalled()
  })
})
