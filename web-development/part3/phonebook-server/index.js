require('dotenv').config()

const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const Person = require('./models/person')

morgan.token('body', (req) => JSON.stringify(req.body))

const app = express()
app.use(cors({
  origin: [
    'https://full-stack-open-web-development.onrender.com',
    'http://localhost:5173'
  ]
}))
app.use(express.json())

app.use((req, res, next) => {
  if (req.method === 'POST') {
    morgan(':method :url :status :res[content-length] - :response-time ms :body')(req, res, next)
  } else {
    morgan('tiny')(req, res, next)
  }
})

/* let persons = [
  {
    "id": 1,
    "name": "Arto Hellas",
    "number": "040-123456"
  },
  {
    "id": 2,
    "name": "Ada Lovelace",
    "number": "39-44-5323523"
  },
  {
    "id": 3,
    "name": "Dan Abramov",
    "number": "12-43-234345"
  },
  {
    "id": 4,
    "name": "Mary Poppendieck",
    "number": "39-23-6423122"
  }
] */

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/info', async (request, response) => {
  try {
    const countContacts = await Person.countDocuments({})
    response.send(`
    <div>
    <p>Phonebook has info for ${countContacts} people</p>
    <p>${new Date()}</p>
    </div>`)
  } catch (error) {
    response.status(500).send(error.message);
  }
})

app.get('/api/persons', async (request, response) => {
  try {
    await Person.find({}).then(persons => {
      response.json(persons)
    })
  } catch (error) {
    response.status(500).send(error.message);
  }
})

app.get('/api/persons/:id', async (request, response) => {
  try {
    const person = await Person.findById(request.params.id)
    if (person) {
      response.json(person)
    } else {
      response.status(404).end()
    }
  } catch (error) {
    response.status(400).json({ error: 'malformatted id' })
  }

})

/* const generateId = () => {
  return Math.floor(Math.random() * 10000000)
} */

app.post('/api/persons', async (request, response) => {

  const body = request.body

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


  try {
    const nameExists = await Person.findOne({ name: body.name })
    if (nameExists) {
      return response.status(400).json({
        error: 'name must be unique'
      })
    }

    const person = new Person({
      name: body.name,
      number: body.number,
    })

    const savedPerson = await person.save()
    return response.status(201).json(savedPerson)
  } catch (error) {
    return response.status(500).json({ error: error.message })
  }

})

app.delete('/api/persons/:id', async (request, response) => {
  try {
    await Person.findByIdAndDelete(request.params.id)
    response.status(204).end()
  } catch (error) {
    response.status(400).json({ error: 'malformatted id' })
  }
})

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})