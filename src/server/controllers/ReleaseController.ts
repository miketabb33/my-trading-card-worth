import { Router } from 'express'
import { ListReleases } from '../clients/Github/GithubClient'
import { asyncHandler } from '../http/asyncHandler'

const ReleaseController = Router()

ReleaseController.get(
  '/list',
  asyncHandler(async (_, res) => {
    const releases = await ListReleases()
    res.sendData({ data: releases })
  })
)

export default ReleaseController
