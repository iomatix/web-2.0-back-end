const db = require('../modules/mongo');

var getItem =async function(name){
    const itThis = await db.getItem(name);
    console.log("GOT:",itThis.name,itThis.desc,itThis.price);

    return itThis;
    }
    module.exports=getItem;