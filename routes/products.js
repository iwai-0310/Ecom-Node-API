const express=require('express');

const router=express.Router();

const {getAllProducts,getAllProductsStatic,createTask}=require("../controllers/products");

router.route('/').get(getAllProducts).post(createTask)
router.route('/static').get(getAllProductsStatic)

module.exports=router;