declare namespace Express {
  interface Request {
    currentUser: import('@prisma/client').User | null
  }
  interface Response {
    sendData: <T>(args: { data: T; status?: number }) => void
    sendError: (args: { errors: string[]; status?: number }) => void
    sendSuccess: (args?: { status?: number }) => void
  }
}
