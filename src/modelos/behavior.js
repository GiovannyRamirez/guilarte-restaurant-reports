const { model, Schema } = require('mongoose')

const behaviorSchema = new Schema({
    name: {
        type: String,
        default: "",            
    },
    reports: {
        type: [{ 
            type: Schema.Types.ObjectId,
            ref: "Reports"
        }],
    },
})

const Behavior = model('Behavior', behaviorSchema)

module.exports = Behavior