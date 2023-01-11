function ProcessResult(result, isDictionary = false) {

    console.log(typeof result);
    console.log(result);
    let s = JSON.stringify(result);
    s = s.replaceAll('\\u0000', '');
    s = s.replaceAll('\\x00', '');
    r = JSON.parse(s);
    
    if (isDictionary) {
        console.log("its a map should return dictionary");
        var dic = {};
        r["0"].forEach((key, i) => dic[key] = r["1"][i]);
        console.log(dic);
        return dic;
    }
    return r;
}
exports.ProcessResult = ProcessResult;
function ProcessFilterableResult(result, isDictionary = false,type) {

    console.log(typeof result);
    console.log(result);
    console.log("type =");
    console.log(type);
    let s = JSON.stringify(result);
    s = s.replaceAll('\\u0000', '');
    s = s.replaceAll('\\x00', '');
    
    r = JSON.parse(s);
    
    if (isDictionary) {
        console.log("its a map should return dictionary");
        var dic = {};

        r["0"].forEach((key, i) => dic[key] = (r["1"][i] instanceof Array) ? filterArray(r["1"][i],type):filterString(r["1"][i],type));
        
        console.log(dic);
        return dic;
    }
    console.log("r instanceof Array");
    console.log(r instanceof Array);
    if(r instanceof Array)
    {
        return filterArray(r,type);
    }
    
    return r;
}
function filterString(e,type)
{
    if(shouldfilterString) return e+"";
    return null;
}
function shouldfilterString(e,type)
{
    return (e+"").toLowerCase().startsWith(type.toLowerCase());
}
function filterArray(a,type)
{
    return a.filter(function(e){ return shouldfilterString(e,type)});
}
exports.ProcessFilterableResult = ProcessFilterableResult;

function FillFunctionFromParams(params, signature, contract, req) {

    for(i=0;i<params.length;i++)
    {
        element=params[i];
        if(element.includes(","))
        {
            console.log("has comma")
            params[i]=element.split(",");
        }
    }
   
    switch (params.length) {
        default: signature = contract.methods[req.params.functionName]();
        case 0:
            signature = contract.methods[req.params.functionName]();
            break;
        case 1:
            signature = contract.methods[req.params.functionName](params[0]);
            break;
        case 2:
            signature = contract.methods[req.params.functionName](params[0], params[1]);
            break;
        case 3:
            signature = contract.methods[req.params.functionName](params[0], params[1], params[2]);
            break;
        case 4:
            signature = contract.methods[req.params.functionName](params[0], params[1], params[2], params[3]);
            break;
        case 5:
            signature = contract.methods[req.params.functionName](params[0], params[1], params[2], params[3], params[4]);
            break;
        case 6:
            signature = contract.methods[req.params.functionName](params[0], params[1], params[2], params[3], params[4], params[5]);
            break;
        case 7:
            signature = contract.methods[req.params.functionName](params[0], params[1], params[2], params[3], params[4], params[5], params[6]);
            break;
    }
    return signature;
}
exports.FillFunctionFromParams = FillFunctionFromParams;
