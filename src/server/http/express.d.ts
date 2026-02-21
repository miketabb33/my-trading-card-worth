declare namespace Express {
  interface Response {
    sendData: <T>(args: { data: T; status?: number }) => void
    sendError: (args: { errors: string[]; status?: number }) => void
    sendSuccess: (args?: { status?: number }) => void
  }
}
