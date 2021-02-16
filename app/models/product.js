/*
*
* Author: Hector Fernandes
* Description: File intended to interact with the database
*
*/

const mongoose = require('mongoose');
const { Schema } = mongoose;

let ProductSchema = new Schema({
    name: String,
    price: Number,
    description: String
});

module.exports = mongoose.model('Product', ProductSchema);