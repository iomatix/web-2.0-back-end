const db = require('../modules/mongo');

var removeItem =async function(name){
    const itThis = await db.getItem(name);
    console.log("REMOVING:",itThis[0].name,itThis[0].desc,itThis[0].price);
    db.removeItem(name);

    return true;
    }
    module.exports=removeItem;