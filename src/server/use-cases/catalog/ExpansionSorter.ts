import { ExpansionPokemonEntity } from '../../repository/ExpansionPokemonRepo'
import { CardExpansion } from '../../types/CardExpansion'
import { ExpansionOrder } from '../../types/ExpansionOrder'

export type SortableExpansion = {
  cardExpansion: CardExpansion
  expansionEntity: ExpansionPokemonEntity | null
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
      .flatMap((series) => this.extractExpansionSeries(sortableExpansions, series).sort(this.sortByOldest))
  }

  private extractAndSortOtherSeriesExpansions = (
    sortableExpansions: SortableExpansion[],
    otherSeriesOrder: string[]
  ) => {
    return otherSeriesOrder.flatMap((series) =>
      this.extractExpansionSeries(sortableExpansions, series).sort(this.sortByMostRecent)
    )
  }

  private extractExpansionSeries = (sortableExpansions: SortableExpansion[], series: string): SortableExpansion[] => {
    const extracted: SortableExpansion[] = []
    for (let i = sortableExpansions.length - 1; i >= 0; i--) {
      if (sortableExpansions[i].expansionEntity?.series === series) {
        extracted.unshift(...sortableExpansions.splice(i, 1))
      }
    }
    return extracted
  }

  private getTime = (e: SortableExpansion) => new Date(e.expansionEntity?.releaseDate ?? 0).getTime()
  private sortByOldest = (a: SortableExpansion, b: SortableExpansion) => this.getTime(b) - this.getTime(a)
  private sortByMostRecent = (a: SortableExpansion, b: SortableExpansion) => this.getTime(a) - this.getTime(b)
}

export default ExpansionSorter
