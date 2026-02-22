import { Result } from '../../../src/server/use-cases/Result'

describe('Result', () => {
  describe('success', () => {
    it('isSuccess returns true', () => {
      const result = Result.success('value')
      expect(result.isSuccess()).toBe(true)
    })

    it('isFailure returns false', () => {
      const result = Result.success('value')
      expect(result.isFailure()).toBe(false)
    })

    it('value returns the wrapped value', () => {
      const result = Result.success({ id: 1 })
      expect(result.value).toEqual({ id: 1 })
    })

    it('error throws', () => {
      const result = Result.success('value')
      expect(() => result.error).toThrow()
    })

    it('code returns undefined', () => {
      const result = Result.success('value')
      expect(result.code).toBeUndefined()
    })
  })

  describe('failure', () => {
    it('isFailure returns true', () => {
      const result = Result.failure('something went wrong')
      expect(result.isFailure()).toBe(true)
    })

    it('isSuccess returns false', () => {
      const result = Result.failure('something went wrong')
      expect(result.isSuccess()).toBe(false)
    })

    it('error returns the error message', () => {
      const result = Result.failure('something went wrong')
      expect(result.error).toBe('something went wrong')
    })

    it('code returns the code when provided', () => {
      const result = Result.failure('not found', 'NOT_FOUND')
      expect(result.code).toBe('NOT_FOUND')
    })

    it('code returns undefined when not provided', () => {
      const result = Result.failure('something went wrong')
      expect(result.code).toBeUndefined()
    })

    it('value throws', () => {
      const result = Result.failure('something went wrong')
      expect(() => result.value).toThrow()
    })
  })
})
