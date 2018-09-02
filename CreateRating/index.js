var validation=require('./validation.js');
var util=require('./util.js');
var dao = require('./dao.js');
var rp = require('request-promise');

module.exports =async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');
    isValid =await validation.validate(req);
    if (""=== isValid) {

        
         guid =  util.generateGuid();

         var rating ={
            "_id":guid,
            "userId":req.body.userId,
            "productId": req.body.productId,
            "timestamp": JSON.stringify(new Date()).replace(/"/g,''),
            "locationName": req.body.locationName,
            "rating": req.body.rating ,
            "userNotes":req.body.userNotes
         };
         
        context.res = {
            body: rating
        };
        var result =await dao.insertDocument(rating);
    }
    else {
        context.res = {
            status: 400,
            body: isValid
        };
    }
    context.done();
};

