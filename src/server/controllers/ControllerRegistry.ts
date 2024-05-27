import { Router } from 'express'
import SetsController from './SetsController'
import ProfileController from './ProfileController'

const ControllerRegistry = Router()

ControllerRegistry.use('/sets', SetsController)
ControllerRegistry.use('/profile', ProfileController)

ControllerRegistry.get('*', (_, res) => res.send('Nothing here'))

export default ControllerRegistry
