/* ===== Persist data with LevelDB ==================
|  Learn more: level: https://github.com/Level/level |
/===================================================*/

const level = require('level');
const chainDB = './chaindata';

class LevelSandbox {

    constructor() {
        this.db = level(chainDB);
    }

    // Get data from levelDB with key (Promise)
    getLevelDBData(key){
        let self = this;
        return new Promise(function(resolve, reject) {
            self.db.get(key)
            .then((value) => resolve(value))
            .catch((e) => console.log("Error: " + e));
            // Add your code here, remember un Promises you need to resolve() or reject()
        });
    }

    // Add data to levelDB with key and value (Promise)
    addLevelDBData(key, value) {
        let self = this;
        return new Promise(function(resolve, reject) {
            self.db.put(key, value)
            .then((data) => resolve(data))
            .catch((error) => console.log(`Block ${key} submission failed. Error: ${error}`));
            // Add your code here, remember un Promises you need to resolve() or reject() 
        });
    }

    // Method that return the height
    getBlocksCount() {
        let self = this;
        return new Promise(function(resolve, reject){
            // Add your code here, remember un Promises you need to resolve() or reject()
        });
    }
        

}

module.exports.LevelSandbox = LevelSandbox;