import mongoose from "mongoose"

const ship = new mongoose.Schema({
    origin:{
        type:String,
        required:true,
    },
    destination:{
        type:String,
        required:true
    },
    shipment_number:{
        type:String,
        required:true,
    },
    hops:[]
})

const ship_model = mongoose.model("Ship",ship)

export default ship_model