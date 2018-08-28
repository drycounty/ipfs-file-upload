import React, { Component } from 'react'
import SimpleStorageContract from '../build/contracts/SimpleStorage.json'
import getWeb3 from './utils/getWeb3'
import ipfs from './ipfs'

import './css/oswald.css'
import './css/open-sans.css'
import './css/pure-min.css'
import './App.css'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      web3: null,
      ipfsHash: '',
      buffer: null,
      account: 0
    }
    this.captureFile = this.captureFile.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillMount() {

    // this gets the network provider and web3 instance.

    getWeb3
    .then(results => {
      this.setState({
        web3: results.web3
      })

      // Instantiate contract once web3 provided.

      this.instantiateContract()
    })
    .catch(() => {
      console.log('Error finding web3.')
    })
  }

  instantiateContract() {
  


    const contract = require('truffle-contract')
    const simpleStorage = contract(SimpleStorageContract)
    simpleStorage.setProvider(this.state.web3.currentProvider)

    // Declaring this for later so we can chain functions on SimpleStorage.
    // Get accounts. Below will fetch the account we are connecting with, once that's done via asynchronous call
    // we're going to get a deployed instance of the smart contract (javascript--via simpleStorage)
     this.state.web3.eth.getAccounts((error, accounts) => {
       simpleStorage.deployed().then((instance) => {
       this.simpleStorageInstance = instance
       this.setState({ account: accounts[0] })


       //ipfshash is returned from the below get function from the smart contract
      return this.simpleStorageInstance.get.call(accounts[0])
      }).then((ipfsHash) => {
    //  Update state with the result.
     return this.setState({ ipfsHash: ipfsHash })
    })
   })
  }

//below are functions to write captures and submissions to the logfile

  captureFile(event) {
      event.preventDefault()
      const file = event.target.files[0]
      const reader = new window.FileReader()
      reader.readAsArrayBuffer(file)
      reader.onloadend =() => {
      this.setState({ buffer: Buffer(reader.result) })
      console.log('buffer', this.state.buffer)

      }
  }
  
onSubmit(event) {
    event.preventDefault()
    ipfs.files.add(this.state.buffer, (error, result) => {
      if(error) {
        console.error(error)
        return
      }
      this.simpleStorageInstance.set(result[0].hash, { from: this.state.account }).then((r) => {
        return this.setState({ ipfsHash: result[0].hash })
        console.log('ifpsHash', this.state.ipfsHash)
      })
    })
  }

  render() {
    return (
      <div className="App">
        <nav className="navbar pure-menu pure-menu-horizontal">
            <a href="#" className="pure-menu-heading pure-menu-link">I P F S • I M A G E • U P L O A D E R</a>
        </nav> 

        <main className="container">
          <div className="pure-g">
            <div className="pure-u-1-1">
              <h1>Your Image</h1>
              <p>This image will be stored on the Ethereum Blockchain via IPFS</p>
              <img src={`https://ipfs.io/ipfs/${this.state.ipfsHash}`} alt=""/>
              <h2>Upload Image</h2>
              <form onSubmit={this.onSubmit} >
                <input type='file' onChange={this.captureFile} />
                <input type='submit' />
              </form>
            </div>
          </div>
        </main>




      </div>
    );
  }
}

export default App
