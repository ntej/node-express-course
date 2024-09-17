const express = require('express')
const app = express();
const tasks = require('./routers/tasks') 
const connectDB = require('./db/connect')

require('dotenv').config() //Inits ENV 

const notFound = require('./middleware/notefound')
const errorHandler = require('./middleware/errorHandler')

//middleware
app.use(express.json())
app.use(express.static('./public')) //Loading UI from the Jhon code

//routes
app.use('/api/v1/tasks/',tasks)

//This order is important . Beacuse this route should only work if route does not found in known routes(above)
app.use(notFound) //Middleware for the unkown routes

app.use(errorHandler) //Error Handler

//Set port to what ever enviorment variable is set. Used in prod as app can run on any port
//In local enviorment  process.env.port is not set.
//You can set by $PORT=6000 node app.js 
const port = process.env.port || 3000

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

