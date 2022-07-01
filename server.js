// Required Modules //

const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
const PORT = 8000
require('dotenv').config()

// Connected to Database //

let db,
    dbConnectionStr = process.env.DB_STRING
    dbName = 'myDnDChars'

MongoClient.connect(dbConnectionStr, {useUnifiedTopology: true})
    .then(client => {
        console.log(`Connected to ${dbName} Database`)
        db = client.db(dbName)
    })

// Setup Server //

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))
app.use(express.json())

// API // 

app.get('/',(req, res)=>{
    db.collection('characters').find().sort({likes: -1}).toArray()
    .then(data => {
        res.render('index.ejs', {info: data})
    })
    .cath(error => console.error(error))
})

app.post('/addCharacter', (req, res)=>{
    db.collection('characters').insertOne({characterName: req.body.characterName,
    className: req.body.className, likes: 0})
    .then(res => {
        console.log('Character Added')
        res.redirect('/')
    })
})

app.put('/addOneLike', (req, res)=>{
    db.collection('characters').updateOne({characterName: req.body.characterNameS, className: req.body.classNameS, likes: req.body.likesS},{
        $set: {
            likes: req.body.likesS + 1
        }
    },{
        sort: {_id: -1},
        upsert: true
    })
    .then(res => {
        console.log('Added One Like')
        res.json('Like Added')
    })
    .catch(error => console.error(error))
})


app.delete('/deleteCharacter', (req, res)=>{
    db.collection('characters').deleteOne({characterName: req.body.characterNameS})
    .then(res => {
        console.log('Character Deleted')
        res.json('Character Deleted')
    })
    .catch(error => console.error(error))
})

// App Listener //

app.listen(process.env.PORT || PORT, () => {
    console.log(`Server running on port ${PORT}`) 
})