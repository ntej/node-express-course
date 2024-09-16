const Task = require('../models/Task')

const getAllTasks = async (req, res) => {
    try{
       const tasks = await Task.find({})
       res.status(200).json({tasks})
    }catch(error){
        res.status(500).send({msg:error})
    }
}

const createTask = async (req, res) => {
    try {
        const task = await Task.create(req.body)
        res.status(201).json({task})
    } catch (error) {
        res.status(500).send({msg:error})
    }
}

const getTask = async (req, res) => {
    try{
        const {id:taskId} = req.params
        const task = await Task.findOne({_id:taskId});
        if(task){
            return res.status(200).json({task})
        }
        //Ends up this error only if id is wrong sytax i.e like length. If length of id is changes, then catch error is sent with cast exception
        res.status(404).json({msg: `No task with id: ${taskId}`}) 

    }catch(error){        
        res.status(500).send({msg:error})
    }
}

const updateTask = async (req, res) => {
    try {
        const {id:taskId} = req.params;
        const task = await Task.findOneAndUpdate({_id:taskId},req.body,{
            new:true,runValidators:true
        })
       
        if(task){
          return  res.status(200).json({task})
        }
        res.status(404).json({msg: `No task with id: ${taskId}`})
    } catch (error) {

        res.status(500).send({msg:error})
    }
}

const deleteTask = async (req, res) => {
    try{
       const {id:taskId} = req.params
       const task = await Task.findOneAndDelete({_id:taskId});
       if(task){
          return res.status(200).json({task})
          //return res.status(200).send()
          //return res.status(200).json({task:null, msg:'deleted succesfully'})
       }
       res.status(404).json({msg: `No task with id: ${taskId}`})
    }catch(error){
        res.status(500).send({msg:error})
    }
}

module.exports = {
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask
}