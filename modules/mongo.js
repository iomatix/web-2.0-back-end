var MongoClient = require( 'mongodb' ).MongoClient;
var mongoose = require('mongoose');
// Modele
const Item = require('../db_models/item');
const User = require('../db_models/user');

var _db;
var _client;
module.exports = {
    connectToServer: function( dbName, callback ) {
        MongoClient.connect("mongodb://localhost:27017/local", function(err, client) {
            _client = client;
            console.log("Nawiązano połączenie z serwerem MongoDB...");
            _db = client.db(dbName);
            mongoose.connect('mongodb://localhost:27017/local');
 
            return callback( err );
        } );
    },
    getDb: function() {
        return _db;
    },
    closeConnection: function() {
        _client.close();
    },
    createItem: function(tName,tDesc,tPrice){

        return new Item({_id:tName,name:tName,desc:tDesc,price:tPrice})
    },
    getItems:  function(){
        return  Item.find();
    },
    getItem:  function(tName){
        return  Item.find({name:tName});
    },
    removeItem: async function(tID){
        await Item.deleteMany({_id:tID});
    },
    createUser: function(tEmail,tPass,tAccLevel){
        return new User({_id:tEmail,username:tEmail,password:tPass,accesslevel:tAccLevel})
    },
    getUsers:  function(){
        return  User.find();
    },
    getUser:  function(tEmail){
        return  User.find({username:tEmail});
    },
    getUserByAccLevel:  function(tAccLevel){
        return  User.find({accesslevel:tAccLevel});
    },
    removeUser: async function(tID){
       await User.deleteMany({_id:tID});
    },
    saveItem: async function(tItem){
        await tItem.save();
    }
};