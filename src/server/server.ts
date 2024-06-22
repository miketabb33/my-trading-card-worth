import express from 'express'
import path from 'path'
import ControllerRegistry from './ControllerRegistry'
import { auth } from 'express-openid-connect'
import { auth0Config } from './auth0/auth0Config'
import { connectToDb } from './database/connectToDb'
import bodyParser from 'body-parser'
import CardTraderAdaptor from './clients/CardTrader/CardTraderAdaptor'

const app = express()
const port = process.env.PORT || 3000

connectToDb().catch(console.dir)

app.use(auth(auth0Config))

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(express.static(`${__dirname}/public`))
app.use('/api', ControllerRegistry)

app.get('*', (_, res) => {
  res.sendFile(path.join(__dirname, '/index.html'))
})

app.listen(port, () => {
  console.log(`SERVER: listening on port ${port}`)
})

const adapt = new CardTraderAdaptor()
adapt
  .getPokemonCardValues(1484)
  .then((res) => {
    console.log(res)
    console.log('Complete')
  })
  .catch(console.dir)
