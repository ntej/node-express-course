const {customApiError} = require('../errors/custom-error')

const errorHandler = (err, req, res, next) => {
    if(err instanceof customApiError){
     return res.status(err.statusCode).send({msg: err.message})
    }
    return res.status(500).json({msg:'Something went wrong'})
}

module.exports = errorHandler