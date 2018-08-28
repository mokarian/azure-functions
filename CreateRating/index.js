module.exports = function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    if (req.body && 
        req.body.userId &&
        req.body.productId &&
        req.body.locationName &&
        req.body.rating && 
        req.body.userNotes) {
        context.res = {
            // status: 200, /* Defaults to 200 */
            body: "userNotes " + (req.body.userNotes) 
        };
    }
    else {
        context.res = {
            status: 400,
            body: "Please pass a userId, productId, locationName, rating and userNotes in the request body"
        };
    }
    context.done();
};