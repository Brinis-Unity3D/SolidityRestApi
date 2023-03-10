const Web3 = require('web3');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const web3 = new Web3("https://rpc-mumbai.maticvigil.com");
const serverless = require('serverless-http');
// Contract ABI and address
const abi = require("./abi.json");
console.log(abi);
const address = "0x96d1FAcf242F5dD5d7Bd8de6EB0Eaf3D4B5Cf1A9";

// Create the contract instance
const contract = new web3.eth.Contract(abi, address);
//app.use(bodyParser);
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
module.exports.handler = serverless(app);
// Start the server
app.listen(3000, () => {
    console.log('API listening on port 3000');
});