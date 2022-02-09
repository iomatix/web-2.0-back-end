const db = require('../modules/mongo');

var getItems = async function(name){
    const itThis = await db.getItems();
    console.log("GOT COLLECTION:",itThis);

    return itThis;
    }
    module.exports=getItems;