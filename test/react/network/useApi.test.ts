/* eslint-disable @typescript-eslint/await-thenable */
import { act, renderHook } from '@testing-library/react'
import { useApiController } from '../../../src/react/network/useApi'
import * as FetchApiModule from '../../../src/react/network/fetchApi'

type FakeData = {
  id: string
}

const fakeData: FakeData = { id: 'test' }

const PATH = 'test/path'

const FETCH_API = jest
  .spyOn(FetchApiModule, 'fetchApi')
  .mockResolvedValue({ data: fakeData, errors: null, isSuccessful: true })

beforeEach(jest.clearAllMocks)

describe('Use Api Controller', () => {
  it('should init loading and null data', () => {
    const { result } = renderHook(() => useApiController(PATH))
    expect(result.current.isLoading).toEqual(true)
    expect(result.current.data).toBeNull()
  })
  it('should make request', async () => {
    const { result } = renderHook(() => useApiController<FakeData>(PATH))
    await act(async () => await result.current.makeRequest())

    expect(result.current.data).toEqual(fakeData)
    expect(result.current.isLoading).toEqual(false)
    expect(FETCH_API).toHaveBeenCalledWith({ path: PATH })
  })
})
