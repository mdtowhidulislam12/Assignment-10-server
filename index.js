const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');

const port = process.env.PORT || 5000;
const app = express();

//hUn12uCsq56KnqCi
// towhid-visa


const uri = "mongodb+srv://towhid-visa:hUn12uCsq56KnqCi@cluster0.vmume.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();

        const database = client.db("visaDB");
        const visaCollection = database.collection("visa");


        app.get('/addvisa'), async (req, res) => {
            const cursor = visaCollection.find();
            const result = await cursor.toArray();
            res.send(result);
        }

        app.post('/addvisa', async (req, res) => {
            const visa = req.body;
            console.log(visa);
            const result = await visaCollection.insertOne(visa);
            res.send(result);
        })
        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);


app.use(cors());
app.use(express.json());

app.get('/', (rep, res) => {
    res.send('server is running!')
});


app.listen(port, () => {
    console.log(`simple server is running on,${port}`)
})