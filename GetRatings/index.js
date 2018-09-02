var dao = require('./dao.js');

module.exports =async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    if (req.query || req.body) {
         ratings =await  dao.getRatings();
         if(ratings.length>0){
              context.res = {
              body: ratings
        };
    }
    }
    else {
        context.res = {
            status: 400,
            body: "No ratings could be found"
        };
    }
    context.done();
};