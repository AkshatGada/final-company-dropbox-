import Dstorage from './Dstorage.json'
import React, { Component } from 'react';
import Navbar from './Navbar'
import Main from './Main'
import Web3 from 'web3';
import './App.css';
import  { uploadFileToIPFS }  from './pinata.js'
import { createAlchemyWeb3 } from '@alch/alchemy-web3';
import Moralis from 'moralis';
import  {EvmChain} from "@moralisweb3/common-evm-utils"
import tst from '../'
import {Web3API} from '@moralisweb3/common-evm-utils'

// const ipfsClient = require('ipfs-http-client')
// const ipfs = ipfsClient({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' }) // leaving out the arguments will default to these values

class App extends Component {

  async componentDidMount() {

     this.start();
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  start () {
    this.setState({auth : true});
    this.setState({authenticate : false});
  }

  // async loadBlockchainData() {
  //   try {
  //     const web3 = window.web3
  //     // Load account
  //     const accounts = await web3.eth.getAccounts()
  //     this.setState({ account: accounts[0] })
  //     // Network ID
  //     const networkId = await web3.eth.net.getId()
  //     const networkData = DStorage.networks[networkId]
  //     console.log(accounts[0]);
  //     console.log(networkId);
  //     console.log(networkData);
  //     const address = '0x2eb32108e1433ebfd86989a9a0a2cae0b92f7a1f';
      
  //     if (networkData) {
  //       // Assign contract
        
  //       const dstorage = new web3.eth.Contract(DStorage.abi, address)
  //       this.setState({ dstorage })
  //       console.log(dstorage);
  //       // Get files amount
  //       const filesCount = await dstorage.methods.fileCount().call()
  //       console.log(filesCount)
  //       this.setState({ filesCount })
  //       // Load files & sort by the newest
  //       for (var i = filesCount; i >= 1; i--) {
  //         const file = await dstorage.methods.files(i).call()
  //         this.setState({
  //           files: [...this.state.files, file]
  //         })
  //         console.log("success")

  //       }
  //     } else {
  //       console.log('DStorage contract not deployed to detected network.')
  //     }
  //   } catch (error) {
  //     console.log('Error loading blockchain data:')
  //   }
  // }\

// async loadBlockchainData () {
//   if (window.ethereum) {
//     try{
//       await window.ethereum.enable();

//       const alchemy = createAlchemyWeb3('RRmHhvSKUEufY1ymezu1huxlbUeEICUy');

//       const accounts = await alchemy.eth.getAccounts();
//       this.setState({account :accounts[0]});

//       const address = '0x2eb32108e1433ebfd86989a9a0a2cae0b92f7a1f';
//       const dstorage = new alchemy.eth.Contract(Dstorage.abi,address);
//    this.setState({dstorage : dstorage});
//     }
//     catch(error) {
//       console.log(error);
//     }
//   }
//   else {
//     console.log("fucked up");
//   }
  
// }

async loadBlockchainData() {
  if (window.ethereum) {
    try {
      await window.ethereum.enable();

      const alchemy = createAlchemyWeb3('https://polygon-mumbai.g.alchemy.com/v2/aZ0iDaHlWI3hr6RgDk3F56iVT80IX2mc');

      const accounts = await alchemy.eth.getAccounts();
      this.setState({ account: accounts[0] });

      const address = '0xa79b277f796681c176ee0efc8891a264f77f4414';//0x0F0B38F4552E0B5B65F2D5d7A3E42767eFc5C4DE
      const dstorage = new alchemy.eth.Contract(Dstorage, address);

      // Retrieve contract data to verify successful deployment
      const contractData = await dstorage.methods.fileCount().call();
      if (contractData) {
        this.setState({ dstorage: dstorage });
        console.log('DStorage contract loaded successfully.');
      } else {
        console.log('DStorage contract data not available.');
      }
    } catch (error) {
      console.log('Error loading blockchain data:', error);
    }
  } else {
    console.log('Ethereum not available in the current environment.');
  }
}

async loadeverythingup ()
{
   this.loadWeb3();
   this.loadBlockchainData();
  
}

// async checkNft() {

//   try {
//     await Moralis.start({
//       apiKey: "NTr2S1mbZWXCcFkkPhz5KzkCK8AUQOgVO3cl65IZ7vRspqIKKC2bGke2Z3GetAwr"
//     });
  
//     const response = await Moralis.EvmApi.nft.getContractNFTs({
//       "chain": "0x1",
//       "format": "decimal",
//       "mediaItems": false,
//       "address": "0xb47e3cd837dDF8e4c57F05d70Ab865de6e193BBB"
//     });
  
//     console.log(response.raw);
//   } catch (e) {
//     console.error(e);
//   }
// async  checkNft () {
//     await Moralis.start({
//       apiKey: "NTr2S1mbZWXCcFkkPhz5KzkCK8AUQOgVO3cl65IZ7vRspqIKKC2bGke2Z3GetAwr",
//       // ...and any other configuration
//     });
  
//     const allNFTs = [];
  
//     const address = this.state.account;
//     console.log(this.state.account);
  
//     const chains = [EvmChain.ETHEREUM, EvmChain.BSC, EvmChain.POLYGON];
  
//     for (const chain of chains) {
//       const response = await Moralis.EvmApi.nft.getWalletNFTs({
//         address,
//         chain,
//       });
  
//       const nfts = response.getResult();
//       const tokenAddress = nfts[0]?._data.tokenAddress._value
//         this.setState({tokenAddress:tokenAddress});

//     }
  
//   }

async checkNft() {
  await Moralis.start({
    apiKey: "NTr2S1mbZWXCcFkkPhz5KzkCK8AUQOgVO3cl65IZ7vRspqIKKC2bGke2Z3GetAwr",
    // ...and any other configuration
  });

  const address = "0x679A3d5A211486fDB5FB4a6B60C40216cA8b5B95";

  const chain = "0x13881";

  const response = await Moralis.EvmApi.nft.getNFTOwners({
    address,
    chain,
  });

const array = response.getResult();

this.setState({array : array });

const result = this.auth();

console.log(result);


}

  auth () {
    for( let i=0;i<(this.state.array).length;i++) {
const auth = this.state.array[i]._data.ownerOf._value == this.state.account ?true:false;

this.setState({auth : auth});
this.setState({authenticate: auth});
console.log(auth);
return auth ;
}

 }





//   await Moralis.start({ apiKey: 'NTr2S1mbZWXCcFkkPhz5KzkCK8AUQOgVO3cl65IZ7vRspqIKKC2bGke2Z3GetAwr' });

// const nftList = await Moralis.EvmApi.nft.getContractNFTs({
//   chain: 80001 ,// defualt 1 (ETH)  
//   address: this.state.account,
//     format : "decimal",
//     mediaItems : false,
// });

// console.log(nftList.raw); 






  // Get file from user
  captureFile = async (event) => {

    event.preventDefault()

    const file = event.target.files[0]
    console.log(file);
    this.setState({file : file});
    const reader = new window.FileReader()

    reader.readAsArrayBuffer(file)
    reader.onloadend = () => {
      this.setState({
        buffer: Buffer(reader.result),
        type: file.type,
        name: file.name
      })
      console.log('buffer', this.state.buffer)
    }
    try {
    await this.getFileHash(); }
    catch (e) {
      console.log(e);
    }
  }

  // captureFile = event => {
  //   event.preventDefault();
  
  //   const file = event.target.files[0];
  //   console.log(file);
  //   this.setState({ file: file });
  
  //   const reader = new window.FileReader();
  //   reader.onloadend = () => {
  //     // Read the file content as an ArrayBuffer
  //     const buffer = reader.result;
  
  //     // Hash the file content using SHA-256 algorithm
  //     crypto.subtle.digest('SHA-256', buffer).then(hashBuffer => {
  //       // Convert the hash buffer to a hexadecimal string
  //       const hashArray = Array.from(new Uint8Array(hashBuffer));
  //       const hashHex = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
  
  //       console.log(hashHex);
  //       this.setState({ hashHex: hashHex });
  //     }).catch(error => {
  //       console.error('Error calculating file hash:', error);
  //     });
  //   };
  
  //   reader.readAsArrayBuffer(file);
  // }
  
  // Call the getFileHash function after setting up the reader
  

  
  async  getFileHash() {
    // Read the file content as an ArrayBuffer
    const buffer = await this.state.file.arrayBuffer();
  
    // Hash the file content using SHA-256 algorithm
    const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
  
    // Convert the hash buffer to a hexadecimal string
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
  
    console.log(hashHex);

    this.setState({hashHex : hashHex});
  }


   uploadFile = async(description) => {

    if(!this.state.dstorage) {
      console.log('Dstorge not deployed ');
      return;
    }

   
    console.log("Submitting file to IPFS...")

    // Add file to the IPFS
    // ipfs.add(this.state.buffer, (error, result) => {
    //   console.log('IPFS result', result.size)
    //   if(error) {
    //     console.error(error)
    //     return
    //   }
    const result = this.state.buffer; 
    console.log(this.state.buffer);// Define the 'result' variable here

      try {
        
        console.log(this.state.file);
        const fileUpload = await uploadFileToIPFS(this.state.file);
        this.setState({fileUpload : fileUpload });
        console.log(fileUpload);
        console.log(fileUpload.pinataURL);
        const url = fileUpload.pinataURL;
        this.setState({url: url});


      }
      catch(error) {
        console.log(error)

      }

      
const num = 69 ; 

      const ans = this.state.dstorage.methods.uploadFile(this.state.hashHex, num , this.state.type, this.state.name, this.state.url).send({ from: this.state.account });
      this.setState({ans :ans});
      this.check();
      // this.setState({ loading: true })
      // // Assign value for the file without extension
      // if(this.state.type === ''){
      //   this.setState({type: 'none'})
      // }
      // this.state.dstorage.methods.uploadFile(result[0].hash, result[0].size, this.state.type, this.state.name, description).send({ from: this.state.account }).on('transactionHash', (hash) => {
      //   this.setState({
      //    loading: false,
      //    type: null,
      //    name: null
      //  })
      //  window.location.reload()
      // }).on('error', (e) =>{
      //   window.alert('Error')
      //   this.setState({loading: false})
      // })
    }


    async check() {
     const count = await this.state.dstorage.methods.getFile().call();
    console.log(count);
  const fileId = parseInt(count[0]);
  this.setState({fileId : fileId});

  const fileHash = count[1];
  this.setState({fileHash : fileHash});
  const fileSize = parseInt(count[2]);
  this.setState({fileSize : fileSize});
  const fileType = count[3];
  this.setState({fileType : fileType})
  const fileName = count[4];
  this.setState({fileName : fileName});
  const fileDescription = count[5];
  this.setState({fileDescription : fileDescription});
  const uploadTime = parseInt(count[6]);
  this.setState({uploadTime : uploadTime})
  const uploader = count[7];
  this.setState({uploader : uploader});
    }
  

  constructor(props) {
    super(props)
    this.state = {
      account: '',
      dstorage: null,
      files: [],
      loading: false,
      type: null,
      name: null
    }
    this.uploadFile = this.uploadFile.bind(this)
    this.captureFile = this.captureFile.bind(this)
  }



 
  render() { 
    return (
      this.state.auth && !this.state.authenticate ? 
      <div>
                <button onClick={() => this.loadeverythingup()}>LOAD EVERYTHING UP</button><br></br><br></br>
<div>{this.state.account}</div>
                <button onClick={() => this.checkNft()}>NFT CHECK</button><br></br><br></br>

      </div>
       : this.state.auth && this.state.authenticate ?
       <div>
        <Navbar account={this.state.account} />
        { this.state.loading
          ? <div id="loader" className="text-center mt-5"><p>Loading...</p></div>
          : <Main
              files={this.state.files}
              captureFile={this.captureFile}
              uploadFile={this.uploadFile}
            />
        }
        <button onClick={() => this.getFileHash()}>HASH</button><br></br><br></br>

        <button onClick={() => this.check()}>CHECK</button>
        <div>
          <h1>File INFO</h1>
          <p>File ID : {this.state.fileId}</p>
          <p>File hash : {this.state.fileHash}</p>
          <p>File Size : {this.state.fileSize}</p>
          <p>File Type : {this.state.fileType}</p>
          <p>File Name : {this.state.fileName}</p>
          <p>File Description : {this.state.fileDescription}</p>
          <p>Upload Time: {this.state.uploadTime}</p>
      <p>Uploader: {this.state.uploader}</p>
              </div>

      </div> 
     : <div>
        <h1>You do not hold our nft</h1>
      </div>
    );
  }
}


export default App;