var request = require('request');
var config = require('./config');


functions = {
    authorize: function(req, res) {
        var header = config.consumerkey + ':' +config.consumersecret;
        var encheader = new Buffer(header).toString('base64');
        var finalheader = 'Basic ' + encheader;
        
        request.post('https://api.twitter.com/oauth2/token', {form: {'grant_type': 'client_credentials'}, 
        headers: {Authorization: finalheader}}, function(error, response, body) {
            if(error)
            console.log(error);
            else {
                config.bearertoken = JSON.parse(body).access_token;
                //res.json({success: true, data:config.bearertoken});
                console.log('Successful authorization!');
            }
            
        })
    },
    
    country: function(req, res){
        var searchquery = req.body.query;
        var encsearchquery = encodeURIComponent(searchquery);
        var bearerheader = 'Bearer ' + config.bearertoken;
        var test = 'https://api.twitter.com/1.1/trends/place.json?id='+encsearchquery;
        request.get('https://api.twitter.com/1.1/trends/place.json?id='+encsearchquery, {headers: {Authorization: bearerheader}}, function(error, body, response) {
             if(error)
             console.log(error);
             else {
                 console.log(test);
                 res.json({success: true, data:JSON.parse(body.body)});
             }
         })
    }
    
}

module.exports = functions;