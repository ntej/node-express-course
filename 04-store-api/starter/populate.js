require('dotenv').config()

const connectDB = require('./db/connect')
const connetcDB = require('./db/connect')
const Product = require('./models/product')

const jsonProducts = require('./products.json')

const start = async ()=>{
    try {
        await connectDB(process.env.MONGO_URI)
        await Product.deleteMany(); //Deletes all products from DB 
        await Product.create(jsonProducts)
        console.log('success');
        process.exit(0)
        
    } catch (error) {
        console.log(error);
        process.exit(1)
    }
}

start()