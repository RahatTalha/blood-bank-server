const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 5000;


// Enable CORS for all routes
app.use(cors());
app.use(express.json());

//username and password--->>> talhatd229 PxKeaRXhhGvyQ9VC

app.get('/', (req, res) => {
  res.send('Hello World!')
})

    
// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.hu7ym6e.mongodb.net/?retryWrites=true&w=majority`;
// //



const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://talhatd229:PxKeaRXhhGvyQ9VC@cluster0.csxtolo.mongodb.net/?retryWrites=true&w=majority`;
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {serverApi: {version: ServerApiVersion.v1,strict: true,deprecationErrors: true,}});



async function run() {
  try {
    const userCollection = client.db('bloodbank').collection('users');
    app.post('/users', async(req, res) => {
      const user = req.body;
      const result = await userCollection.insertOne(user)
      res.send(result);
    });



    //Get All Homes
    app.get('/homes', async (req, res) => {
      const query = {}
      const cursor = userCollection.find(query)
      const homes = await cursor.toArray()
      res.send(homes)
    })
    
  } finally {
   
  }
}
run().catch(console.dir);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})