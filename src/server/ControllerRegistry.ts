import { Router } from 'express'
import ProfileController from './controllers/ProfileController'
import MyCardController from './controllers/MyCardController'
import SetController from './controllers/SetController'

const ControllerRegistry = Router()

ControllerRegistry.use('/sets', SetController)
ControllerRegistry.use('/profile', ProfileController)
ControllerRegistry.use('/my-card', MyCardController)

ControllerRegistry.get('*', (_, res) => res.send('Nothing here'))

export default ControllerRegistry
