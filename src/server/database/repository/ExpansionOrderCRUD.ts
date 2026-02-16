import { prisma } from '../prismaClient'
import { ExpansionOrder } from '../../types/ExpansionOrder'

export interface IExpansionOrderCRUD {
  get: () => Promise<ExpansionOrder | null>
}

class ExpansionOrderCRUD implements IExpansionOrderCRUD {
  get = async (): Promise<ExpansionOrder | null> => {
    const record = await prisma.expansionPokemonOrder.findFirst()
    if (!record) return null

    return {
      mainSeries: record.mainSeries as string[],
      otherSeries: record.otherSeries as string[],
    }
  }
}

export default ExpansionOrderCRUD
