const fs = require('fs');

const readUserFiles = (folderName,filename) =>{
    return new Promise((resolve,reject)=>{
        fs.readFile(`./public/${folderName}/${filename}.json`, 'utf-8', (err, data) => {
            if (err) {
                resolve(-1)
            }
            // data = JSON.parse(data.toString());
            resolve(data)
        });
    })
}
// read JSON object from file
module.exports = {readUserFiles}
