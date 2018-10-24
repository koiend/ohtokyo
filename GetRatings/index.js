module.exports = async function (context, req) {

    data = context.bindings.inputDocumentIn;
    
    if(data){
        for(var i in data){
            context.log(data[i]);
            delete data[i]["_rid"]
            delete data[i]["_self"]
            delete data[i]["_ts"]
            delete data[i]["_etag"]
        }
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
};