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
import Cards from './Cards';

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
console.log(this.state.array);

this.auth();


}

auth () {
  const array1 = [];

  for( let i=0;i<(this.state.array).length;i++) {

    console.log(this.state.array[i]._data.minterAddress.toLowerCase());  
    console.log(this.state.account.toLowerCase());

let auth = this.state.array[i]._data.minterAddress.toLowerCase() == this.state.account.toLowerCase() ? true : false;

array1.push(auth);
}
console.log(array1);

for(let i= 0;i<array1.length;i++){
if (array1[i] === true) {
  this.setState({auth : true});
  this.setState({authenticate:true});
  break;
}
else {
  this.setState({auth : false});
  this.setState({authenticate:false});
}

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
  console.log(this.state.fileId);
  console.log(this.state.fileHash);
  console.log(this.state.fileSize);
  console.log(this.state.fileType);
  console.log(this.state.fileName);
  console.log(this.state.fileDescription);
  console.log(this.state.uploadTime);
  console.log(this.state.uploader);

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
        <section class="text-gray-600 body-font">
  <div class="container px-5 py-24 mx-auto">
    <div class="flex flex-wrap -mx-4 -mb-10 text-center">
      <div class="sm:w-1/2 mb-10 px-4">
        {/* <div class="rounded-lg h-64 overflow-hidden">
          <img alt="content" class="object-cover object-center h-full w-full" src="https://dummyimage.com/1201x501"/>
        </div> */}
        {/* <h2 class="title-font text-2xl font-medium text-gray-900 mt-6 mb-3">Buy YouTube Videos</h2> */}
        
        <button class="flex mx-auto mt-6 text-black bg-indigo-1000 border-0 py-2 px-5 focus:outline-none hover:bg-indigo-600 rounded" onClick={() => this.loadeverythingup()}>Connect your Wallet</button>
        <div><h1>Wallet address</h1><h1>{this.state.account}</h1></div>
      </div>
      <div class="sm:w-1/2 mb-10 px-4">
        {/* <div class="rounded-lg h-64 overflow-hidden">
          <img alt="content" class="object-cover object-center h-full w-full" src="https://dummyimage.com/1202x502"/>
        </div> */}
        <button class="flex mx-auto mt-6 text-black bg-indigo-1000 border-0 py-2 px-5 focus:outline-none hover:bg-indigo-600 rounded" onClick={() => this.checkNft()}>Sign in with NFT</button>
       
        {/* <button class="flex mx-auto mt-6 text-white bg-indigo-500 border-0 py-2 px-5 focus:outline-none hover:bg-indigo-600 rounded">Button</button> */}
      </div>
    </div>
  </div>
</section>
                {/* <button onClick={() => this.loadeverythingup()}>LOAD EVERYTHING UP</button>
<div><h1>Wallet address</h1>{this.state.account}</div>
                <button onClick={() => this.checkNft()}>NFT CHECK</button> */}

      </div>
       : this.state.auth && this.state.authenticate ?
       <div>
        <Navbar account={this.state.account} />
        {/* { this.state.loading
          ? <div id="loader" className="text-center mt-5"><p>Loading...</p></div>
          : <Main
              files={this.state.files}
              captureFile={this.captureFile}
              uploadFile={this.uploadFile}
            />
        } */}
        <section class="text-gray-600 body-font">
  <div class="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
    <div class="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
      <h1 class="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">Decentralised Storage
        <p class="hidden lg:inline-block"></p>
      </h1>
      <p class="mb-8 leading-relaxed">Decentralized storage refers to a system where data is stored across a network of computers rather than in a centralized location. It offers improved data security, privacy, and reliability by distributing data across multiple nodes. Users can access their data from any node, and no single point of failure exists. It promotes a more resilient and censorship-resistant approach to data storage and retrieval.</p>
      <div class="flex justify-center">
      <button class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow" onClick={() => this.getFileHash()}>HASH</button>
      <button class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow" onClick={() => this.check()}>CHECK</button>
      </div>
    </div>
    <div class="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
    { this.state.loading
          ? <div id="loader" className="text-center mt-5"><p>Loading...</p></div>
          : <Main
              files={this.state.files}
              captureFile={this.captureFile}
              uploadFile={this.uploadFile}
            />
        }
    </div>
  </div>
</section>
        <div className="banner">
        <div class="flex">
  <div class="w-1/3  h-12">
  
  </div>
  <div class="w-1/3  h-12">
 
  </div>
  <div class="w-1/3  h-12">
 
  </div>
</div>
        <div class="flex mb-2">
  <div class="flex-1 ">
  
  </div>
  <div class="flex-1 ">
  
  </div>
  <div class="flex-1 ">
  
  </div>
  {/* <div class="flex-1 bg-gray-500 h-12"></div>
  <div class="flex-1 bg-gray-400 h-12"></div> */}
</div>
        
       
        <div>
        </div>
        <div class="px-2">
  
</div>
<h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">File Info</h1>
          {/* <p>File ID : {this.state.fileId}</p>
          <p>File hash : {this.state.fileHash}</p>
          <p>File Size : {this.state.fileSize}</p>
          <p>File Type : {this.state.fileType}</p>
          <p>File Name : {this.state.fileName}</p>
          <p>File Description : {this.state.fileDescription}</p>
          <p>Upload Time: {this.state.uploadTime}</p>          
          <p>Uploader: {this.state.uploader}</p> */}
          <Cards id="File ID"
                 idvalue={this.state.fileId}
                 hash="File Hash"
                 hashValue={this.state.fileHash}                
                 type="File type"
                 typeValue={this.state.fileType}
                 name="File Name"
                 nameValue={this.state.fileName}
                 description="File Url"
                 descriptionValue={this.state.fileDescription}
                 uploadTime="Upload Time"
                 uploadTimeValue={this.state.uploadTime}
                 uploader="Uploader"
                 uploaderValue={this.state.uploader}/>
       </div>
      <div></div>

      </div>
     : <div>
<section class="text-gray-600 body-font">
  <div class="container px-5 py-24 mx-auto">
    <div class="flex flex-col text-center w-full mb-12">
      <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">Oops! Grab your nft first</h1>
    </div>

  </div>
</section>      </div>
    );
  }
}


export default App;