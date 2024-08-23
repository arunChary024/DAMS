const http = require('http')
const path = require('path')
const express = require('express')
const cors = require('cors')

const app = express()
const port = process.env.PORT || 4000

app.use(cors())
app.use(express.json())

app.use(express.static(path.join(__dirname, 'public')))

app.use('/', require('./routes/pages'))
app.use('/api/users', require('./routes/user'))
app.use('/api/admin', require('./routes/admin'))
app.use('/api/specialist', require('./routes/specialist'))

const server = http.createServer(app)

server.listen(port, ()=>console.log(`Server running at http://locahost:${port}`))