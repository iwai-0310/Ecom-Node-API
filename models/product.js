const mongoose=require('mongoose');

const productSchema=new mongoose.Schema({
  category:{
    type:String,
    required: [true,'product category must be defined']
  },
  name:{
    type:String,
    required:[true,'product name must be provided'],
  },
  seller:{
    type:String,
    required:[true,'Seller must be provided']
  },
  price:{
    type:Number,
    required:[true,'product price must be provided'],
  },
  stock:{
    type:Number,
    required:[true,'Stock quantity should be provided']
  },
  rating:{
    type:Number,
    default: 4,
  },
  ratingsCount:{
    type:Number,
    default: 2000,
  },
  img:{
    type:[String],
    required:[true,'Image for product is a must']
  },
  shipping:{
    type:Number,
    default: 3,
  },
  quantity:{
    type:Number,
    default:1,
  }
})

module.exports=mongoose.model('Product',productSchema);