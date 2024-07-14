import { fetchApi } from '../../../src/react/network/fetchApi'

const FETCH = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ test: 100 }),
  })
)

global.fetch = FETCH as jest.Mock

describe('Fetch Api', () => {
  it('should call fetch with params', async () => {
    const path = '/test'
    await fetchApi({ path })
    expect(FETCH).toHaveBeenCalledWith(`/api${path}`, {
      headers: { 'content-type': 'application/json' },
      method: 'GET',
    })
  })
})
