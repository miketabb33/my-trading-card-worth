export class Result<T> {
  private constructor(
    private readonly inner: { kind: 'success'; value: T } | { kind: 'failure'; error: string; code?: string }
  ) {}

  static success = <T>(value: T): Result<T> => new Result<T>({ kind: 'success', value })
  static failure = <T>(error: string, code?: string): Result<T> =>
    new Result<T>({ kind: 'failure', error, ...(code && { code }) })

  isSuccess = (): boolean => this.inner.kind === 'success'
  isFailure = (): boolean => this.inner.kind === 'failure'

  get value(): T {
    if (this.inner.kind === 'failure') throw new Error('Cannot access value of a failure result')
    return this.inner.value
  }

  get error(): string {
    if (this.inner.kind === 'success') throw new Error('Cannot access error of a success result')
    return this.inner.error
  }

  get code(): string | undefined {
    if (this.inner.kind === 'success') return undefined
    return this.inner.code
  }
}
