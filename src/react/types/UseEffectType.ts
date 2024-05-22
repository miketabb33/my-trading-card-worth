import { DependencyList, EffectCallback } from 'react'

export type UseEffectType = {
  effect: EffectCallback
  deps?: DependencyList
}
