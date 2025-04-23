const express = require('express')
const cors = require('cors')

const app = express()

const corsOptions = {
  origin: process.env.CORS_ORIGIN || '*',
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: 'Content-Type,Authorization',
}

app.use(cors(corsOptions))

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use("/", indexRouter)

app.listen(3000, (err) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log('Server is running on port 3000')
})

