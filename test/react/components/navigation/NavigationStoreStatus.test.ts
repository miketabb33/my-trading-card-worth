import { renderHook } from '@testing-library/react'
import { useInNavigationStoreStatus } from '../../../../src/react/components/navigation/NavigationStoreStatus'
import * as StoreStatusProviderModule from '../../../../src/react/providers/StoreStatusProvider'
import { STORE_STATUS_CONTEXT_TYPE } from '../../__MOCKS__/storeStatusContextType.mock'
import { STORE_STATUS_DTO } from '../../../core/__MOCKS__/storeStatusDto.mock'

const USE_STORE_STATUS = jest.spyOn(StoreStatusProviderModule, 'useStoreStatus')

describe('Use In Navigation Store Status', () => {
  it('should return empty strings when store status is null', () => {
    USE_STORE_STATUS.mockReturnValue({
      ...STORE_STATUS_CONTEXT_TYPE,
      storeStatus: null,
    })
    const { result } = renderHook(useInNavigationStoreStatus)
    expect(result.current.expansionStatus).toEqual('')
    expect(result.current.pricesStatus).toEqual('')
  })

  it('should return status when store status dto has values that are NOT null', () => {
    USE_STORE_STATUS.mockReturnValue({
      ...STORE_STATUS_CONTEXT_TYPE,
      storeStatus: STORE_STATUS_DTO,
    })
    const { result } = renderHook(useInNavigationStoreStatus)
    const expansionDate = new Date(STORE_STATUS_DTO.expansionsLastUpdatedDateString!)
    const pricesDate = new Date(STORE_STATUS_DTO.pricesLastUpdatedDateString!)
    expect(result.current.expansionStatus).toEqual(`Last Updated ${expansionDate.toLocaleString()}`)
    expect(result.current.pricesStatus).toEqual(`Last Updated ${pricesDate.toLocaleString()}`)
  })

  it('should return status when store status dto has values that are null', () => {
    USE_STORE_STATUS.mockReturnValue({
      ...STORE_STATUS_CONTEXT_TYPE,
      storeStatus: {
        ...STORE_STATUS_DTO,
        expansionsLastUpdatedDateString: null,
        pricesLastUpdatedDateString: null,
      },
    })
    const { result } = renderHook(useInNavigationStoreStatus)

    expect(result.current.expansionStatus).toEqual('Loading... Try again later')
    expect(result.current.pricesStatus).toEqual('Loading... Try again later')
  })
})
