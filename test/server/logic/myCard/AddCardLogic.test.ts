import AddCardLogic from '../../../../src/server/logic/myCard/AddCardLogic'
import { MY_CARD_DTO } from '../../../core/__MOCKS__/myCardDto.mock'
import MyCardCRUD_FAKE from '../../__FAKES__/MyCardCRUD.fake'

const USER_ID = 'anyUserId'

describe('Add Card Logic', () => {
  let addCardLogic: AddCardLogic
  let myCardCRUD_FAKE: MyCardCRUD_FAKE

  beforeEach(() => {
    jest.clearAllMocks()
    myCardCRUD_FAKE = new MyCardCRUD_FAKE()
    addCardLogic = new AddCardLogic(myCardCRUD_FAKE)
  })

  it('should not add a card trader item when one exists', async () => {
    await addCardLogic.add(USER_ID, MY_CARD_DTO)

    expect(myCardCRUD_FAKE.ADD_MY_CARD).toHaveBeenCalled()
  })
})
