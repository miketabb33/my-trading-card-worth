import RemoveCardLogic from '../../../../src/server/logic/collection/RemoveCardLogic'
import MyCardCRUD_FAKE from '../../__FAKES__/MyCardCRUD.fake'
import { makeMyCardEntityMock } from '../../__MOCKS__/myCardEntity.mock'

describe('Remove Card Logic', () => {
  let removeCardLogic: RemoveCardLogic
  let myCardCRUD_FAKE: MyCardCRUD_FAKE

  const USER_ID = 'anyUserId'
  const BLUEPRINT_ID = 1234

  beforeEach(() => {
    myCardCRUD_FAKE = new MyCardCRUD_FAKE()
    removeCardLogic = new RemoveCardLogic(myCardCRUD_FAKE)
  })

  it('should delete entity when only 1 item exists', async () => {
    myCardCRUD_FAKE.FIND_BY_BLUEPRINT_ID.mockResolvedValue(
      makeMyCardEntityMock({ items: [{ condition: 0 }] })
    )
    await removeCardLogic.remove(USER_ID, BLUEPRINT_ID)

    expect(myCardCRUD_FAKE.FIND_BY_BLUEPRINT_ID).toHaveBeenCalledWith(
      USER_ID,
      BLUEPRINT_ID
    )

    expect(myCardCRUD_FAKE.DELETE).toHaveBeenCalledWith(USER_ID, BLUEPRINT_ID)
    expect(myCardCRUD_FAKE.REMOVE_ITEM).not.toHaveBeenCalled()
  })

  it('should remove item when more than 1 item exists', async () => {
    myCardCRUD_FAKE.FIND_BY_BLUEPRINT_ID.mockResolvedValue(
      makeMyCardEntityMock({ items: [{ condition: 0 }, { condition: 0 }] })
    )
    await removeCardLogic.remove(USER_ID, BLUEPRINT_ID)

    expect(myCardCRUD_FAKE.REMOVE_ITEM).toHaveBeenCalledWith(
      USER_ID,
      BLUEPRINT_ID
    )
    expect(myCardCRUD_FAKE.DELETE).not.toHaveBeenCalled()
  })
})
