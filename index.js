const express = require('express')
const app = express()
const cors = require('cors');
require('dotenv').config();
const { MongoClient } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;

const port = process.env.PORT || 5000;

app.use(cors());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.hyeto.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


console.log(uri);

async function run() {
  try {
    await client.connect();
    console.log('database connected successfully');

    const database = client.db('portfolio_protal');


    const projectsCollection = database.collection('projects');




// Get all projects
    app.get('/projects', async (req, res) => {
      const cursor = projectsCollection.find({});
      const projects = await cursor.toArray();
      res.send(projects);
    });

        // GET Single project with details
        app.get('/projects/:id', async (req, res) => {
          const id = req.params.id;
          console.log('getting specific project', id);
          const query = { _id: ObjectId(id) };
          const project = await projectsCollection.findOne(query);
          console.log(project);
          res.json(project);
          // res.send('getting soon');
        });


  }
  finally {
    // await client.close();
  }
}

run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('Hello! I am Sangita, Its my Portal World!')
})

app.listen(port, () => {
  console.log(`listening at ${port}`)
})