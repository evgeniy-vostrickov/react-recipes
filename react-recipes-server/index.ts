import * as mongoDB from "mongodb";

const express = require('express');
const cors = require('cors')
const client: mongoDB.MongoClient = new mongoDB.MongoClient(process.env.MONGOURL || "mongodb://localhost:27017/");
const dbName = "Recipes"
const bodyParser = require('body-parser');
const app = express();
const port = 3001;

app.use(bodyParser.json({limit: '50mb'}))
app.use(cors())

const serverStart = async () => {
    try {
        await client.connect()
        // console.log(process.env.MONGODBNAME)
        const db = client.db(dbName); // подключаеся к базе данных Recipes

        require('./routes/todos')(app, db);
        app.listen(port, () => {
            console.log('App listening on port ' + port);
        });
    } catch (error: any) {
        console.log(error.message, error.stack)
        return null
    }

}

serverStart()