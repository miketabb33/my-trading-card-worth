import { CardSet } from '../../types/CardSet'
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
  cardSet: CardSet
  expansionData: ExpansionData | null
}

export interface IExpansionSorter {
  sort: (expansions: SortableExpansion[]) => SortableExpansion[]
}

class ExpansionSorter implements IExpansionSorter {
  sort = (expansions: SortableExpansion[]): SortableExpansion[] => {
    const mainSeriesSets = this.extractAndSortMainSeriesExpansions(expansions)
    const otherSeriesSets = this.extractAndSortOtherSeriesExpansions(expansions)
    const remainingExpansions = expansions

    return [...mainSeriesSets, ...otherSeriesSets, ...remainingExpansions]
  }

  private extractAndSortMainSeriesExpansions = (
    expansions: SortableExpansion[]
  ) => {
    return MAIN_SERIES.reverse().flatMap((expansionSeries) => {
      const mainSeriesExpansions = this.extractExpansionSeries(
        expansions,
        expansionSeries
      )
      return mainSeriesExpansions.sort(this.sortByOldest)
    })
  }

  private extractAndSortOtherSeriesExpansions = (
    expansions: SortableExpansion[]
  ) => {
    return OTHER_SERIES.flatMap((expansionSeries) => {
      const otherSeriesExpansions = this.extractExpansionSeries(
        expansions,
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
    expansions: SortableExpansion[],
    expansionSeries: ExpansionSeries
  ): SortableExpansion[] => {
    const { series, expansionIdsToBeCleared } =
      this.getSeriesAndExpansionsToClear(expansions, expansionSeries)

    this.clearExpansionsFrom(expansions, expansionIdsToBeCleared)

    return series
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
