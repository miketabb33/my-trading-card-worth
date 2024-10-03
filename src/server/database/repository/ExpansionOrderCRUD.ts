/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Schema, model } from 'mongoose'
import { ExpansionOrder } from '../../types/ExpansionOrder'

const expansionOrderSchema = new Schema(
  {
    mainSeries: {
      type: Array,
      required: true,
    },
    otherSeries: {
      type: Array,
      required: true,
    },
  },
  { timestamps: true }
)

const ExpansionOrderModel = model('expansion_order', expansionOrderSchema)

export interface IExpansionOrderCRUD {
  get: () => Promise<ExpansionOrder | null>
}

class ExpansionOrderCRUD implements IExpansionOrderCRUD {
  get = async (): Promise<ExpansionOrder | null> => {
    const context = await ExpansionOrderModel.find()
    if (!context[0]) return null

    const expansionOrder: ExpansionOrder = {
      mainSeries: context[0].mainSeries,
      otherSeries: context[0].otherSeries,
    }

    return expansionOrder
  }
}

export default ExpansionOrderCRUD
