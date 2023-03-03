const fs = require('fs');

const userConfigFileSaves = (data,folderName,filename) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(`./public/${folderName}/${filename}.json`, data, (err) => {
            if (err) {
                resolve(-1)
            }
            resolve(1)
        });
    })
}
module.exports = {userConfigFileSaves}