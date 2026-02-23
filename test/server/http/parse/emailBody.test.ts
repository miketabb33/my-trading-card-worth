import { parseEmailBody } from '../../../../src/server/http/parse/emailBody'

describe('parseEmailBody', () => {
  it('should parse', () => {
    const body = {
      to: 'user@example.com',
      subject: 'Hello',
      text: 'World',
    }

    const result = parseEmailBody(body)

    expect(result.to).toEqual(body.to)
    expect(result.subject).toEqual(body.subject)
    expect(result.text).toEqual(body.text)
  })

  it('should throw when data is incorrect', () => {
    expect(() => parseEmailBody({})).toThrow()
  })
})
