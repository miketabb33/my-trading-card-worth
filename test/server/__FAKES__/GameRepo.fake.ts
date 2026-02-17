import { IGameRepo } from '../../../src/server/repository/GameRepo'

class GameRepo_FAKE implements IGameRepo {
  FIND_OR_CREATE = jest.fn()

  findOrCreate = this.FIND_OR_CREATE
}

export default GameRepo_FAKE
