const express = require('express')
const mongoose = require('mongoose')
const app = express()
app.use(express.json())
const port = 3040

mongoose.connect('mongodb://localhost:27017/task-dct')
.then(()=>{
    console.log('connected to db')
})
.catch((err)=>{
    console.log('error connecting to db',err)
})

//create a task Schema
const Schema = mongoose.Schema
const taskSchema = new Schema({
    title: {
        type: String
    },
    description: {
        type: String
    },
    completed: {
        type: Boolean
    }
})

const Task = mongoose.model('Task', taskSchema)

app.get('/',(req,res)=>{
    res.send('welcome to the website')
})

app.get('/api/tasks/:id',(req,res)=>{
    const id = req.params.id 
    Task.findById(id)
    .then((task)=>{
        res.json(task)
    })
    .catch((err)=>{
        res.json(err)
    }) 
})

//task api 
app.get('/api/tasks', (req,res)=>{
    Task.find()
       .then((tasks)=>{
        res.json(tasks)
       })
       .catch((err)=>{
        res.json(err)
       })
 })

app.put('/api/tasks/:id',(req,res)=>{
    const id = req.params.id
    const body = req.body 
    Task.findByIdAndUpdate(id, body,{new:true,runValidators:true})
        .then((task)=>{
            res.json(task)
        })
        .catch((err)=>{
            res.json(err)
        })
})

app.post('/api/tasks',(req,res)=>{
    const body = req.body
    const task = new Task(body)
    task.save()
        .then((task)=>{
            res.json(task)
        })
        .catch((err)=>{
            res.json(err)
        })
})

app.delete('/api/tasks/:id',(req,res)=>{
    const id = req.params.id 
    Task.findByIdAndDelete(id)
        .then((task)=>{
            res.json(task)
        })
        .catch((err)=>{
            res.json(err)
        })
})

app.listen(port, ()=>{
    console.log('server running on port ',port)
})