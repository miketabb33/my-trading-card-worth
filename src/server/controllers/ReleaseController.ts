/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { formatError, formatResponse } from '../logic/formatResponse'
import Logger from '../logger'
import { ListReleases } from '../clients/Github/GithubClient'

const ReleaseController = Router()

ReleaseController.get('/list', async (_, res) => {
  try {
    const releases = await ListReleases()
    res.send(formatResponse({ data: releases }))
  } catch (e) {
    const error = formatError(e)
    Logger.error(error)
    res.send(formatResponse({ errors: [error.message] }))
  }
})

export default ReleaseController
