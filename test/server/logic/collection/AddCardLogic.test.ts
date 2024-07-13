/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { MyCardItemEntity } from '../../../../src/server/database/repository/MyCardCRUD'
import AddCardLogic from '../../../../src/server/logic/collection/AddCardLogic'
import { ADD_MY_CARD_DTO } from '../../../core/__MOCKS__/addMyCardDto.mock'
import MyCardCRUD_FAKE from '../../__FAKES__/MyCardCRUD.fake'
import { makeMyCardEntityMock } from '../../__MOCKS__/myCardEntity.mock'

describe('Add Card Logic', () => {
  let addCardLogic: AddCardLogic
  let myCardCRUD_FAKE: MyCardCRUD_FAKE

  const USER_ID = 'anyUserId'

  beforeEach(() => {
    jest.clearAllMocks()
    myCardCRUD_FAKE = new MyCardCRUD_FAKE()
    addCardLogic = new AddCardLogic(myCardCRUD_FAKE)
  })

  it("should create a new record with a single card when a My Card Entity doesn't exist", async () => {
    myCardCRUD_FAKE.FIND_BY_BLUEPRINT_ID.mockResolvedValue(null)

    await addCardLogic.add(USER_ID, ADD_MY_CARD_DTO)

    expect(myCardCRUD_FAKE.CREATE).toHaveBeenCalledWith(
      expect.objectContaining({
        _id: expect.any(String),
        cardTrader: {
          blueprintId: ADD_MY_CARD_DTO.blueprintId,
          expansionId: ADD_MY_CARD_DTO.expansionId,
        },
        items: [{ condition: ADD_MY_CARD_DTO.condition }],
        createdAt: expect.any(Date),
        imageUrlPreview: ADD_MY_CARD_DTO.imageUrlPreview,
        imageUrlShow: ADD_MY_CARD_DTO.imageUrlShow,
        name: ADD_MY_CARD_DTO.name,
        updatedAt: expect.any(Date),
        userId: USER_ID,
      })
    )

    expect(myCardCRUD_FAKE.FIND_BY_BLUEPRINT_ID).toHaveBeenCalledWith(
      USER_ID,
      ADD_MY_CARD_DTO.blueprintId
    )
    expect(myCardCRUD_FAKE.ADD_ITEM).not.toHaveBeenCalled()
  })

  it('should add a new cards property when a My Card Entity exists', async () => {
    const existingMyCardEntity = makeMyCardEntityMock({})
    myCardCRUD_FAKE.FIND_BY_BLUEPRINT_ID.mockResolvedValue(existingMyCardEntity)

    await addCardLogic.add(USER_ID, ADD_MY_CARD_DTO)

    const expectedItem: MyCardItemEntity = {
      condition: ADD_MY_CARD_DTO.condition,
    }
    expect(myCardCRUD_FAKE.ADD_ITEM).toHaveBeenCalledWith(
      USER_ID,
      ADD_MY_CARD_DTO.blueprintId,
      expectedItem
    )
    expect(myCardCRUD_FAKE.CREATE).not.toHaveBeenCalled()
  })
})
