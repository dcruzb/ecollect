import express from 'express'
import path from 'path'

const routes = express.Router()

const users = ['Daniel', 'Andreza', 'João']

routes.get('/users', (request, response) => {
    const search = String(request.query.search ? request.query.search : "")

    const filteredUsers = search ? users.filter(user => user.includes(search)) : users

    response.json(filteredUsers)
})

routes.get('/users/:id', (request, response) => {
    const id = Number(request.params.id)

    response.json(users[id])
})

routes.post('/users', (request, response) => {
    const body = request.body

    const user = {
        name: body.name,
        email: body.email
    }

    response.json(user)
})

export default routes