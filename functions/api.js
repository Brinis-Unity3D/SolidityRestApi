const Web3 = require('web3');
const express = require('express');
//const landingPage = import('./public/landing.html');
const app = express();
const path = require('path');
const serverless = require('serverless-http');
// Contract ABI and address
const abi = require("../abi.json");
const { json } = require('body-parser');
const Gears = require("./Gears");
//console.log(abi);

var chainesIdDic = {
    "1":"https://eth.llamarpc.com",
    "56":"https://bsc-dataseed.binance.org",
    "137":"https://polygon.llamarpc.com",
    "42161":"https://1rpc.io/arb",
    "10":"https://mainnet.optimism.io",
    "97":"https://data-seed-prebsc-2-s3.binance.org:8545",
    //"97":"https://bsc.nodes.fastnode.io/testnet/fn-dedic-49e2-80ef-b690b812b1e4/",
    //"80001":"https://rpc-mumbai.maticvigil.com",
    "80001":"https://polygon-testnet.public.blastapi.io",
    "513100":"https://rpc.etherfair.org",
    "6":"https://www.ethercluster.com/kotti"
};
//netlify dev
// Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy Unrestricted
const address = "0x361F2e4ee08E56C736d5cF0e66cC9515253fADBA";
//0x96d1FAcf242F5dD5d7Bd8de6EB0Eaf3D4B5Cf1A9
const router=express.Router();
router.get('/api/:chaineId/:address/:functionName*', (req, res) => {

    console.time("f");
    console.log(req.params["0"]);
    let params=req.params["0"].split('/');
    params = params.filter(entry => entry.trim() != '');
    const web3 = new Web3(chainesIdDic[req.params.chaineId]);
    const contract = new web3.eth.Contract(abi, req.params.address);
    let signature;
    signature = Gears.FillFunctionFromParams(params, signature, contract, req);
    console.timeEnd("f");
    console.time("e");

       signature.call()
        .then(result => {
            console.timeEnd("e");
            console.time("a");
            res.send(Gears.ProcessResult(result,(req.params.functionName+"").toLowerCase().includes("map")));
    console.timeEnd("a");

        })
        .catch(error => {
            res.status(500).send(error);
        });
    
});


router.get('/', (req, res) => {
    res.sendFile('/public/index.html',{ root : __dirname});
});
app.use("/",router);
module.exports.handler = serverless(app);



router.get('/filter/:type/:chaineId/:address/:functionName*', (req, res) => {

   
    let params=req.params["0"].split('/');
    params = params.filter(entry => entry.trim() != '');
    const web3 = new Web3(chainesIdDic[req.params.chaineId]);
    const contract = new web3.eth.Contract(abi, req.params.address);
    let signature;
    signature = Gears.FillFunctionFromParams(params, signature, contract, req);
   

       signature.call()
        .then(result => {
            res.send(
                Gears.ProcessFilterableResult(result,(req.params.functionName+"").toLowerCase().includes("map"),req.params.type),
                );
        })
        .catch(error => {
            res.status(500).send(error);
        });
    
});


