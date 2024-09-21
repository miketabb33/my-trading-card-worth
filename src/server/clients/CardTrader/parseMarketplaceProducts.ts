import TypeParser from '../../../core/TypeParser'
import {
  CardTraderMarketplaceProductDto,
  CardTraderMarketplaceProductDtoPrice,
  CardTraderMarketplaceProductDtoPropertyHash,
} from './types/CardTraderMarketplaceProductDto'

export const tryToParseMarketplaceProducts = (data: unknown): Map<string, CardTraderMarketplaceProductDto[]> => {
  const object = TypeParser.rootIsObject(data, tryToParseMarketplaceProducts.name)

  const blueprintIdToProductsMap = new Map<string, CardTraderMarketplaceProductDto[]>()

  for (const [blueprintId, productsAny] of Object.entries(object)) {
    const productsArray = TypeParser.rootIsArray(productsAny, tryToParseMarketplaceProducts.name)

    const products = productsArray.map(parseProductsArray)

    blueprintIdToProductsMap.set(blueprintId, products)
  }

  return blueprintIdToProductsMap
}

const parseProductsArray = (productsArray: unknown): CardTraderMarketplaceProductDto => {
  const parser = new TypeParser(productsArray, tryToParseMarketplaceProducts.name)

  const price = parsePrice(parser.obj('price'))
  const propertiesHash = parsePropertiesHash(parser.obj('properties_hash'))

  const product: CardTraderMarketplaceProductDto = {
    blueprintId: parser.num('blueprint_id'),
    price,
    propertiesHash,
  }
  return product
}

const parsePrice = (data: unknown): CardTraderMarketplaceProductDtoPrice => {
  const parser = new TypeParser(data, tryToParseMarketplaceProducts.name)
  const price: CardTraderMarketplaceProductDtoPrice = {
    cents: parser.num('cents'),
  }
  return price
}

const parsePropertiesHash = (data: unknown): CardTraderMarketplaceProductDtoPropertyHash => {
  const parser = new TypeParser(data, tryToParseMarketplaceProducts.name)
  const hash: CardTraderMarketplaceProductDtoPropertyHash = {
    condition: parser.strOrNull('condition'),
  }
  return hash
}
