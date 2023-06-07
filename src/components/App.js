import Dstorage from './Dstorage.json'
import React, { Component } from 'react';
import Navbar from './Navbar'
import Main from './Main'
import Web3 from 'web3';

import  { uploadFileToIPFS }  from './pinata.js'
import { createAlchemyWeb3 } from '@alch/alchemy-web3';
import Cards from './Cards';




// const ipfsClient = require('ipfs-http-client')
// const ipfs = ipfsClient({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' }) // leaving out the arguments will default to these values

class App extends Component {

  // async componentDidMount() {
  //   await this.loadWeb3()
  //    await this.loadBlockchainData()
  // }

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

  // Get file from user
  captureFile = event => {

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
  }

  
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
      <button  class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow" onClick={() => this.loadeverythingup()}>LOAD EVERYTHING UP</button>
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
                 size="File Size"
                 sizeValue={this.state.fileSize}
                 type="File type"
                 typeValue={this.state.fileType}
                 name="File Name"
                 nameValue={this.state.fileName}
                 description="File Description"
                 descriptionValue={this.state.fileDescription}
                 uploadTime="Upload Time"
                 uploadTimeValue={this.state.uploadTime}
                 uploader="Uploader"
                 uploaderValue={this.state.uploader}/>
       </div>
      <div></div>

      </div>
    );
  }
}


export default App;