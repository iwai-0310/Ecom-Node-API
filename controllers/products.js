//Get the model prodcutschema
const Product=require('../models/product')

//static section for testing
const getAllProductsStatic=async (req,res)=>{
  //mongoose query the product schema to return all the items
  const products=await Product.find({name:'adidas Z.N.E. 01 ANC True Wireless Earbuds'})
  //set the response to return all the products store using find query
  res.status(200).json({products, ngHits: products.length})
}

const createTask=async (req,res)=>{
  try {
    const newProduct=await Product.create(req.body);
    res.status(200).json({newProduct})
  } catch (error) {
    res.status(500).send({msg: error})
  }
}

const getAllProducts=async (req,res)=>{
  //accessing the query paramters in console
  // console.log(req.query)

  //implement a better approach try to destructured the req query
  const {name,category,seller,sort,numericFilters,fields} =req.query
  //instead of directly passing it to the find its better to create a new object
  const queryObject={}
  //if name matches the name value in the req query and use regEx for partial matches
  if(name){
    queryObject.name={ $regex:name, $options: 'i'}
  }
  //if category matches with category in the req query and use regEx for partial matches
  if(category){
    queryObject.category={ $regex:category, $options: 'i'}
  }
  //if seller matches with category in the req query
  if(seller){
    queryObject.seller=seller;
  }
  console.log(queryObject)
  //pass the query directly into mongoose query
  // const products=await Product.find(
  //   queryObject
  // )

  //set the numeric filtering
  if(numericFilters){
    const operatorMap={
      '>':"$gt",
      '>=':"$gte",
      '<':"$lt",
      '<=':"$lte",
      '=':"$eq",
    }
    const regEx=/\b(<|>|>=|<=|=)\b/g
    let filters=numericFilters.replace(regEx,(match)=>`-${operatorMap[match]}-`)
    console.log(filters)
    const options=['price','rating'];
    filters=filters.split(',').forEach((item)=>{
      const [field,operator,value]= item.split('-')
      if(options.includes(field)){
        queryObject[field]={[operator]:Number(value)}
      }
    })
  }
  console.log(queryObject)

  let result=Product.find(queryObject)
  //sort
  if(sort){
    // console.log(sort);
    const sortList=sort.split(',').join(' ');
    result=result.sort(sortList)
  }
  else{
    result=result.sort('createdAt')
  }
  if(fields){
    const fieldsList=fields.split(',').join(' ');
    result=result.select(fieldsList);
  }
  const products= await result;
  res.status(200).json({products, ngHits: products.length})
}

module.exports={
  getAllProducts,getAllProductsStatic,createTask
}