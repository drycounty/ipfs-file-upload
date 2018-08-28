const IPFS = require('ipfs-api');
const ipfs = new IPFS({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });

export default ipfs;

//above: pulling IPFS API and assigning it to a constant, a new instance of the API w/host and etc.
//change to localhost for local node
//