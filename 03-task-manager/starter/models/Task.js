const mongoose = require('mongoose')

const TaskSchema = new mongoose.Schema({
    name :{
        type : String,
        required : [true,'must provide name'],
        trim : true, //Trim spaces
        maxlength :[20, 'name can not be more than 20 characters']
    },
    completed:{
        type: Boolean,
        default:false
    }
})

//Model for TaskSchema
module.exports = mongoose.model('Tasks',TaskSchema)
