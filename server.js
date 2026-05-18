// DEPENDENCIES
const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const express = require("express");
const app = express();
require("dotenv").config();
const { MongoClient } = require("mongodb");

// Local Environmental Variables
const PORT = process.env.PORT || 3003;
const uri = process.env.MONGODB_URI;

// MIDDLEWARE
const client = new MongoClient(process.env.MONGODB_URI)
console.log(process.env.MONGODB_URI);

// ROUTES
app.get("/", (req, res)=>{
    res.send("Server's up and running...")
});

async function mongoDbConnection() {

    try{
        await client.connect();
        console.log ("Database Connection Has Been Made!")

        const db = client.db("test");
        console.log(`Successfully connected to the database! ${db.databaseName}`)
    }catch(error){
        console.error('Failed to connect to the database:', error)
    }

}
mongoDbConnection();

// PORT
app.listen(PORT, ()=>{
    console.log(`Server running on: http://localhost:${PORT}`)
})