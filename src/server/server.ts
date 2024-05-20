import express from 'express'
import path from 'path'
import ControllerRegistry from './controllers/ControllerRegistry'

const app = express()
const port = process.env.PORT || 3000

app.use(express.static(`${__dirname}/public`))
app.use('/api', ControllerRegistry)

app.get('*', (_, res) => {
  res.sendFile(path.join(__dirname, '/index.html'))
})

app.listen(port, () => {
  console.log(`SERVER: listening on port ${port}`)
})
