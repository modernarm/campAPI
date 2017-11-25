let mongoose = require('mongoose');
let Schema = mongoose.Schema;


let campSchema = new Schema({
    name: String,
    image: String
});

module.exports = mongoose.model('Camp', campSchema);
