/* ===== Blockchain Class ==========================
|  Class with a constructor for new blockchain 		|
|  ================================================*/

const SHA256 = require('crypto-js/sha256');
const LevelSandbox = require('./LevelSandbox.js');
const Block = require('./Block.js');

class Blockchain {

    constructor() {
        this.bd = new LevelSandbox.LevelSandbox();
        this.generateGenesisBlock();
    }

    // Auxiliar method to create a Genesis Block (always with height= 0)
    // You have to options, because the method will always execute when you create your blockchain
    // you will need to set this up statically or instead you can verify if the height !== 0 then you
    // will not create the genesis block
    generateGenesisBlock(){
        // Add your code here
        return new Block.Block("Genesis block");
    }

    // Get block height, it is auxiliar method that return the height of the blockchain
    getBlockHeight() {
        // Add your code here
        return this.bd.getBlocksCount();
    }

    // Add new block
    addBlock(block) {
			block.timeStamp = new Date().getTime().toString().slice(0, -3);
			block.hash = SHA256(JSON.stringify(block)).toString();
			this.getBlockHeight()
			.then((height) => {
					block.height = height + 1;
					if (block.height > 1) {
							// previous block hash
							this.getBlock(height)
							.then((lastBlock) => {
									block.previousHash = lastBlock.hash;
							});
					}
					console.log(height);
				return this.bd.addLevelDBData(height+1, block);						
			});
    }

    // Get Block By Height
    getBlock(height) {
        // Add your code here
        return this.bd.getLevelDBData(height);
    }

    // Validate if Block is being tampered by Block Height
    validateBlock(height) {
        // Add your code here
    }

    // Validate Blockchain
    validateChain() {
        // Add your code here
		}

    // Utility Method to Tamper a Block for Test Validation
    // This method is for testing purpose
    _modifyBlock(height, block) {
        let self = this;
        return new Promise( (resolve, reject) => {
            self.bd.addLevelDBData(height, JSON.stringify(block).toString()).then((blockModified) => {
                resolve(blockModified);
            }).catch((err) => { console.log(err); reject(err)});
        });
    }
   
}

// let bc = new Blockchain();

// bc.addBlock(new Block.Block("t block"))

module.exports.Blockchain = Blockchain;