const Web3 = require('web3');
//const express = require('express');
const http = require('http');

//const app = express();
const web3 = new Web3("https://matic-mumbai.chainstacklabs.com");

// Contract ABI and address
const abi = require("./abi.json");
console.log(abi);
const address = "0x96d1FAcf242F5dD5d7Bd8de6EB0Eaf3D4B5Cf1A9";

// Create the contract instance
const contract = new web3.eth.Contract(abi, address);
const server = http.createServer((req, res) => {
    // Parse the request path
    const path = req.url.split('/');
    const functionName = path[1];
    const parameters = path.slice(2);
    console.log("functionName = "+functionName);
    // Call the contract function
    contract.methods[functionName](parameters).call()
    
        .then(result => {
            //res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(result);
        })
        .catch(error => {
            res.writeHead(500, {'Content-Type': 'application/json'});
            res.end(JSON.stringify(error));
        });
});

// Start the server
server.listen(3000, () => {
    console.log('API listening on port 3000');
});

/*
// Define the API route
app.get('/api/:functionName/:parameters', (req, res) => {
    console.log("function name = "+req.params.functionName);
    // Call the contract function
    contract.methods[req.params.functionName](req.params.parameters).call()
        .then(result => {
            res.send(result);
        })
        .catch(error => {
            res.status(500).send(error);
        });
});

// Start the server
app.listen(3000, () => {
    console.log('API listening on port 3000');
});*/