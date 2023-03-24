'use strict';
const express = require("express");
const redis = require("redis");
const fs = require('fs');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;


const redis_connection_string = process.env.REDIS_CONNECTION_STRING; 
const ca_cert_file = process.env.CA_CERT_File_PATH; // "file full path"
const environment = process.env.NODE_ENV || "dev"; 

let redisClient;
const connectionString = redis_connection_string;;
const caCert = fs.readFileSync(ca_cert_file) ;

(async () => {    
    redisClient=redis.createClient({
      url: connectionString,   
      socket: {
        tls: true,
        ca: caCert
      }
     }); 

  redisClient.on("error", (error) => console.error(`Error : ${error}`));
  redisClient.on('reconnecting', msg => console.log('Redis reconnecting...', msg));
  redisClient.on('close', () => console.log('Redis closed...'));
  redisClient.on('connect', () => console.log('Redis connected...'));

  await redisClient.connect();
})();


async function getCacheData(req,res){
    const key=req.params.key;
    let results;
    let isCached = false;
    try{
        const cacheResults = await redisClient.get(key);
        results= JSON.parse(cacheResults);
    }catch(error){
        console.error(error);
        res.status(404).send("Data unavailable");
    }
    res.send({
        data: results,
      });
}

async function getHCacheData(req,res){
    console.time();
    const key=req.params.key;
    let results;
    let isCached = false;
    try{
        const cacheResults = await redisClient.hGetAll(key);
        results= cacheResults;
    }catch(error){
        console.error(error);
        res.status(404).send("Data unavailable");
    }
    res.send({
        data: results,
      });
      console.timeEnd();
}

app.get("/cache/:key", getCacheData);
app.get("/hcache/:key", getHCacheData);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});