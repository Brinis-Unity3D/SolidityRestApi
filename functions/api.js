const Web3 = require('web3');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

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
const address = "0x96d1FAcf242F5dD5d7Bd8de6EB0Eaf3D4B5Cf1A9";
const router=express.Router();
router.get('/api/:chaineId/:address/:functionName/:parameters', (req, res) => {
    
    console.log(chainesIdDic[req.params.chaineId])
    const web3 = new Web3(chainesIdDic[req.params.chaineId]);
    const contract = new web3.eth.Contract(abi, req.params.address);
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
router.get('/', (req, res) => {
    console.log("hello");
    //res.send(require("./landing.html"));
    res.sendFile('./landing.html');
        //" Are you tired of the hassle of interacting with contracts on the blockchain? Our new API makes it easy to retrieve data and invoke functions on any contract, on any blockchain, with just a few simple API calls. No more fiddling with private keys, ABIs, or complex web3 code - our API handles all of that for you, so you can focus on building great decentralized applications. Give it a try today and see how much easier your development workflow can be! <br>  https://solidityrestapi.netlify.app/api/chaineid/contractaddress/function/var1/var2/........varN <br>  example https://solidityrestapi.netlify.app/api/80001/0x96d1FAcf242F5dD5d7Bd8de6EB0Eaf3D4B5Cf1A9/f_tokenURI/earth_0012 \n <br> " );
   
});
app.use("/",router);
module.exports.handler = serverless(app);
