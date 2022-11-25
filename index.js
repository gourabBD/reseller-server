const express = require('express')

const cors = require('cors');
const port = process.env.PORT || 5000;
const app = express()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');


require('dotenv').config();


app.use(cors());
app.use(express.json())





const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.m8joqcm.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });



async function run(){
  try{
     const productCollection= client.db('reseller').collection('products');
     const categoriesCollection= client.db('reseller').collection('categories');
     const bookedProductsCollection= client.db('reseller').collection('bookedproducts');
     const usersCollection= client.db('reseller').collection('users');
     const advertiseCollection= client.db('reseller').collection('advertise');
    
      
    
     app.get('/products',async(req,res)=>{
      const query={}
      const cursor=productCollection.find(query)
      const products=await cursor.toArray();
      res.send(products)
     })
     app.post('/products' , async(req,res)=>{
      const order=req.body;
      const result=await productCollection.insertOne(order)
      res.send(result)
     })
     app.post('/advertise' , async(req,res)=>{
      const order=req.body;
      const result=await advertiseCollection.insertOne(order)
      res.send(result)
     })
     app.get('/advertise',async(req,res)=>{
      const query={}
      const cursor=advertiseCollection.find(query)
      const products=await cursor.toArray();
      res.send(products)
     })
     
     
     
     app.get('/products/All',async(req,res)=>{
      const query={}
      const cursor=productCollection.find(query)
      const products=await cursor.toArray();
      res.send(products)
     })
     app.get('/categories',async(req,res)=>{
      const query={}
      const cursor=categoriesCollection.find(query)
      const products=await cursor.toArray();
      res.send(products)
     })
     app.get('/bookedProducts',async(req,res)=>{
      const query={}
      const cursor=bookedProductsCollection.find(query)
      const products=await cursor.toArray();
      res.send(products)
     })
     app.post('/bookedProducts',async(req,res)=>{
      const bookings=req.body;
      const bookedprod= await bookedProductsCollection.insertOne(bookings)
      res.send(bookedprod)
   })
   app.get('/bookedProducts/:customerEmail',async(req,res)=>{
    // const email=req.params.customerEmail;
    // console.log(email)
    const query={customerEmail: req.params.customerEmail}
    const cursor= bookedProductsCollection.find(query)
    const products=await cursor.toArray();
    res.send(products)
   })
   app.get('/products/sellerproduct/:email',async(req,res)=>{
    // const email=req.params.customerEmail;
    // console.log(email)
    const query={email: req.params.email}
    const cursor= productCollection.find(query)
    const products=await cursor.toArray();
    res.send(products)
   })
    
   
    
    
     app.get(`/products/:category`,async(req,res)=>{
      const category=req.params.category;
      
      const query={category: category}
      const cursor =productCollection.find(query);
      const products=await cursor.toArray();
      res.send(products)
     })

     app.post('/users',async(req,res)=>{
      const user=req.body;
      const result= await usersCollection.insertOne(user)
      res.send(result)
   })
   app.get('/users',async(req,res)=>{
    const query={}
    const cursor=usersCollection.find(query)
    const users=await cursor.toArray();
    res.send(users)
   })
    

     


   
    
    

    //delete product
     app.delete('/products/:id',async(req,res)=>{
      const id=req.params.id;
      const query={_id: ObjectId(id)}
      const result=await productCollection.deleteOne(query)
      res.send(result)
     })
  }
  finally{

  }

}
run().catch(err=>console.error(err))




app.get('/', (req, res) => {
  res.send('Reseller server running')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})