const csv = require('csvtojson');
const fs = require('fs');

const parseCsv = function (fileName = null, filePath = null) {
    if (!!fileName) {
        const csvFilePath = './' + fileName;
        return csv({
            noheader: false,
            trim: true,
            delimiter: ';'
        }).fromFile(csvFilePath)
            .then((paymentArray)=>{
                return paymentArray;
            })
    }
    if (filePath) {
        const filenames = fs.readdirSync(filePath).filter(fn => fn.endsWith('.CSV'));
        const csvFilePath = filePath + filenames[0];
        return csv({
            noheader: false,
            trim: true,
            delimiter: ';'
        }).fromFile(csvFilePath)
            .then((paymentArray)=>{
                fs.unlink(csvFilePath, (err) => {
                    if (err) throw err;
                });
                return paymentArray;
            })
    }
}

module.exports = {
    parseCsv,
};
