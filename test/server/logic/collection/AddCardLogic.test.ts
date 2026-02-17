/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { MyCardItemEntity } from '../../../../src/server/repository/MyCardRepo'
import AddCardLogic from '../../../../src/server/logic/collection/AddCardLogic'
import { ADD_MY_CARD_DTO } from '../../../core/__MOCKS__/addMyCardDto.mock'
import MyCardRepo_FAKE from '../../__FAKES__/MyCardRepo.fake'
import { makeMyCardEntityMock } from '../../__MOCKS__/myCardEntity.mock'

describe('Add Card Logic', () => {
  let addCardLogic: AddCardLogic
  let myCardRepo_FAKE: MyCardRepo_FAKE

  const USER_ID = 'anyUserId'

  beforeEach(() => {
    jest.clearAllMocks()
    myCardRepo_FAKE = new MyCardRepo_FAKE()
    addCardLogic = new AddCardLogic(myCardRepo_FAKE)
  })

  it("should create a new record with a single card when a My Card Entity doesn't exist", async () => {
    myCardRepo_FAKE.FIND_BY_BLUEPRINT_ID.mockResolvedValue(null)

    await addCardLogic.add(USER_ID, ADD_MY_CARD_DTO)

    expect(myCardRepo_FAKE.CREATE).toHaveBeenCalledWith(
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

    expect(myCardRepo_FAKE.FIND_BY_BLUEPRINT_ID).toHaveBeenCalledWith(USER_ID, ADD_MY_CARD_DTO.blueprintId)
    expect(myCardRepo_FAKE.ADD_ITEM).not.toHaveBeenCalled()
  })

  it('should add a new cards property when a My Card Entity exists', async () => {
    const existingMyCardEntity = makeMyCardEntityMock({})
    myCardRepo_FAKE.FIND_BY_BLUEPRINT_ID.mockResolvedValue(existingMyCardEntity)

    await addCardLogic.add(USER_ID, ADD_MY_CARD_DTO)

    const expectedItem: MyCardItemEntity = {
      condition: ADD_MY_CARD_DTO.condition,
    }
    expect(myCardRepo_FAKE.ADD_ITEM).toHaveBeenCalledWith(USER_ID, ADD_MY_CARD_DTO.blueprintId, expectedItem)
    expect(myCardRepo_FAKE.CREATE).not.toHaveBeenCalled()
  })
})
