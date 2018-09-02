var util = require('./util.js');

module.exports.validate =async function(req){
    if (req.body && 
        req.body.userId &&
        req.body.productId &&
        req.body.locationName &&
        req.body.rating && 
        req.body.userNotes) {
            
            var validationMessage ="";
            userIsValid=await  util.userIsValid(req.body.userId);
            if(!userIsValid){
                validationMessage+="- UserID is not Valid \n"
            }
            productIsValid = await util.productIsValid(req.body.productId);
            if(!productIsValid){
                validationMessage+= "- ProductId is not Valid \n"
            }
            if(!Number.isInteger(req.body.rating) || req.body.rating>5 ){
                validationMessage+= "- Rating should be an integer less than, or equal to 5 \n"
            }
              return validationMessage;
            
        }
        else{
          return  'Please pass a userId, productId, locationName, rating and userNotes in the request body' ;
        }
   }