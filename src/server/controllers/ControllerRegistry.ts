import { Router } from 'express'
import CardController from './CardController'

const ControllerRegistry = Router()

ControllerRegistry.use('/cards', CardController)

ControllerRegistry.get('*', (_, res) => res.send('Nothing here'))

export default ControllerRegistry
