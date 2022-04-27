const express = require('express');
const cors = require('cors');
require('dotenv').config()
const { MongoClient, ServerApiVersion } = require('mongodb');
const port = process.env.PORT || 5000;

const app = express();

// Middleware
app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.qgje7.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect();
        const volunteerCollection = client.db('weVolunteer').collection('activities');
        console.log('Volunteer db in connected');

        // get api for all data
        app.get('/activities', async (req, res) => {
            const query = {};
            const cursor = volunteerCollection.find(query);
            const activities = await cursor.toArray();
            res.send(activities);
        })


    }
    finally {

    }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('We Volunteer is running...');
})

app.listen(port, () => {
    console.log('Listening Port:', port);
})