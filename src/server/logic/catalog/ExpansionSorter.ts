import { CardExpansion } from '../../types/CardExpansion'
import { ExpansionData, ExpansionSeries } from '../../types/ExpansionData'

export const MAIN_SERIES: ExpansionSeries[] = [
  'Original Series',
  'Neo Series',
  'Legendary Collection Series',
  'e-Card Series',
  'EX Series',
  'Diamond & Pearl Series',
  'Platinum Series',
  'HeartGold & SoulSilver Series',
  'Call of Legends Series',
  'Black & White Series',
  'XY Series',
  'Sun & Moon Series',
  'Sword & Shield Series',
  'Scarlet & Violet Series',
]

export const OTHER_SERIES: ExpansionSeries[] = [
  'Black Star Promotional Cards',
  "McDonald's Collection",
  'Trick or Trade',
  'Pop / Play! Pokemon Prize Packs',
  'Other Miscellaneous Sets',
]

export type SortableExpansion = {
  cardExpansion: CardExpansion
  expansionData: ExpansionData | null
}

export interface IExpansionSorter {
  sort: (sortableExpansions: SortableExpansion[]) => SortableExpansion[]
}

class ExpansionSorter implements IExpansionSorter {
  sort = (sortableExpansions: SortableExpansion[]): SortableExpansion[] => {
    const mainSeriesExpansions =
      this.extractAndSortMainSeriesExpansions(sortableExpansions)
    const otherSeriesExpansions =
      this.extractAndSortOtherSeriesExpansions(sortableExpansions)
    const remainingExpansions = sortableExpansions

    return [
      ...mainSeriesExpansions,
      ...otherSeriesExpansions,
      ...remainingExpansions,
    ]
  }

  private extractAndSortMainSeriesExpansions = (
    sortableExpansions: SortableExpansion[]
  ) => {
    return MAIN_SERIES.slice()
      .reverse()
      .flatMap((expansionSeries) => {
        const mainSeriesExpansions = this.extractExpansionSeries(
          sortableExpansions,
          expansionSeries
        )
        return mainSeriesExpansions.sort(this.sortByOldest)
      })
  }

  private extractAndSortOtherSeriesExpansions = (
    sortableExpansions: SortableExpansion[]
  ) => {
    return OTHER_SERIES.flatMap((expansionSeries) => {
      const otherSeriesExpansions = this.extractExpansionSeries(
        sortableExpansions,
        expansionSeries
      )
      return otherSeriesExpansions.sort(this.sortByMostRecent)
    })
  }

  private sortByOldest = (a: SortableExpansion, b: SortableExpansion) => {
    return (
      new Date(b.expansionData?.releaseDate ?? 0).getTime() -
      new Date(a.expansionData?.releaseDate ?? 0).getTime()
    )
  }

  private sortByMostRecent = (a: SortableExpansion, b: SortableExpansion) => {
    return (
      new Date(a.expansionData?.releaseDate ?? 0).getTime() -
      new Date(b.expansionData?.releaseDate ?? 0).getTime()
    )
  }

  private extractExpansionSeries = (
    sortableExpansions: SortableExpansion[],
    expansionSeries: ExpansionSeries
  ): SortableExpansion[] => {
    const { series, expansionIdsToBeCleared } =
      this.getSeriesAndExpansionsToClear(sortableExpansions, expansionSeries)

    this.clearExpansionsFrom(sortableExpansions, expansionIdsToBeCleared)

    return series
  }

  private getSeriesAndExpansionsToClear = (
    sortableExpansions: SortableExpansion[],
    expansionSeries: ExpansionSeries
  ) => {
    const expansionIdsToBeCleared: number[] = []

    const series = sortableExpansions.filter((sortableExpansion) => {
      if (sortableExpansion.expansionData?.series === expansionSeries) {
        expansionIdsToBeCleared.push(
          sortableExpansion.cardExpansion.expansionId
        )
        return true
      }
      return false
    })

    return { series, expansionIdsToBeCleared }
  }

  private clearExpansionsFrom = (
    sortableExpansions: SortableExpansion[],
    expansionIdsToBeCleared: number[]
  ) => {
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
