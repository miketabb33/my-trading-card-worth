import { renderHook } from '@testing-library/react'
import * as RouterModule from '../../../../src/react/router/useRouter'
import { USE_ROUTER_RETURN } from '../../__MOCKS__/useRouterReturn.mock'
import { useInNavigationOptions } from '../../../../src/react/components/navigation/NavigationOptions'

const USE_ROUTER = jest.spyOn(RouterModule, 'useRouter')

describe('Navigation Options', () => {
  it('should return collection is selected when pathname is collection', () => {
    USE_ROUTER.mockReturnValue({
      ...USE_ROUTER_RETURN,
      pathname: '/collection',
    })

    const { result } = renderHook(useInNavigationOptions)

    expect(result.current.collectionIsSelected).toEqual(true)
    expect(result.current.catalogIsSelected).toEqual(false)
  })

  it('should return catalog is selected when pathname is catalog', () => {
    USE_ROUTER.mockReturnValue({
      ...USE_ROUTER_RETURN,
      pathname: '/catalog',
    })

    const { result } = renderHook(useInNavigationOptions)

    expect(result.current.collectionIsSelected).toEqual(false)
    expect(result.current.catalogIsSelected).toEqual(true)
  })

  it('should return catalog is selected when pathname includes catalog', () => {
    USE_ROUTER.mockReturnValue({
      ...USE_ROUTER_RETURN,
      pathname: '/catalog/any-sub-route',
    })

    const { result } = renderHook(useInNavigationOptions)

    expect(result.current.collectionIsSelected).toEqual(false)
    expect(result.current.catalogIsSelected).toEqual(true)
  })
})
