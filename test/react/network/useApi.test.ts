/* eslint-disable @typescript-eslint/await-thenable */
import { act, renderHook } from '@testing-library/react'
import { UseApiArgs, useApiController } from '../../../src/react/network/useApi'
import * as FetchApiModule from '../../../src/react/network/fetchApi'
import { ResponseDto } from '../../../src/core/types/ResponseDto'

type FakeData = {
  id: string
}

const fakeData: FakeData = { id: 'test' }

const USE_API_ARGS: UseApiArgs = { path: 'test/path' }

const FETCH_API_RETURN: ResponseDto<FakeData> = {
  data: null,
  errors: null,
  isSuccessful: true,
}

const FETCH_API = jest.spyOn(FetchApiModule, 'fetchApi')

FETCH_API.mockResolvedValue({ ...FETCH_API_RETURN, data: fakeData })

beforeEach(jest.clearAllMocks)

describe('Use Api Controller', () => {
  it('should init loading and null data', () => {
    const { result } = renderHook(() => useApiController(USE_API_ARGS))
    expect(result.current.isLoading).toEqual(true)
    expect(result.current.data).toBeNull()
  })
  it('should make request', async () => {
    const { result } = renderHook(() =>
      useApiController<FakeData>(USE_API_ARGS)
    )
    await act(async () => await result.current.makeRequest())

    expect(result.current.data).toEqual(fakeData)
    expect(result.current.isLoading).toEqual(false)
    expect(result.current.errors).toEqual(null)
    expect(FETCH_API).toHaveBeenCalledWith({ path: USE_API_ARGS.path })
  })

  it('should set error when response body error occurs', async () => {
    const errors = ['error1', 'error2']

    FETCH_API.mockResolvedValue({
      ...FETCH_API_RETURN,
      errors,
      isSuccessful: false,
    })

    const { result } = renderHook(() =>
      useApiController<FakeData>(USE_API_ARGS)
    )
    await act(async () => await result.current.makeRequest())

    expect(result.current.data).toEqual(null)
    expect(result.current.isLoading).toEqual(false)
    expect(result.current.errors).toEqual(errors)
    expect(FETCH_API).toHaveBeenCalledWith({ path: USE_API_ARGS.path })
  })

  it('should set error when unexpected error occurs', async () => {
    FETCH_API.mockRejectedValue('Any error caught in catch block')

    const { result } = renderHook(() =>
      useApiController<FakeData>(USE_API_ARGS)
    )
    await act(async () => await result.current.makeRequest())

    expect(result.current.data).toEqual(null)
    expect(result.current.isLoading).toEqual(false)
    expect(result.current.errors).toEqual(['Unexpected Error'])
    expect(FETCH_API).toHaveBeenCalledWith({ path: USE_API_ARGS.path })
  })

  it('should not call fetch api when should not make request equals true', async () => {
    const { result } = renderHook(() =>
      useApiController<FakeData>({
        ...USE_API_ARGS,
        shouldMakeRequest: false,
      })
    )

    await act(async () => await result.current.makeRequest())

    expect(FETCH_API).not.toHaveBeenCalled()
    expect(result.current.isLoading).toEqual(false)
    expect(result.current.errors).toEqual(null)
  })
})
