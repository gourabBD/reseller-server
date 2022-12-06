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
     const wishlistCollection= client.db('reseller').collection('wishlist');
     const categoriesCollection= client.db('reseller').collection('categories');
     const bookedProductsCollection= client.db('reseller').collection('bookedproducts');
     const usersCollection= client.db('reseller').collection('users');
     const advertiseCollection= client.db('reseller').collection('advertise');

     app.get('/users',async(req,res)=>{
      const query={}
      const cursor=usersCollection.find(query)
      const users=await cursor.toArray();
      res.send(users)
     })

    //user adding
     app.post('/users',async(req,res)=>{
      const user=req.body;
      const result= await usersCollection.insertOne(user)
      res.send(result)
   })
   
  
  
  
     

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

    //Verified part
  
    
    
    app.patch('/products/sellerproduct/:email',async(req,res)=>{
      const email= req.params.email;
      const verifiedSeller = req.body.verifiedSeller
      const query={email:email}
      const updateDoc={
        $set:{
          verifiedSeller: verifiedSeller
    
        }
      
      }
      const result =await productCollection.updateOne(query,updateDoc)
      res.send(result)
     })
    
   //wishlist
   app.post('/wishlist' , async(req,res)=>{
    const order=req.body;
    const result=await wishlistCollection.insertOne(order)
    res.send(result)
   })
   //wishlist get
   app.get('/wishlist/:email',async(req,res)=>{
   
    const query={email: req.params.email
      }
    const cursor= wishlistCollection.find(query)
    const products=await cursor.toArray();
    res.send(products)
   })
   app.get('/wishlist',async(req,res)=>{
   
    const query={}
    const cursor= wishlistCollection.find(query)
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
    
   

   
    //buyer delete

app.delete('/users/:id',async(req,res)=>{
  const id=req.params.id;
  
  const query={_id: ObjectId(id)}
  const result=await usersCollection.deleteOne(query)
  res.send(result)
 })
 //make Admin from Buyer
 app.get(`/users/:id`,async(req,res)=>{
  const id=req.params.id;
 const query={_id:ObjectId(id)}
  const result = await usersCollection.findOne(query);
  res.send(result)
 })


 app.patch('/users/:id',async(req,res)=>{
  const id= req.params.id;
  const category = req.body.category
  const query={_id : ObjectId(id)}
  const updateDoc={
    $set:{
      category: category

    }
  
  }
  const result =await usersCollection.updateOne(query,updateDoc)
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