import mongoose from 'mongoose'
const { Schema, model } = mongoose

export type ExpansionEntity = {
  _id: string
  cardTraderExpansionId: number
  name: string
  expansionNumberInSeries: number
  series: string
  expansionType: string
  numberOfCards: number
  numberOfSecretCards: number
  releaseDate: Date
  abbreviation: string
  symbolUrl: string | null
  logoUrl: string | null
  bulbapediaUrl: string
  createdAt: Date
  updatedAt: Date
}

const expansionSchema = new Schema(
  {
    cardTraderExpansionId: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    expansionNumberInSeries: {
      type: Number,
      required: true,
    },
    series: {
      type: String,
      required: true,
    },
    expansionType: {
      type: String,
      required: true,
    },
    numberOfCards: {
      type: Number,
      required: true,
    },
    numberOfSecretCards: {
      type: Number,
      required: true,
    },
    releaseDate: {
      type: Date,
      required: true,
    },
    abbreviation: String,
    symbolUrl: String,
    logoUrl: String,
    bulbapediaUrl: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
)

const ExpansionModel = model('expansion', expansionSchema)

export interface IExpansionCRUD {
  find: (cardTraderExpansionId: number) => Promise<ExpansionEntity | null>
}

class ExpansionCRUD implements IExpansionCRUD {
  find = async (cardTraderExpansionId: number): Promise<ExpansionEntity | null> => {
    const context = await ExpansionModel.findOne({
      cardTraderExpansionId,
    })

    if (!context) return null

    const expansion: ExpansionEntity = {
      _id: context._id.toString(),
      cardTraderExpansionId: context.cardTraderExpansionId,
      name: context.name,
      expansionNumberInSeries: context.expansionNumberInSeries,
      series: context.series,
      expansionType: context.expansionType,
      numberOfCards: context.numberOfCards,
      numberOfSecretCards: context.numberOfSecretCards,
      releaseDate: context.releaseDate,
      abbreviation: context.abbreviation || '',
      symbolUrl: context.symbolUrl || null,
      logoUrl: context.logoUrl || null,
      bulbapediaUrl: context.bulbapediaUrl,
      createdAt: context.createdAt,
      updatedAt: context.updatedAt,
    }

    return expansion
  }
}

export default ExpansionCRUD
