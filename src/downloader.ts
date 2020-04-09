const fs = require('fs');
const request = require('request');

var download = function (uri:string, filename:string, callback:any) {
    request.head(uri, function (err:any, res:any, body:any) {
        console.log('content-type:', res.headers['content-type']);
        console.log('content-length:', res.headers['content-length']);

        request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
    });
};

module.exports = {
    download
};