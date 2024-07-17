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

  it('should return status when store status has value', () => {
    USE_STORE_STATUS.mockReturnValue({
      ...STORE_STATUS_CONTEXT_TYPE,
      storeStatus: STORE_STATUS_DTO,
    })
    const { result } = renderHook(useInNavigationStoreStatus)
    expect(result.current.expansionStatus).toEqual(
      STORE_STATUS_DTO.expansionsStatus
    )
    expect(result.current.pricesStatus).toEqual(STORE_STATUS_DTO.pricesStatus)
  })
})
