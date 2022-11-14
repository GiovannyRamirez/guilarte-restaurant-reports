const { model, Schema } = require('mongoose')

const reportSchema = new Schema({
    start_date: {
        type: String,
        default: "",
        required: true,
    },
    end_date: {
        type: String,
        default: "",
        required: true,
    },
    evaluated: {
        type: Number,
        default: 0,
        required: true,
    },
    most: {
        type: [{ 
            type: Schema.Types.ObjectId,
            ref: "Data",
        }],
        required: true,
    },
    less: {
        type: [{ 
            type: Schema.Types.ObjectId,
            ref: "Data",
        }],
        required: true,
    },
    top: {
        type: [{ 
            type: Schema.Types.ObjectId,
            ref: "Data",
        }],
        required: true,
    },
    additional: {
        type: String,
        default: "",
    }
}, {
    timestamps: true,
})

const Report = model('Report', reportSchema)

module.exports = Report