import { GameName } from '@prisma/client'
import { prisma } from '../../../prisma/prismaClient'

export { GameName }

export interface IGameRepo {
  findOrCreate: (name: GameName) => Promise<number>
}

class GameRepo implements IGameRepo {
  findOrCreate = async (name: GameName): Promise<number> => {
    const game = await prisma.game.upsert({
      where: { name },
      update: {},
      create: { name },
    })

    return game.id
  }
}

export default GameRepo
