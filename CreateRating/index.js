var uuid = require('node-uuid');
var rp = require('request-promise');

module.exports = async function (context, req) {
    // We need both name and task parameters.
    if (req.body.userId && req.body.productId && req.body.locationName && req.body.userNotes) {
        var rate_num = [0,1,2,3,4,5];
        if(rate_num.indexOf(req.body.rating) == -1){
            context.res = {
                status: 400,
                body: "Error"
            };
            return;
        }
        
        var exitProductId = false;
        var exitUserId = false;
        var getProductUrl = "https://serverlessohlondonproduct.azurewebsites.net/api/GetProduct";
        var getUserUrl = "https://serverlessohlondonuser.azurewebsites.net/api/GetUser";
        var getProductOption = {
            uri: getProductUrl,
            qs: {
                productId: req.body.productId
            },
            headers: {
                'User-Agent': 'Request-Promise'
            },
            json: true
        };
        var getUserOption = {
            uri: getUserUrl,
            qs: {
                userId: req.body.userId
            },
            headers: {
                'User-Agent': 'Request-Promise'
            },
            json: true
        };

        await rp(getProductOption)
            .then(function (repos) {
                if(repos.productId){
                    exitProductId = true;
                }
            })
            .catch(function (err) {
                context.log(err);
            });
        
        await rp(getUserOption)
            .then(function (repos) {
                if(repos.userId){
                    exitUserId = true;
                }
            })
            .catch(function (err) {
                context.log(err);
            });

        if(exitProductId && exitUserId){
            data = req.body;
            data["timestamp"] = new Date().toJSON().toString();
            data["id"] = uuid.v1();
            // Set the output binding data from the query object.
            context.bindings.outputDocument = data;
            // Success.
            context.res = {
                status: 200,
                body: data
            };
        }else{
            context.res = {
                status: 400,
                body: "Error"
            };
        } 
       
    }
    else {
        context.res = {
            status: 400,
            body: "Error"
        };
    }
};