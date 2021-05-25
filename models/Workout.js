const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const workoutSchema = new Schema({
    date: {
        type: Date, 
        default: Date.now
    },
    workout: [
        {
            type: {
                type: String,
                trim: true,
                required: true
            }, 
            name: {
                type: String, 
                trim: true,
                required: true
            },
            weight: {
                type: Number
            },
            sets: {
                type: Number
            },
            reps: {
                type: Number
            },
            duration: {
                type: Number
            },
            distance: {
                type: Number
            },
        }
    ]
});

const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout