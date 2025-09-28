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

app.get('/api/persons', async (request, response, next) => {
  await Person.find({})
    .then(persons => {
      response.json(persons)
    })
    .catch(error => next(error))
})

app.get('/api/persons/:id', async (request, response, next) => {
  await Person.findById(request.params.id)
    .then(person => {
      if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
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
    next(error)
  }

})

app.put('/api/persons/:id', async (request, response, next) => {
  await Person.findByIdAndUpdate(request.params.id, request.body)
    .then(person => {
      if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))

})


app.delete('/api/persons/:id', async (request, response, next) => {
  await Person.findByIdAndDelete(request.params.id)
    .then((person) => {
      if (person) {
        response.status(204).end()
      } else {
        return response.status(404).end()
      }
    })
    .catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }

  if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  if (error.name === 'MongoServerError') {
    return response.status(400).json({ error: error.message })
  }

  if (!response.headersSent) {
    response.status(500).json({ error: 'internal server error' })
  }
  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})