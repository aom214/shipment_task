import mongoose from "mongoose"

const flight = new mongoose.Schema({
    shipment_number: {
        type:String,
        required:true
    },
    flight_number: {
        type:String,
        required:true
    },
    flight_path:{type:String,
        required:true
    },
    departure: {
        type:Date,
        required:true
    },
    arrival:{
        type:Date,
        required:true
    },
    status: {
        type:String,
        default:'in-transit'
    } // default status.

})

const flight_model = mongoose.model("Flight",flight)

export default flight_model