import { BlueprintValue } from '../types/BlueprintValue'

import { IStore } from './IStore'

class BlueprintValueStoreDev implements IStore<Map<string, BlueprintValue>> {
  private state = new Map<string, BlueprintValue>()
  private lastUpdated: Date | null = null

  getState = (): Map<string, BlueprintValue> => {
    return this.state
  }
  getLastUpdated = (): Date | null => {
    return this.lastUpdated
  }
  refreshStore = () => {
    this.state = stubState()
    this.lastUpdated = new Date()
    return new Promise<void>((res) => res())
  }
}

export default BlueprintValueStoreDev

const stubState = (): Map<string, BlueprintValue> => {
  const newState = new Map<string, BlueprintValue>()

  newState.set('281991', {
    minCents: 407,
    maxCents: 626,
    averageCents: 527,
    medianCents: 528,
  })
  newState.set('281992', {
    minCents: 499,
    maxCents: 528,
    averageCents: 514,
    medianCents: 514,
  })
  newState.set('281993', {
    minCents: 1619,
    maxCents: 2987,
    averageCents: 2276,
    medianCents: 2297,
  })
  newState.set('281994', {
    minCents: 1619,
    maxCents: 2987,
    averageCents: 2252,
    medianCents: 2229,
  })
  newState.set('281996', {
    minCents: 625,
    maxCents: 998,
    averageCents: 857,
    medianCents: 903,
  })
  newState.set('281998', {
    minCents: 625,
    maxCents: 998,
    averageCents: 824,
    medianCents: 875,
  })
  newState.set('282005', {
    minCents: 2486,
    maxCents: 3724,
    averageCents: 3143,
    medianCents: 3114,
  })
  newState.set('282006', {
    minCents: 4047,
    maxCents: 6953,
    averageCents: 5581,
    medianCents: 5594,
  })
  newState.set('282008', {
    minCents: 133,
    maxCents: 377,
    averageCents: 254,
    medianCents: 254,
  })
  newState.set('282009', {
    minCents: 41650,
    maxCents: 49277,
    averageCents: 45464,
    medianCents: 45464,
  })
  newState.set('282010', {
    minCents: 132,
    maxCents: 250,
    averageCents: 191,
    medianCents: 191,
  })
  newState.set('282011', {
    minCents: 377,
    maxCents: 626,
    averageCents: 543,
    medianCents: 626,
  })
  newState.set('287134', {
    minCents: 11,
    maxCents: 157,
    averageCents: 30,
    medianCents: 27,
  })
  newState.set('287135', {
    minCents: 11,
    maxCents: 203,
    averageCents: 33,
    medianCents: 27,
  })
  newState.set('287136', {
    minCents: 460,
    maxCents: 2488,
    averageCents: 1648,
    medianCents: 1557,
  })
  newState.set('287137', {
    minCents: 59,
    maxCents: 1744,
    averageCents: 440,
    medianCents: 357,
  })
  newState.set('287138', {
    minCents: 95,
    maxCents: 2740,
    averageCents: 566,
    medianCents: 489,
  })
  newState.set('287139', {
    minCents: 10,
    maxCents: 180,
    averageCents: 40,
    medianCents: 33,
  })
  newState.set('287140', {
    minCents: 17,
    maxCents: 280,
    averageCents: 69,
    medianCents: 55,
  })
  newState.set('287141', {
    minCents: 12,
    maxCents: 194,
    averageCents: 51,
    medianCents: 40,
  })
  newState.set('287142', {
    minCents: 11,
    maxCents: 69,
    averageCents: 27,
    medianCents: 23,
  })
  newState.set('287143', {
    minCents: 85,
    maxCents: 738,
    averageCents: 330,
    medianCents: 311,
  })
  newState.set('287144', {
    minCents: 75,
    maxCents: 626,
    averageCents: 272,
    medianCents: 254,
  })
  newState.set('287145', {
    minCents: 11,
    maxCents: 129,
    averageCents: 38,
    medianCents: 33,
  })
  newState.set('287146', {
    minCents: 11,
    maxCents: 160,
    averageCents: 28,
    medianCents: 23,
  })
  newState.set('287147', {
    minCents: 84,
    maxCents: 1243,
    averageCents: 297,
    medianCents: 252,
  })
  newState.set('287148', {
    minCents: 55,
    maxCents: 690,
    averageCents: 229,
    medianCents: 244,
  })
  newState.set('287149', {
    minCents: 1218,
    maxCents: 2229,
    averageCents: 1912,
    medianCents: 2033,
  })
  newState.set('287150', {
    minCents: 11,
    maxCents: 626,
    averageCents: 44,
    medianCents: 32,
  })
  newState.set('287151', {
    minCents: 14,
    maxCents: 102,
    averageCents: 34,
    medianCents: 31,
  })
  newState.set('287605', {
    minCents: 11,
    maxCents: 69,
    averageCents: 27,
    medianCents: 21,
  })
  newState.set('287606', {
    minCents: 11,
    maxCents: 181,
    averageCents: 31,
    medianCents: 26,
  })
  newState.set('287607', {
    minCents: 11,
    maxCents: 69,
    averageCents: 31,
    medianCents: 28,
  })
  newState.set('287608', {
    minCents: 12,
    maxCents: 102,
    averageCents: 36,
    medianCents: 33,
  })
  newState.set('287609', {
    minCents: 11,
    maxCents: 186,
    averageCents: 31,
    medianCents: 26,
  })
  newState.set('287610', {
    minCents: 11,
    maxCents: 175,
    averageCents: 30,
    medianCents: 26,
  })
  newState.set('287611', {
    minCents: 11,
    maxCents: 75,
    averageCents: 28,
    medianCents: 24,
  })
  newState.set('287612', {
    minCents: 11,
    maxCents: 255,
    averageCents: 36,
    medianCents: 32,
  })
  newState.set('287613', {
    minCents: 11,
    maxCents: 69,
    averageCents: 29,
    medianCents: 26,
  })
  newState.set('287614', {
    minCents: 11,
    maxCents: 191,
    averageCents: 31,
    medianCents: 25,
  })
  newState.set('287615', {
    minCents: 11,
    maxCents: 195,
    averageCents: 31,
    medianCents: 27,
  })
  newState.set('287616', {
    minCents: 11,
    maxCents: 186,
    averageCents: 28,
    medianCents: 21,
  })
  newState.set('287617', {
    minCents: 11,
    maxCents: 180,
    averageCents: 28,
    medianCents: 21,
  })
  newState.set('287618', {
    minCents: 11,
    maxCents: 189,
    averageCents: 31,
    medianCents: 27,
  })
  newState.set('287620', {
    minCents: 11,
    maxCents: 163,
    averageCents: 31,
    medianCents: 28,
  })
  newState.set('287621', {
    minCents: 11,
    maxCents: 69,
    averageCents: 30,
    medianCents: 28,
  })
  newState.set('287649', {
    minCents: 12,
    maxCents: 1744,
    averageCents: 60,
    medianCents: 33,
  })
  newState.set('287650', {
    minCents: 11,
    maxCents: 174,
    averageCents: 32,
    medianCents: 27,
  })
  newState.set('287651', {
    minCents: 58,
    maxCents: 626,
    averageCents: 187,
    medianCents: 133,
  })
  newState.set('287652', {
    minCents: 10,
    maxCents: 1744,
    averageCents: 58,
    medianCents: 33,
  })
  newState.set('287709', {
    minCents: 11,
    maxCents: 102,
    averageCents: 35,
    medianCents: 32,
  })
  newState.set('287710', {
    minCents: 11,
    maxCents: 129,
    averageCents: 37,
    medianCents: 33,
  })
  newState.set('287711', {
    minCents: 11,
    maxCents: 69,
    averageCents: 30,
    medianCents: 27,
  })
  newState.set('287712', {
    minCents: 11,
    maxCents: 69,
    averageCents: 27,
    medianCents: 21,
  })
  newState.set('287713', {
    minCents: 11,
    maxCents: 175,
    averageCents: 31,
    medianCents: 27,
  })
  newState.set('287714', {
    minCents: 11,
    maxCents: 69,
    averageCents: 27,
    medianCents: 24,
  })
  newState.set('287716', {
    minCents: 11,
    maxCents: 69,
    averageCents: 30,
    medianCents: 28,
  })
  newState.set('287717', {
    minCents: 11,
    maxCents: 179,
    averageCents: 29,
    medianCents: 24,
  })
  newState.set('287718', {
    minCents: 11,
    maxCents: 69,
    averageCents: 28,
    medianCents: 26,
  })
  newState.set('287719', {
    minCents: 11,
    maxCents: 193,
    averageCents: 33,
    medianCents: 26,
  })
  newState.set('287720', {
    minCents: 58,
    maxCents: 626,
    averageCents: 163,
    medianCents: 129,
  })
  newState.set('287721', {
    minCents: 11,
    maxCents: 182,
    averageCents: 28,
    medianCents: 21,
  })
  newState.set('287722', {
    minCents: 11,
    maxCents: 174,
    averageCents: 31,
    medianCents: 27,
  })
  newState.set('287723', {
    minCents: 11,
    maxCents: 177,
    averageCents: 29,
    medianCents: 24,
  })
  newState.set('287724', {
    minCents: 11,
    maxCents: 133,
    averageCents: 29,
    medianCents: 25,
  })
  newState.set('287725', {
    minCents: 18,
    maxCents: 316,
    averageCents: 71,
    medianCents: 55,
  })
  newState.set('287726', {
    minCents: 11,
    maxCents: 133,
    averageCents: 34,
    medianCents: 27,
  })
  newState.set('287727', {
    minCents: 59,
    maxCents: 751,
    averageCents: 218,
    medianCents: 208,
  })

  newState.set('275351', {
    minCents: 10555,
    maxCents: 24671,
    averageCents: 16117,
    medianCents: 14942,
  })
  newState.set('275757', {
    minCents: 11,
    maxCents: 108,
    averageCents: 27,
    medianCents: 23,
  })
  newState.set('275758', {
    minCents: 12,
    maxCents: 108,
    averageCents: 29,
    medianCents: 27,
  })
  newState.set('275759', {
    minCents: 65,
    maxCents: 1243,
    averageCents: 228,
    medianCents: 173,
  })
  newState.set('275760', {
    minCents: 6,
    maxCents: 108,
    averageCents: 25,
    medianCents: 20,
  })
  newState.set('275761', {
    minCents: 192,
    maxCents: 2365,
    averageCents: 790,
    medianCents: 626,
  })
  return newState
}
