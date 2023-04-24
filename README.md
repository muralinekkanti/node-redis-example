# node-redis-example
NodeJS app to connect to IBM Cloud Databases for Redis.

## Overview
This repo provides a NodeJS sample code to connect to IBM Cloud Databases for Redis with advanced connection options using the TLS & CA cert.   This example app provides an API to read the value of the requested Key from the Redis DB cache.   To get started, follow these steps:

To run this app, use npm start 

The following node modules are required before running the app

npm install express redis fs dotenv 

Make sure .env file have below environemnt variables configured

NODE_ENV=development

REDIS_CONNECTION_STRING="redis://$username:$password@host:port/0"

PORT=3001

CA_CERT_File_PATH= xxxx

Browser:  use the below URL

http://$host:$port/hcache/$hKey

Example: 'http://127.0.0.1:3001/hcache/OGJkMTc3MjE4ZmRkZDQzN2IwNmQwM2MwNGY1N2M0YTFlMjY0MGVjODMyMjNlODU5MDVmYWE1YWVhNTE5OTNkM2RkOTNhZmVmM2QxMzlmY2M5ZDI5NWY0N2VjNWJkYmM3YjMyN2IyYzQwMzhmZjAxZmRjYTVhYzNkZjlhZWQ5NTg=
