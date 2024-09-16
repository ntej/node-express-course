const express = require('express')
const app = express();
const tasks = require('./routers/tasks') 
const connectDB = require('./db/connect')

require('dotenv').config() //Inits ENV 

//middleware
app.use(express.json())
app.use(express.static('./public')) //Loading UI from the Jhon code
//routes
app.use('/api/v1/tasks/',tasks)

const port = 3000

const start = async ()=>{
    try{
        await connectDB(process.env.MONGO_URI) 

        app.listen(port,()=>{
            console.log(`Server is listening on port ${port}..`);
            
        })
    }catch(err){
       console.log(error); 
    }
}

start();

