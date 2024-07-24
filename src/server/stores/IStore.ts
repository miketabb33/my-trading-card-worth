export interface IStore<T> {
  getState: () => T
  getLastUpdated: () => Date | null
  refreshStore: () => Promise<void>
}
