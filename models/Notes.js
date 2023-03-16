//mongoose model
const mongoose = require('mongoose');
const {Schema}=mongoose;

const NotesSchema =new Schema({
   //user is a foreign key denoting of which user notes should bve fetched,ref is refrence schema name
    user:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
   },
    title:{
    type:String,
    required:true
   },
    description:{
        type: String,
        required: true
    },
    tags:{
        type: String,
        default: "general"
    },
    date:{
        type: Date,
        default: Date.now
    },

})
//export schema
module.exports=mongoose.model('notes',NotesSchema);
//we make a model of mon goose from this schema using mongoose.model func
//which takes model name(User) and schema name(NotesSchema)