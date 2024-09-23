const express = require('express')
const router = express.Router()

const {getAllProductstatic,getAllProduct} = require('../controllers/products')

router.route('/').get(getAllProduct)
router.route('/static').get(getAllProductstatic)


module.exports = router