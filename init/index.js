const mongoose=require("mongoose")
const Product=require("../models/product")
const data=require("./data")
main()
    .then ((res)=>{
        console.log("connected")
    })
    .catch((err)=>{
        console.log(err)
    })
async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/desiDealz")
}

const initdb=async ()=> {
    // await Product.deleteMany({})
    // data.data=data.data.map((obj)=>({...obj,owner:"67f268764cf80d9fa2844973"}))
    // await Product.insertMany(data.data)
    // console.log("data inserted")
}
initdb();

