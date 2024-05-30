import { Router } from 'express'
import ProfileController from './ProfileController'
import MyCardController from './myCard/MyCardController'
import SetsController from './SetsController'

const ControllerRegistry = Router()

ControllerRegistry.use('/sets', SetsController)
ControllerRegistry.use('/profile', ProfileController)
ControllerRegistry.use('/my-card', MyCardController)

ControllerRegistry.get('*', (_, res) => res.send('Nothing here'))

export default ControllerRegistry
