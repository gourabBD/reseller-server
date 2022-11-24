const express = require('express')

const cors = require('cors');
const port = process.env.PORT || 5000;
const app = express()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');


require('dotenv').config();

//middle wares
app.use(cors());
app.use(express.json())





const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.m8joqcm.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });



async function run(){
  try{
     const productCollection= client.db('reseller').collection('products');
     const categoriesCollection= client.db('reseller').collection('categories');
    
      
    
     app.get('/products',async(req,res)=>{
      const query={}
      const cursor=productCollection.find(query)
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
    
   
    
    
     app.get(`/products/:category`,async(req,res)=>{
      const category=req.params.category;
      
      const query={category: category}
      const cursor =productCollection.find(query);
      const products=await cursor.toArray();
      res.send(products)
     })

    


     app.post('/products' , async(req,res)=>{
      const order=req.body;
      const result=await productCollection.insertOne(order)
      res.send(result)
     })
    
     //Update
    //  app.get(`/products/:id`,async(req,res)=>{
    //   const id=req.params.id;
    //   const query={_id: ObjectId(id)}
    //   const service = await reviewCollection.findOne(query);
    //   res.send(service)
    //  })

    //  app.patch('/review/:id',async(req,res)=>{
    //   const id= req.params.id;
    //   const userReview = req.body.userReview
    //   const query={_id : ObjectId(id)}
    //   const updateDoc={
    //     $set:{
    //       userReview: userReview

    //     }
      
    //   }
    //   const result =await reviewCollection.updateOne(query,updateDoc)
    //   res.send(result)
    //  })

    //delete review
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