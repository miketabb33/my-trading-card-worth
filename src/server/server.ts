import express from 'express'
import path from 'path'
import ControllerRegistry from './ControllerRegistry'
import { auth } from 'express-openid-connect'
import { auth0Config } from './auth0/auth0Config'
import { connectToDb } from './database/connectToDb'
// import { prisma } from './database/prismaClient'
import bodyParser from 'body-parser'
import Store from './StoreRegistry'
import CronJobs from './CronJobRegistry'
import Logger from './logger'
import { formatError } from './logic/formatResponse'

const app = express()
const port = process.env.PORT || 3000

app.use(auth(auth0Config))

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(express.static(`${__dirname}/public`))
app.use('/api', ControllerRegistry)

app.get('*', (_, res) => {
  res.sendFile(path.join(__dirname, '/index.html'))
})

app.listen(port, () => {
  Logger.info(`Server is listening on port ${port}`)
})

connectToDb()
  .then(() => {
    Logger.info('Database successfully connected')
  })
  .catch((e) => {
    Logger.info('Error connecting to database')
    const error = formatError(e)
    Logger.error(error)
  })

// prisma
//   .$connect()
//   .then(() => Logger.info('Postgres database successfully connected'))
//   .catch((e) => {
//     Logger.info('Error connecting to Postgres database')
//     const error = formatError(e)
//     Logger.error(error)
//   })

Store.init()
  .then(() => Logger.info('Stores data loaded'))
  .catch((e) => {
    Logger.info('Error in initialize stores')
    const error = formatError(e)
    Logger.error(error)
  })

CronJobs.start()
