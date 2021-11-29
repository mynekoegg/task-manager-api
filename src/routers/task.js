const express = require('express')
const Task = require('../models/task')
const auth = require('../middleware/auth')
const router = new express.Router()


/*** Create tasks ***/
router.post('/tasks', auth, async (req,res)=>{
    
    const task  = new Task({
        ...req.body,
        owner: req.user._id
    })
    try{
        await task.save()
        res.status(201).send(task)
    }catch(e){
        res.status(400).send()
    }
})

// GET /tasks?completed=true
// GET /tasks?limit=10&skip=0 first page 10 skip=10 2nd page skip=20 3rd page
// GET /tasks?sortBy=createdAt_asc or createdAt_desc //createdAt: -1 //negative 1 by desc

router.get('/tasks', auth, async (req,res)=>{
    const match = {}
    if (req.query.completed){
        match.completed = req.query.completed === 'true'
    }
    const sort = {}
    if(req.query.sortBy){
        const parts = req.query.sortBy.split('_')
        sort[parts[0]] = parts[1] ==='desc'? -1:1 //when true is -1 , not true is 1
    }
    try {

        await req.user.populate({
            path: 'tasks',
            match,
            options: {
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                sort
            }
        })
        res.send(req.user.tasks)

    } catch(e){
        
        res.status(500).send()
    }
})

/* get task by ID or by owner */
router.get('/tasks/:id', auth, async (req,res)=>{
    const _id = req.params.id
    try {
        
        const task = await Task.findOne({_id, owner: req.user._id})
        if(!task){
            return res.status(404).send()
        }
        res.send(task)
    } catch(e){
        res.status(500).send()
    }
})

router.patch('/tasks/:id', auth, async(req, res)=>{
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description','completed']
    const isValidOperation = updates.every((update)=> allowedUpdates.includes(update))

    if(!isValidOperation){
        return res.status(400).send({'error': 'invalid update'})
    }

    try{
        const task = await Task.findOne({_id: req.params.id, owner: req.user._id})

        updates.forEach((update)=>task[update]= req.body[update])
        
        await task.save()
        //const task = await Task.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})
        if(!task){
            return res.status(404).send()
        }
        res.send(task)
    }catch(e){
        res.status(400).send()
    }
})

router.delete('/tasks/:id', auth, async (req,res)=>{
    
    try {
        const task = await Task.findOneAndDelete({_id: req.params.id, owner: req.user._id})
        
        if(!task){
            return res.status(404).send()
        }
        res.send(task)
    } catch(e){
        res.status(400).send()
    }
})

module.exports= router