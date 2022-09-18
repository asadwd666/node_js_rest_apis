const express=require('express');
const app=express();
const mongoose=require('mongoose');
const dotenv=require('dotenv');
const user=require('./routers/user')
const auth=require('./routers/auth')
const product=require('./routers/product')
const cart=require('./routers/cart')
const order=require('./routers/order')
const stripe=require('./routers/stripe')
dotenv.config();
/////////////while getting data from postman body we shal use this

app.use(express.json())
///////////////////////////////////////
////////////////db connection/////
const db=mongoose.connect(
    process.env.MONGO_URL
).then(()=>{
    console.log('database succesfully connected');
}).catch((err)=>{
    console.log(err);
})
//////////////////////////////////
app.use('/api/auth',auth)
app.use('/api/user',user)
app.use('/api/products',product)
app.use('/api/cart',cart)
app.use('/api/order',order)
app.use('/api/stripe',stripe)

app.listen(process.env.PORT || 5000,()=>{
    console.log('app is listening on port 5000 ');
})
