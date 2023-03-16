//index.js is a express server
const connectToMongo = require('./db');
const express = require('express')
var cors = require('cors') 

connectToMongo();
const app = express()
const port = 5000

app.use(cors())

app.use(express.json()) //middleware to get printed console.log(req.body) in console.Refer notes copy also

// Available Routes
//app.use takes a first optional argument that is a string which represents a path or a path prefix and then it takes any number of middleware function references after that.
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))


app.listen(port, () => {
  console.log(`iNotebook backend listening at http://localhost:${port}`)
})