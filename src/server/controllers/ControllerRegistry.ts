import { Router } from 'express'
import SetsController from './SetsController'

const ControllerRegistry = Router()

ControllerRegistry.use('/sets', SetsController)

ControllerRegistry.get('*', (_, res) => res.send('Nothing here'))

export default ControllerRegistry
