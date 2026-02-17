import { prisma } from '../../../prisma/prismaClient'
import { ExpansionOrder } from '../types/ExpansionOrder'

export interface IExpansionOrderRepo {
  get: () => Promise<ExpansionOrder | null>
}

class ExpansionOrderRepo implements IExpansionOrderRepo {
  get = async (): Promise<ExpansionOrder | null> => {
    const record = await prisma.expansionPokemonOrder.findFirst()
    if (!record) return null

    return {
      mainSeries: record.mainSeries as string[],
      otherSeries: record.otherSeries as string[],
    }
  }
}

export default ExpansionOrderRepo
