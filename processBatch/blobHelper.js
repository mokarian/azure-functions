var storage = require('azure-storage');

module.exports.downloadBlob = async (containerName, blobName) => {
    const blobService = storage.createBlobService("DefaultEndpointsProtocol=https;AccountName=maysamblob;AccountKey=F2DHNmypQJfJWUm2Sm+DqLG0ahTK3NQ6W7spgsD2HwYEAZDk6JolaWwn/qvyEkjXCk11zImfhymTkC1YLaGf/w==;EndpointSuffix=core.windows.net");
    return new Promise((resolve, reject) => {
        blobService.getBlobToText(containerName, blobName, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve({ message: `Blob downloaded "${data}"`, text: data });
            }
        });
    });
};