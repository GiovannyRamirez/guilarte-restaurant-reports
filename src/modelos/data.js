const { model, Schema } = require('mongoose')

const dataSchema = new Schema({
    name: {
        type: String,
        default: "",
        required: true,            
    },
    total: {
        type: Number,
        default: 0,
        required: true,            
    },
})

const Data = model('Data', dataSchema)

module.exports = Data