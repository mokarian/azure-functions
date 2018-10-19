var blobHelper = require('./blobHelper.js');
var dao = require('./dao.js');
    
    module.exports = async function (context, myBlob) {
        context.log("JavaScript blob trigger function processed blob \n Name:", context.bindingData.name, "\n Blob Size:", myBlob.length, "Bytes");
        // insert Document in mongoDB
        var blobName = context.bindingData.blobTrigger.replace("mesoo/", "");
        var item = await blobHelper.downloadBlob("mesoo", blobName);
        await insertDocumentInMongoDb(blobName, item);
    
        //attemp to get all 3 documents from DB
        var prefix=context.bindingData.blobTrigger.match(/\d+/g)[0];
        var orderHeaderDetails =await dao.getItem(prefix+"-OrderHeaderDetails.csv")
        var orderLineItems =await dao.getItem(prefix+"-OrderLineItems.csv")
        var productInformation =await dao.getItem(prefix+"-ProductInformation.csv")

        wait(1000);

        // if all exists put them as a one file in Mongo and delet them from items
        if (typeof orderHeaderDetails !== 'undefined' &&
        typeof orderLineItems !== 'undefined' &&
        typeof productInformation !== 'undefined'){
              //extract value from returned result
        ({ orderHeaderDetails, orderLineItems, productInformation } = 
            getValueFromField(orderHeaderDetails, orderLineItems, productInformation));
            insertFullItems(prefix, orderHeaderDetails, orderLineItems, productInformation);
            deleteItems(prefix);
        }
    };
    
function getValueFromField(orderHeaderDetails, orderLineItems, productInformation) {
    orderHeaderDetails = JSON.stringify(JSON.parse(orderHeaderDetails).value);
    orderLineItems = JSON.stringify(JSON.parse(orderLineItems).value);
    productInformation = JSON.stringify(JSON.parse(productInformation).value);
    return { orderHeaderDetails, orderLineItems, productInformation };
}

function insertFullItems(prefix, orderHeaderDetails, orderLineItems, productInformation) {
    jsonString =
        {
            "_id": prefix,
            "orderHeaderDetails": orderHeaderDetails,
            "orderLineItems": orderLineItems,
            "productInformation": productInformation
        };
    dao.insertItem(jsonString, "fullItems");
}

function wait(ms){
    var start = new Date().getTime();
    var end = start;
    while(end < start + ms) {
      end = new Date().getTime();
   }
 }

function deleteItems(prefix) {
    var ids = [prefix + "-OrderHeaderDetails.csv",
    prefix + "-OrderLineItems.csv",
    prefix + "-ProductInformation.csv"];
    dao.deleteItems(ids);
}

async function insertDocumentInMongoDb(blobName, item) {
        var jsonString = { "_id": blobName, "value": item.text };
        dao.insertItem(jsonString, "items");
    }
    
    
