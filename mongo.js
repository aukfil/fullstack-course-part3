const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://fullstack:${password}@cluster0.2bhgm.mongodb.net/phonebook?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery',false)

mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

// const person = new Person({
//   name: 'Arto Vihavainen',
//   number: '045-1232456',
// })

// person.save().then(result => {
//   console.log('person saved!')
//   mongoose.connection.close()
// })

Person.find({}).then(result => {
  console.log('phonebook:')
  result.forEach(person => {
    console.log(person.name, person.number)
  })
  mongoose.connection.close()
})