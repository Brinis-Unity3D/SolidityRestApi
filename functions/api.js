const Web3 = require('web3');
const express = require('express');
//const landingPage = import('./public/landing.html');
const app = express();
const path = require('path');
const serverless = require('serverless-http');
// Contract ABI and address
const abi = require("../abi.json");
//console.log(abi);

var chainesIdDic = {
    "1":"https://eth.llamarpc.com",
    "56":"https://bsc-dataseed.binance.org",
    "137":"https://polygon.llamarpc.com",
    "42161":"https://1rpc.io/arb",
    "10":"https://mainnet.optimism.io",
    "97":"https://data-seed-prebsc-2-s3.binance.org:8545",
    "80001":"https://rpc-mumbai.maticvigil.com",
    "513100":"https://rpc.etherfair.org",
    "6":"https://www.ethercluster.com/kotti"
};
//netlify dev
// Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy Unrestricted
const address = "0x361F2e4ee08E56C736d5cF0e66cC9515253fADBA";
const router=express.Router();
router.get('/api/:chaineId/:address/:functionName/*', (req, res) => {

   console.log(req.params["0"]);
    let params=req.params["0"].split('/');
    params = params.filter(entry => entry.trim() != '');
    console.log(params) ;
    const web3 = new Web3(chainesIdDic[req.params.chaineId]);
    const contract = new web3.eth.Contract(abi, req.params.address);
    let signature;
   
    signature = FillFunctionFromParams(params, signature, contract, req);
       signature.call()
        .then(result => {
            res.send(ProcessResult(result));
        })
        .catch(error => {
            res.status(500).send(error);
        });
    
});
/*router.get('/api/:chaineId/:address/:functionName/:p1/:p2', (req, res) => {

    console.log(req.params.functionName);
    
     const web3 = new Web3(chainesIdDic[req.params.chaineId]);
     const contract = new web3.eth.Contract(abi, req.params.address);
     contract.methods[req.params.functionName](req.params.p1,req.params.p2).call()
         .then(result => {
             res.send(ProcessResult(result));
         })
         .catch(error => {
             res.status(500).send(error);
         });
 });
 router.get('/api/:chaineId/:address/:functionName', (req, res) => {
    const web3 = new Web3(chainesIdDic[req.params.chaineId]);
    const contract = new web3.eth.Contract(abi,req.params.address);
    // Call the contract function
    contract.methods[req.params.functionName]().call()
        .then(result => {
            let s = ProcessResult(result);
            res.send(s);
        })
        .catch(error => {
            res.status(500).send(error);
        });
});*/
/*router.get('/api/:chaineId/:address/f_GetTokensPerOwnersMap/:instanceId', (req, res) => {
    const web3 = new Web3(chainesIdDic[req.params.chaineId]);
    const contract = new web3.eth.Contract(abi,req.params.address);
    // Call the contract function
    contract.methods[req.params.functionName]().call()
        .then(result => {
            let s = ProcessResult(result);
            res.send(s);
        })
        .catch(error => {
            res.status(500).send(error);
        });
});*/
router.get('/', (req, res) => {
    res.sendFile('/public/index.html',{ root : __dirname});
});
app.use("/",router);
module.exports.handler = serverless(app);

function FillFunctionFromParams(params, signature, contract, req) {
    switch (params.length) {
        default: signature = contract.methods[req.params.functionName]();
        case 0:
            signature = contract.methods[req.params.functionName]();
            break;
        case 1:
            signature = contract.methods[req.params.functionName](params[0]);
            break;
        case 2:
            signature = contract.methods[req.params.functionName](params[0], params[1]);
            break;
        case 3:
            signature = contract.methods[req.params.functionName](params[0], params[1], params[2]);
            break;
        case 4:
            signature = contract.methods[req.params.functionName](params[0], params[1], params[2], params[3]);
            break;
        case 5:
            signature = contract.methods[req.params.functionName](params[0], params[1], params[2], params[3], params[4]);
            break;
        case 6:
            signature = contract.methods[req.params.functionName](params[0], params[1], params[2], params[3], params[4], params[5]);
            break;
        case 7:
            signature = contract.methods[req.params.functionName](params[0], params[1], params[2], params[3], params[4], params[5], params[6]);
            break;
    }
    return signature;
}

function ProcessResult(result) {
   
    let s = JSON.stringify(result);
    s = s.replaceAll('\\u0000', '');
    s = s.replaceAll('\\x00', '');
    return s;
}

