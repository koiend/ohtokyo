module.exports = async function (context, req) {

    data = context.bindings.inputDocumentIn;
    if(data){
        delete data["_rid"]
        delete data["_self"]
        delete data["_ts"]
        delete data["_etag"]
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