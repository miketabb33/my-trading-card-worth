import { CardSet } from '../../types/CardSet'
import {
  EXPANSION_SERIES,
  ExpansionData,
  ExpansionSeries,
} from '../../types/ExpansionData'

export type SortableExpansion = {
  cardSet: CardSet
  expansionData: ExpansionData | null
}

export interface IExpansionSorter {
  sort: (expansions: SortableExpansion[]) => SortableExpansion[]
}

class ExpansionSorter implements IExpansionSorter {
  sort = (expansions: SortableExpansion[]): SortableExpansion[] => {
    const structuredSets = this.buildStructuredSets(expansions)
    const unstructuredSets = this.buildUnstructuredSets(expansions)

    return [...structuredSets, ...unstructuredSets]
  }

  private buildUnstructuredSets = (sets: SortableExpansion[]) => {
    return sets.sort((a, b) => {
      return (
        new Date(a.expansionData?.releaseDate ?? 0).getTime() -
        new Date(b.expansionData?.releaseDate ?? 0).getTime()
      )
    })
  }

  private buildStructuredSets = (sets: SortableExpansion[]) => {
    return EXPANSION_SERIES.flatMap((expansionSeries) => {
      return this.extractAndSortExpansion(sets, expansionSeries)
    })
  }

  private extractAndSortExpansion = (
    expansions: SortableExpansion[],
    expansionSeries: ExpansionSeries
  ): SortableExpansion[] => {
    const { series, expansionIdsToBeCleared } =
      this.getSeriesAndExpansionsToClear(expansions, expansionSeries)

    this.clearExpansionsFrom(expansions, expansionIdsToBeCleared)

    return series.sort((a, b) => {
      return (
        new Date(a.expansionData?.releaseDate ?? 0).getTime() -
        new Date(b.expansionData?.releaseDate ?? 0).getTime()
      )
    })
  }

  private getSeriesAndExpansionsToClear = (
    expansions: SortableExpansion[],
    expansionSeries: ExpansionSeries
  ) => {
    const expansionIdsToBeCleared: number[] = []

    const series = expansions.filter((set) => {
      if (set.expansionData?.series === expansionSeries) {
        expansionIdsToBeCleared.push(set.cardSet.expansionId)
        return true
      }
      return false
    })

    return { series, expansionIdsToBeCleared }
  }

  private clearExpansionsFrom = (
    expansions: SortableExpansion[],
    expansionIdsToBeCleared: number[]
  ) => {
    expansionIdsToBeCleared.forEach((expansionId) => {
      let index: number | null = null
      expansions.find((set, i) => {
        if (set.cardSet?.expansionId === expansionId) {
          index = i
          return true
        }
        return false
      })

      if (index) expansions.splice(index, 1)
    })
  }
}

export default ExpansionSorter
