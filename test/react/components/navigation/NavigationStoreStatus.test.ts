import { renderHook } from '@testing-library/react'
import { useInNavigationStoreStatus } from '../../../../src/react/components/navigation/NavigationStoreStatus'
import * as StoreStatusProviderModule from '../../../../src/react/providers/StoreStatusProvider'
import { STORE_STATUS_CONTEXT_TYPE } from '../../__MOCKS__/storeStatusContextType.mock'
import { STORE_STATUS_DTO } from '../../../core/__MOCKS__/store.mock'

const USE_STORE_STATUS = jest.spyOn(StoreStatusProviderModule, 'useStoreStatus')

describe('Use In Navigation Store Status', () => {
  it('should return empty string when store status is null', () => {
    USE_STORE_STATUS.mockReturnValue({
      ...STORE_STATUS_CONTEXT_TYPE,
      storeStatus: null,
    })
    const { result } = renderHook(useInNavigationStoreStatus)
    expect(result.current.pricesStatus).toEqual('')
  })

  it('should return status when store status dto has a value that is NOT null', () => {
    USE_STORE_STATUS.mockReturnValue({
      ...STORE_STATUS_CONTEXT_TYPE,
      storeStatus: STORE_STATUS_DTO,
    })
    const { result } = renderHook(useInNavigationStoreStatus)
    const pricesDate = new Date(STORE_STATUS_DTO.pricesLastUpdatedDateString!)
    expect(result.current.pricesStatus).toEqual(`Last Updated ${pricesDate.toLocaleString()}`)
  })

  it('should return status when store status dto has a value that is null', () => {
    USE_STORE_STATUS.mockReturnValue({
      ...STORE_STATUS_CONTEXT_TYPE,
      storeStatus: {
        ...STORE_STATUS_DTO,
        pricesLastUpdatedDateString: null,
      },
    })
    const { result } = renderHook(useInNavigationStoreStatus)
    expect(result.current.pricesStatus).toEqual('Loading... Try again later')
  })
})
