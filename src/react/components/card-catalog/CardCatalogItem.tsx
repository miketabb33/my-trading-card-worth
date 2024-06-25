import React from 'react'
import styled from 'styled-components'
import { CardBlueprintDto } from '../../../core/types/CardBlueprintDto'
import { useGlobalPopup } from '../../providers/GlobalPopupProvider'
import CardCatalogPopup from './CardCatalogPopup'
import { useProfile } from '../../providers/ProfileProvider'
import AddCardButton from './AddCardButton'
import Select, { useWithSelect } from '../base/form/Select'
import { MyCardCondition } from '../../../core/types/MyCardCondition'
import { formatCentsToDollars } from '../../../core/CurrencyFormatters'

const Container = styled.div`
  display: flex;
  gap: 1rem;
  padding: 1rem;
`

const Image = styled.img`
  cursor: pointer;
`

const ContentWell = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

const LoggedInContent = styled.div`
  width: min-content;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

const ConditionField = styled.div`
  display: flex;
  gap: 1rem;
`

const Line = styled.div`
  width: 100%;
  height: 1px;
  background-color: lightgray;
`

type CardCatalogItemProps = {
  blueprint: CardBlueprintDto
  refreshBlueprints: () => void
}

const CardCatalogItem = ({
  blueprint,
  refreshBlueprints,
}: CardCatalogItemProps) => {
  const {
    isLoggedIn,
    selectBind,
    condition,
    mixMaxValue,
    formattedAvg,
    formattedMedian,
    show,
  } = useInCardCatalogItem(blueprint)

  return (
    <Container>
      <Image
        src={blueprint.imageUrlPreview}
        onClick={(e) =>
          show(e, <CardCatalogPopup imageUrl={blueprint.imageUrlShow} />)
        }
      />
      <ContentWell>
        <Line />
        <h2>{blueprint.name}</h2>
        <Line />
        <p>
          <strong>Version:</strong> {blueprint.version}
        </p>
        <p>Min-Max: {mixMaxValue}</p>
        <p>Average Value: {formattedAvg}</p>
        <p>Median Value: {formattedMedian}</p>
        {isLoggedIn && (
          <LoggedInContent>
            <p>
              <strong>Owned:</strong> {blueprint.owned}
            </p>
            <h3>Add to your collection</h3>
            <ConditionField>
              Condition:
              <Select {...selectBind} />
            </ConditionField>
            <AddCardButton
              blueprint={blueprint}
              condition={condition}
              refreshBlueprints={refreshBlueprints}
            />
          </LoggedInContent>
        )}
      </ContentWell>
    </Container>
  )
}

export const useInCardCatalogItem = (blueprint: CardBlueprintDto) => {
  const { show } = useGlobalPopup()
  const { isLoggedIn } = useProfile()

  const { bind: selectBind, selectedOption } = useWithSelect(
    MyCardCondition.asArray.map((condition) => ({
      data: condition,
      title: condition.title,
    }))
  )

  const formatValue = (cents: number) => {
    if (cents < 0) return '...'
    return formatCentsToDollars(cents)
  }

  const formattedMin = formatValue(blueprint.minMarketValueCents)
  const formattedMax = formatValue(blueprint.maxMarketValueCents)
  const formattedAvg = formatValue(blueprint.averageMarketValueCents)
  const formattedMedian = formatValue(blueprint.medianMarketValueCents)

  const mixMaxValue = `${formattedMin} - ${formattedMax}`

  return {
    isLoggedIn,
    selectBind,
    mixMaxValue,
    formattedAvg,
    formattedMedian,
    condition: selectedOption,
    show,
  }
}

export default CardCatalogItem
