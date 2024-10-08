import { ExpansionEntity } from '../../database/repository/ExpansionCRUD'
import { CardExpansion } from '../../types/CardExpansion'
import { ExpansionOrder } from '../../types/ExpansionOrder'

export type SortableExpansion = {
  cardExpansion: CardExpansion
  expansionEntity: ExpansionEntity | null
}

export interface IExpansionSorter {
  sort: (sortableExpansions: SortableExpansion[], expansionOrder: ExpansionOrder) => SortableExpansion[]
}

class ExpansionSorter implements IExpansionSorter {
  sort = (sortableExpansions: SortableExpansion[], expansionOrder: ExpansionOrder): SortableExpansion[] => {
    const mainSeriesExpansions = this.extractAndSortMainSeriesExpansions(sortableExpansions, expansionOrder.mainSeries)
    const otherSeriesExpansions = this.extractAndSortOtherSeriesExpansions(
      sortableExpansions,
      expansionOrder.otherSeries
    )
    const remainingExpansions = sortableExpansions

    return [...mainSeriesExpansions, ...otherSeriesExpansions, ...remainingExpansions]
  }

  private extractAndSortMainSeriesExpansions = (sortableExpansions: SortableExpansion[], mainSeriesOrder: string[]) => {
    return mainSeriesOrder
      .slice()
      .reverse()
      .flatMap((expansionSeries) => {
        const mainSeriesExpansions = this.extractExpansionSeries(sortableExpansions, expansionSeries)
        return mainSeriesExpansions.sort(this.sortByOldest)
      })
  }

  private extractAndSortOtherSeriesExpansions = (
    sortableExpansions: SortableExpansion[],
    otherSeriesOrder: string[]
  ) => {
    return otherSeriesOrder.flatMap((expansionSeries) => {
      const otherSeriesExpansions = this.extractExpansionSeries(sortableExpansions, expansionSeries)
      return otherSeriesExpansions.sort(this.sortByMostRecent)
    })
  }

  private sortByOldest = (a: SortableExpansion, b: SortableExpansion) => {
    return (
      new Date(b.expansionEntity?.releaseDate ?? 0).getTime() - new Date(a.expansionEntity?.releaseDate ?? 0).getTime()
    )
  }

  private sortByMostRecent = (a: SortableExpansion, b: SortableExpansion) => {
    return (
      new Date(a.expansionEntity?.releaseDate ?? 0).getTime() - new Date(b.expansionEntity?.releaseDate ?? 0).getTime()
    )
  }

  private extractExpansionSeries = (
    sortableExpansions: SortableExpansion[],
    expansionSeries: string
  ): SortableExpansion[] => {
    const { series, expansionIdsToBeCleared } = this.getSeriesAndExpansionsToClear(sortableExpansions, expansionSeries)

    this.clearExpansionsFrom(sortableExpansions, expansionIdsToBeCleared)

    return series
  }

  private getSeriesAndExpansionsToClear = (sortableExpansions: SortableExpansion[], expansionSeries: string) => {
    const expansionIdsToBeCleared: number[] = []

    const series = sortableExpansions.filter((sortableExpansion) => {
      if (sortableExpansion.expansionEntity?.series === expansionSeries) {
        expansionIdsToBeCleared.push(sortableExpansion.cardExpansion.expansionId)
        return true
      }
      return false
    })

    return { series, expansionIdsToBeCleared }
  }

  private clearExpansionsFrom = (sortableExpansions: SortableExpansion[], expansionIdsToBeCleared: number[]) => {
    expansionIdsToBeCleared.forEach((expansionId) => {
      let index: number | null = null
      sortableExpansions.find((sortableExpansion, i) => {
        if (sortableExpansion.cardExpansion?.expansionId === expansionId) {
          index = i
          return true
        }
        return false
      })

      if (index) sortableExpansions.splice(index, 1)
    })
  }
}

export default ExpansionSorter
