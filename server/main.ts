import express from 'express'

const app = express()

app.use((req, res) => {
    res.send({})
})
app.listen(4000, () => {
    console.log('http://localhost:4000')
})