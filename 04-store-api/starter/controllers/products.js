const Product = require('../models/product')

const getAllProductstatic = async (req,res)=>{
   // const product = await Product.find({featured:true})
   const search = 'ab'
    const products = await Product.find ({price:{$gt:30}})
    .sort('price')
    .select('name price')

    res.status(200).json({nbOfHits:products.length,products})
}

const getAllProduct = async (req,res)=>{
    const {featured,company,name, sort, fields, numericFilters} = req.query
    const queryObject ={}

    //FILTERING
    if(featured){
        queryObject.featured = featured ==='true'? true:false
    }
    if(company){
        queryObject.company = company
    }
    if(name){
        queryObject.name = {$regex: name, $options: 'i'} //query operator
    }


    //NUMERIC FILTERING
    console.log(numericFilters);
    
    
    if(numericFilters){
        const opertorMap ={
            '>' : '$gt',
            '>=' : '$gte',
            '=' : '$eq',
            '<' : '$lt',
            '<=' : '$lte'
        }
        const regex = /\b(<|>|>=|=|<|<=)\b/g
        
        let filters = numericFilters.replace(
            regex,
            (match)=>`-${opertorMap[match]}-` 
        )

        console.log(filters);

        const options = ['price','rating']
       
        filters = filters.split(',').forEach((item)=>{
            const [field,operator,value] = item.split('-')
            if(options.includes(field)){
                queryObject[field] = {[operator]:Number(value)}
            }
        })
    }

    console.log(queryObject);
    
    
    let result =  Product.find(queryObject)

    //SORTING
    if(sort){
        const sortList = sort.split(',').join(' ') //split by , and joint with empty spaces
       
        console.log(sortList); 

        result = result.sort(sortList)
    }else{
        result = result.sort('createdAt')
    }

    //TRANSFORM
    if(fields){
        const feildsList = fields.split(',').join(' ')
        result = result.select(feildsList)
    }

    //PAGINATION
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10
    const skip = (page-1) *limit

    result = result.skip(skip).limit(limit)
    
    const products = await result

    res.status(200).json({nbOfHits:products.length, products})
}

module.exports = {getAllProductstatic,getAllProduct}