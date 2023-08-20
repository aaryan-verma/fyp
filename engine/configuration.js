
import SimpleCrypto from "simple-crypto-js"
const cipherKey = "#ffg3$dvcv4rtkljjkh38dfkhhjgt"
const ethraw = "2109a319f4fc679ea02f80a55d6189138720fecadcf973076424e1e7a90fc73b";
//const ethraw = "757fc4f60d496a9bb9bbf626b1e65c4fbea34a00b173044b6bcffe468fbe51c1";
const hhraw = "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";
export const simpleCrypto = new SimpleCrypto(cipherKey)
export const cipherEth = simpleCrypto.encrypt(ethraw)
export const cipherHH = simpleCrypto.encrypt(hhraw)

/*
IPFS Client Setup
*/

import { create as ipfsClient } from 'ipfs-http-client';
const projectId = '2FkWfi7XsLZ0WbH0vB32nkaWqB6';
const projectSecret = 'fa68ca516f966dbed983566838dd62a2';
const auth =
    'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');

export const client = ipfsClient({
    host: 'infura-ipfs.io',
    port: 5001,
    protocol: 'https',
    headers: {
        authorization: auth,
        "Access-Control-Allow-Credentials": [
            "true"
        ],
        "Access-Control-Allow-Methods": [
            "PUT",
            "GET",
            "POST"
        ],
        "Access-Control-Allow-Origin": [
            "*"
        ]
    },
});

//export const client = ipfsHttpClient('https://infura-ipfs.io:5001/api/v0');

/*
const ipfsClient = require('ipfs-http-client');

const projectId = '2FkWfi7XsLZ0WbH0vB32nkaWqB6';
const projectSecret = 'fa68ca516f966dbed983566838dd62a2';
const auth =
    'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');

export const client = ipfsClient.create({
    host: 'ipfs.infura.io',
    port: 5001,
    protocol: 'https',
    headers: {
        authorization: auth,
    },
});

 client.pin.add('QmeGAVddnBSnKc1DLE7DLV9uuTqo5F7QbaveTjr45JUdQn').then((res) => {
     console.log(res);
});
/*
Add the wallet address used to deploy the contracts below:
*/
export var bridgeWallet = "0xC4cE6a8F6571d59441a078D2Ba5A09688e8D719B";


/*
HardHat Testnet
*/

export var hhresell = "0x44007F64fb73ad3b3937bbf2b06Dc7d91707Fe97";
export var hhnftcol = "0xE44c39fCE89eB91Ee82c1b94dc1E74798B2da07b";
export var hhnft = "0xE4F3a74e9A98c30aea08C4E8eFdD72E51A66e966";
export var hhmarket = "0x5a8399d4B33912757A967F6d06A2Ca8499AD9a07";
export var hhrpc = "https://rpc.ankr.com/eth_goerli";
export var mainnet = hhrpc

/*
Sepolia Testnet
*/

export var sepErc20 = "0xBB848f3134Ed4Dc82B19717C7F00ed3C706Cb109";
export var sepCustody = "0xE4F3a74e9A98c30aea08C4E8eFdD72E51A66e966";
export var sepresell = "0x44007F64fb73ad3b3937bbf2b06Dc7d91707Fe97";
export var sepnftcol = "0xE44c39fCE89eB91Ee82c1b94dc1E74798B2da07b";
export var sepnft = "0x5a8399d4B33912757A967F6d06A2Ca8499AD9a07";//"0xE4F3a74e9A98c30aea08C4E8eFdD72E51A66e966";
export var sepmarket = "0x7Fb995C754c8Fa4556E472B3CE83b1cF3bd830E4";
export var seprpc = "https://eth-sepolia.g.alchemy.com/v2/JEarz4A7EI7YYODvnr3IfaMf4AcB4tV0";
export var sepEventMarket = "0xEBb7e286cf87f4684aFCd18D18947f0ADc1DDD3F";


/*
Goerli Testnet
*/
export var goeErc20 = "0xBB848f3134Ed4Dc82B19717C7F00ed3C706Cb109";
export var goeCustody = "0x2546bAA4383851713F21C59a04B938B4e8Ff515d";
export var goeresell = "0x44007F64fb73ad3b3937bbf2b06Dc7d91707Fe97";
export var goenftcol = "0xE44c39fCE89eB91Ee82c1b94dc1E74798B2da07b";
export var goenft = "0x1EF62cc5b8C3e19e42F67422327F13b6fEaf256f";//"0xE4F3a74e9A98c30aea08C4E8eFdD72E51A66e966";
export var goemarket = "0x823b38329C000166beFA80E1CBa0Ad8eaC781f8c";
export var goerpc = "https://rpc.ankr.com/eth_goerli";
//export var bsctEventMarket = "0x88f9A9cda5D19464e72B70e65a0235c2a5cc6dc6";

/*
BSC Testnet
*/
export var bsctErc20 = "0x675FB7D7B63068FA5C8454Fd3562c27fb32B9c06";
export var bsctCustody = "0x8fad5A1003B16E2033b08D862A431dAD633fcBfc";
export var bsctresell = "0x9f3070cE2c15D39810b2E27FE48dd116b11600EA";
export var bsctnftcol = "0x7ea91C5E327d98cc0889dCd139f03AaA2A0577B4";
export var bsctnft = "0x806a1c19528e7d4DecF8a1443596c5D8424b96d9";
export var bsctmarket = "0x001E318f49345209a5dD62D9C15fd3Ee53d865ad";
export var bsctrpc = "https://data-seed-prebsc-1-s1.binance.org:8545/";
export var bsctEventMarket = "0x88f9A9cda5D19464e72B70e65a0235c2a5cc6dc6";

/*
Mumbai Testnet
*/
export var mumErc20 = "0x086cE6290e2F2Ec37E88479e5835eA531E0992cF";
export var mumCustody = "0x5A550338102FD88dC6F0e9D3F12329BbC55483D0";
export var mmresell = "0x9d1fc977D7D1fDd327c4a80033B8e3Bcc45241f6";
export var mmnftcol = "0x4c11BA2441071Ec020EC9a99A83e73e728201F51";
export var mmnft = "0x957759b17c1640Daa67DC3AD11868981386Dd8d4";//"0x4238F466B2ceC21cff93A3C90D735C9D7E267968";
export var mmmarket = "0x3ebD6A42853a2424CbF9cA4be23871A3BBe2dfd9";
export var mmrpc = "https://rpc-mumbai.maticvigil.com/";
export var latestID = "0x5aEb4ad761c28552660cEd4a82bfB5C948e497b3";
export var mmEventMarket = "0xe38AeAeE7A0E55856Cb155A6B4b45b7C025bf361";
