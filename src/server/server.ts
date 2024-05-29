import express from 'express'
import path from 'path'
import ControllerRegistry from './controllers/ControllerRegistry'
import { auth } from 'express-openid-connect'
import { auth0Config } from './auth0/auth0Config'
import { connectToDb } from './database/connectToDb'

const app = express()
const port = process.env.PORT || 3000

connectToDb().catch(console.dir)

app.use(auth(auth0Config))

app.use(express.static(`${__dirname}/public`))
app.use('/api', ControllerRegistry)

app.get('*', (_, res) => {
  res.sendFile(path.join(__dirname, '/index.html'))
})

app.listen(port, () => {
  console.log(`SERVER: listening on port ${port}`)
})
