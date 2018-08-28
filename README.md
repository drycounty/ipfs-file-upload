

# Description
This is a image uploader that will allow users to store their files on IPFS, the interplantary file system (https://ipfs.io/).  

# Assumptions and Dependencies
Ganache (CLI or GUI)
Truffle 
React
nodejs
ipfs-api
Chrome and Metamask


# Steps to Run

Have Ganache running and connected to Metamask via Custom RPC

1. Git clone
2. cd ipfs-file-upload
3. truffle compile
4. truffle migrate (use --reset if there are issues)
5. truffle test
6. npm run start
7. Chrome should open.  Make sure Metamask is set to the custom RPC account.
8. Select choose file and browse for a test image file
9. Click Sumbit and wait for Metamask to open
10. Check payment amount and choose Submit
11. Your image should appear in the window.  To test that it is not stored locally, simply refresh the page.

# Technical details

A lot of this happens within the javascript components (App.js) wherein calls are made to IPFS via React.  Files are stored on IPFS and the Ethereum Blockchain.  Have had some issues getting Metamask to offer a nonce that is different than what is offered by Ganache, this remains a bit of a stumbling block.

# Unfinished components
I wanted to offer administrative rights to allow unlimited file sizes for 'onlyOwner' (admins), whereas non-admin users would only be allowed to upload certain (<200k) files.  This remains unimplemented in the project.
