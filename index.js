const express = require('express')
const res = require('express/lib/response')
const mongoose = require('mongoose')

const app = express()
app.use(express.json())
const port = 3055
//application middleware function
app.use(function (req, res, next) {
    console.log(`${req.method} - ${req.url} - ${req.ip} - ${new Date()}`)
    next()
})

mongoose.connect('mongodb://localhost:27017/practice1')
    .then(() => {
        console.log('connected to db')
    })
    .catch((err) => {
        console.log('not connect',err)
    })
//creating scema
const schema = mongoose.Schema
const taskSchema=schema 
    ({
        title: {
            type: String,
            required:[true,'title cannot be blank']
    },
        description: {
        type:String
    },
        completed: {
        type:Boolean
    },
        dueDate: {
        type:Date
    },
        createdDate: {
            type: Date,
            default:Date.now
    }
})
//creating model
const Task = mongoose.model('tasks', taskSchema)

//get
app.get('/api/tasks', (req, res) => {
    Task.find()
    .then((task) => {
        res.json(task)
    })
    .catch((err) => {
        res.json(err)
    })
})
//task post
app.post('/api/tasks', (req, res) => {
    const body = req.body
    const task = new Task(body)
    // task.title = body.title
    // task.description = body.description
    // task.completed=body.completed
    // task.dueDate = body.dueDate
    // task.createdDate=body.createdDate
    task.save()
        .then((task) => {
            res.json(task)
        })
        .catch((err) => {
        res.json(err)
    })

})

//to stup one particular record view ud
app.get('/api/tasks/:id', (req, res) => {
    const id = req.params.id
    Task.findById(id)
        .then((task) => {
            res.json(task)
        })
        .catch((err) => {
        res.json(err)
    })
})

//to update
app.put('/api/tasks/:id', (req, res) => {
    const id = req.params.id
    const body = req.body
    Task.findByIdAndUpdate(id, body,{new:true,runValidators:true})
        .then((task) => {
            res.json(task)
        })
        .catch((err) => {
            res.json(err)
        })
})

//to delete
app.delete('/api/tasks/:id', (req, res) => {
    const id = req.params.id
    Task.findByIdAndDelete(id)
        .then((task) => {
            res.json(task)
        })
        .catch((err) => {
        res.json(err)
    })
})

app.get('/api/error', (req, res) => {
    throw new Error('not authorized')
})

//error handeling middleware
app.use(function (err, req, res, next) {
    console.log('error handeling middel ware function')
    res.send(err.message)
})

app.listen(port, () => {
    console.log('port',port)
})