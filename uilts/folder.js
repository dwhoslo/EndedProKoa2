const fs = require('fs');
const createUserFolder =  (folderName) => {
    return new Promise((resolve, reject) => {
        fs.mkdir(`./public/${folderName}`, (err) => {
            if (err) {
                if (err.code == 'EEXIST') {
                    resolve(0)
                } else {
                    reject(-1)
                }
            };
            resolve(1)
        })
    })
}
module.exports = {createUserFolder}