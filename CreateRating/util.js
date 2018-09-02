var rp = require('request-promise');

module.exports.userIsValid = function(userId){
    isValid = rp('http://serverlessohuser.trafficmanager.net/api/GetUser?userId='+userId).then(body => {
       return true;
         }).catch(err =>{
       console.log(err);
       return false;
     });
         return isValid;
   }
   
module.exports.productIsValid =function(productId){
       isValid = rp('http://serverlessohproduct.trafficmanager.net/api/GetProduct?productId='+productId).then(body => {
          return true;
            }).catch(err =>{
          console.log(err);
          return false;
        });
            return isValid;
      }
     
module.exports.generateGuid = function() {
        function s4() {
          return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
      }