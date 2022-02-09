const db = require('../modules/mongo');

var createItem =async function(name,desc,price){
    const it = await db.getItem(name);
    if(Object.keys(it).length != 0 && Object.getPrototypeOf(it) != Object.prototype){
        it[0].desc = desc;
        it[0].price = price;
        console.log("EDITED:",it[0].name,it[0].desc,it[0].price);
        await it[0].save();
    }
    else{
    const itThis = await db.createItem(name,desc,price);
    console.log("CREATED:",itThis.name,itThis.desc,itThis.price);
    await db.saveItem(itThis);
    }
    return true;
    }
    module.exports=createItem;