var dao = require('./dao.js');

module.exports =async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    if (req.query && req.query.id ) {
        ratings =await  dao.getRating(req.query.id);
           if (typeof ratings != 'undefined'){
             context.res = {
             body: ratings
       };
   }else{
    context.res = {
        status: 400,
        body: "id is not valid"
    };
   }
   }
   else {
       context.res = {
           status: 400,
           body: "id is not provided "
       };
   }
    context.done();
};