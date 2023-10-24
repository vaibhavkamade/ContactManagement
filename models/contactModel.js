const mongoose = require('mongoose');



const contactSchema = new mongoose.Schema({
    user_id: {
        type:mongoose.Schema.Types.ObjectId,
        ref: 'user' // Reference to the 'User' model  
      },
    name:String,
    email:String,
    phone:String
})

contactSchema.set('timestamps',true);

module.exports = mongoose.model("contact",contactSchema);