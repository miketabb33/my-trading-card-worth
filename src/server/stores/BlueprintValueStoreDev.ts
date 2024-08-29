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
    medianCents: 528,
  })
  newState.set('281992', {
    medianCents: 514,
  })
  newState.set('281993', {
    medianCents: 2297,
  })
  newState.set('281994', {
    medianCents: 2229,
  })
  newState.set('281996', {
    medianCents: 903,
  })
  newState.set('281998', {
    medianCents: 875,
  })
  newState.set('282005', {
    medianCents: 3114,
  })
  newState.set('282006', {
    medianCents: 5594,
  })
  newState.set('282008', {
    medianCents: 254,
  })
  newState.set('282009', {
    medianCents: 45464,
  })
  newState.set('282010', {
    medianCents: 191,
  })
  newState.set('282011', {
    medianCents: 626,
  })
  newState.set('287134', {
    medianCents: 27,
  })
  newState.set('287135', {
    medianCents: 27,
  })
  newState.set('287136', {
    medianCents: 1557,
  })
  newState.set('287137', {
    medianCents: 357,
  })
  newState.set('287138', {
    medianCents: 489,
  })
  newState.set('287139', {
    medianCents: 33,
  })
  newState.set('287140', {
    medianCents: 55,
  })
  newState.set('287141', {
    medianCents: 40,
  })
  newState.set('287142', {
    medianCents: 23,
  })
  newState.set('287143', {
    medianCents: 311,
  })
  newState.set('287144', {
    medianCents: 254,
  })
  newState.set('287145', {
    medianCents: 33,
  })
  newState.set('287146', {
    medianCents: 23,
  })
  newState.set('287147', {
    medianCents: 252,
  })
  newState.set('287148', {
    medianCents: 244,
  })
  newState.set('287149', {
    medianCents: 2033,
  })
  newState.set('287150', {
    medianCents: 32,
  })
  newState.set('287151', {
    medianCents: 31,
  })
  newState.set('287605', {
    medianCents: 21,
  })
  newState.set('287606', {
    medianCents: 26,
  })
  newState.set('287607', {
    medianCents: 28,
  })
  newState.set('287608', {
    medianCents: 33,
  })
  newState.set('287609', {
    medianCents: 26,
  })
  newState.set('287610', {
    medianCents: 26,
  })
  newState.set('287611', {
    medianCents: 24,
  })
  newState.set('287612', {
    medianCents: 32,
  })
  newState.set('287613', {
    medianCents: 26,
  })
  newState.set('287614', {
    medianCents: 25,
  })
  newState.set('287615', {
    medianCents: 27,
  })
  newState.set('287616', {
    medianCents: 21,
  })
  newState.set('287617', {
    medianCents: 21,
  })
  newState.set('287618', {
    medianCents: 27,
  })
  newState.set('287620', {
    medianCents: 28,
  })
  newState.set('287621', {
    medianCents: 28,
  })
  newState.set('287649', {
    medianCents: 33,
  })
  newState.set('287650', {
    medianCents: 27,
  })
  newState.set('287651', {
    medianCents: 133,
  })
  newState.set('287652', {
    medianCents: 33,
  })
  newState.set('287709', {
    medianCents: 32,
  })
  newState.set('287710', {
    medianCents: 33,
  })
  newState.set('287711', {
    medianCents: 27,
  })
  newState.set('287712', {
    medianCents: 21,
  })
  newState.set('287713', {
    medianCents: 27,
  })
  newState.set('287714', {
    medianCents: 24,
  })
  newState.set('287716', {
    medianCents: 28,
  })
  newState.set('287717', {
    medianCents: 24,
  })
  newState.set('287718', {
    medianCents: 26,
  })
  newState.set('287719', {
    medianCents: 26,
  })
  newState.set('287720', {
    medianCents: 129,
  })
  newState.set('287721', {
    medianCents: 21,
  })
  newState.set('287722', {
    medianCents: 27,
  })
  newState.set('287723', {
    medianCents: 24,
  })
  newState.set('287724', {
    medianCents: 25,
  })
  newState.set('287725', {
    medianCents: 55,
  })
  newState.set('287726', {
    medianCents: 27,
  })
  newState.set('287727', {
    medianCents: 208,
  })
  newState.set('275351', {
    medianCents: 14942,
  })
  newState.set('275757', {
    medianCents: 23,
  })
  newState.set('275758', {
    medianCents: 27,
  })
  newState.set('275759', {
    medianCents: 173,
  })
  newState.set('275760', {
    medianCents: 20,
  })
  newState.set('275761', {
    medianCents: 626,
  })
  return newState
}
