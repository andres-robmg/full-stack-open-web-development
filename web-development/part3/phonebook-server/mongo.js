const mongoose = require('mongoose')

const password = process.argv[2]

const url =
    `mongodb+srv://db_admin:${password}@cluster0.flheoxb.mongodb.net/PhonebookApp?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery', false)

mongoose.connect(url)

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Person = mongoose.model('Person', personSchema)

// if the command has less than 3 arguments
if (process.argv.length < 3) {
    console.log('give password as argument')
    process.exit(1)
}

// if the command has only PASSWORD
if (process.argv.length === 3) {
    console.log('phonebook:')
    Person.find({}).then(result => {
        result.forEach(person => {
            console.log(person.name, person.number)
        })
        mongoose.connection.close()
    })
}

// if the command has PASSWORD, NAME and NUMBER
if (process.argv.length === 5) {

    const person = new Person({
        name: `${process.argv[3]}`,
        number: `${process.argv[4]}`,
    })

    person.save().then(() => {
        console.log(`added ${person.name} number ${person.number} to phonebook`)
        mongoose.connection.close()
    })
}






/* */
