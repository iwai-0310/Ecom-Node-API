//Get the model prodcutschema
const Product=require('../models/product')

//static section for testing
const getAllProductsStatic=async (req,res)=>{
  //mongoose query the product schema to return all the items
  const products=await Product.find({})
  //set the response to return all the products store using find query
  res.status(200).json({products, ngHits: products.length})
}
const getAllProducts=async (req,res)=>{
  //accessing the query paramters in console
  // console.log(req.query)

  //implement a better approach try to destructured the req query
  const {seller} =req.query
  //instead of directly passing it to the find its better to create a new object
  const queryObject={}
  if(seller){
    queryObject.seller=seller==='Addidas'? 'Addidas' : 'Apple'
  }
  console.log(queryObject)
  //pass the query directly into mongoose query
  const products=await Product.find(
    queryObject
  )
  res.status(200).json({products, ngHits: products.length})
}

module.exports={
  getAllProducts,getAllProductsStatic
}