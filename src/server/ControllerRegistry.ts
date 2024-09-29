import { Router } from 'express'
import ProfileController from './controllers/ProfileController'
import CollectionController from './controllers/CollectionController'
import CatalogController from './controllers/CatalogController'
import StoreController from './controllers/StoreController'
import ReleaseController from './controllers/ReleaseController'

const ControllerRegistry = Router()

ControllerRegistry.use('/catalog', CatalogController)
ControllerRegistry.use('/profile', ProfileController)
ControllerRegistry.use('/collection', CollectionController)
ControllerRegistry.use('/store', StoreController)
ControllerRegistry.use('/release', ReleaseController)

ControllerRegistry.get('*', (_, res) => res.send('Nothing here'))

export default ControllerRegistry
