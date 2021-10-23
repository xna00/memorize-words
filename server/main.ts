import express from 'express'
import db from './plugins/db'

const app = express()

db(app)

app.use((req, res) => {
    res.send({})
})
app.listen(4000, () => {
    console.log('http://localhost:4000')
})