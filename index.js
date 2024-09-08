require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()

const mongoose = require('mongoose')
const url = process.env.MONGODB_URI

app.use(cors())
app.use(express.json())
app.use(express.static('dist'))

mongoose.set('strictQuery',false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Person = mongoose.model('Person', personSchema)

app.get('/api/persons', (request, response) => {
    Person.find({}).then(notes => {
      response.json(notes)
    })
  })

app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    const person = persons.find(person => person.id === id)

    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})
  
app.get('/info', (request, response) => {
    const info = `
      <p>Phonebook has info for ${persons.length} people</p>
      <p>${new Date()}</p>
    `
    response.send(info)
})

app.post('/api/persons', (request,response) => {
  const body = request.body
  const newId = Math.floor(Math.random() * 1000000).toString()

  if (!body.name) {
    return response.status(400).json({
      error: 'name missing'
    })
  }

  if (!body.number) {
    return response.status(400).json({
      error: 'number missing'
    })
  }

  if (persons.find(person => person.name === body.name)) {
    return response.status(400).json({
      error: 'name must be unique'
    })
  }

  const newPerson = {
    name: body.name,
    number: body.number,
    id: newId
  }

  persons = persons.concat(newPerson)

  console.log(newPerson)
  response.json(newPerson)
})

app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id
    persons = persons.filter(person => person.id !== id)

    response.status(204).end()
})

app.use((request, response) => {
  response.status(404).send('404 Not Found')
})
  

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})