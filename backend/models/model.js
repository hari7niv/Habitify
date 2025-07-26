const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
  },
    habit:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    priority:{
        type:String,
        required:true
    },
    LastDate:{
        type:Date,
        required:false,
        default:null
    },
    currentDate:{
        type:Date,
        required:true,
        default:Date.now
    },
    iscompleted:{
        type:Boolean,
        required:false,
        default:false
    },
    status: {
        type: String,
        enum: ['pending', 'in-progress', 'completed'], 
        default: 'pending'
    },
},{ timestamps: true })

module.exports = mongoose.model('Product', ProductSchema);