module.exports = function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    if (req.query.userId || (req.body && req.body.userId)) {
        context.res = {
            // status: 200, /* Defaults to 200 */
            body: "Ratings: " + (req.query.userId || req.body.userId)
        };
    }
    else {
        context.res = {
            status: 400,
            body: "Please pass a userId on the query string or in the request body"
        };
    }
    context.done();
};