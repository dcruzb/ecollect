import express from 'express'

const app = express()

app.get('/users', (request, response) => {
    console.log('Users list')

    response.json(['Daniel', 'Andreza', 'João'])
})

app.listen(3333)