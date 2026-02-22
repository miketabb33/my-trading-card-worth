export type Success<T> = { kind: 'success'; value: T }
export type Failure = { kind: 'failure'; error: string; code?: string }

export class Result {
  static success = <T>(value: T): Success<T> => ({ kind: 'success', value })
  static failure = (error: string, code?: string): Failure => ({ kind: 'failure', error, code })
}
