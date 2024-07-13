import { Router } from 'express'
import ProfileController from './controllers/ProfileController'
import CollectionController from './controllers/CollectionController'
import CatalogController from './controllers/CatalogController'

const ControllerRegistry = Router()

ControllerRegistry.use('/catalog', CatalogController)
ControllerRegistry.use('/profile', ProfileController)
ControllerRegistry.use('/collection', CollectionController)

ControllerRegistry.get('*', (_, res) => res.send('Nothing here'))

export default ControllerRegistry
