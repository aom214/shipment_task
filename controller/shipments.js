import ship from "../models/shipments.js"
import { AppError } from "../utils/errorHandler.js"


import flight from "../models/flight.js"


const Create_Shipments=async(req,res)=>{
    try {
        const {origin,destination,shipment_number} = req.body
    
        if(!origin || !destination || !shipment_number){
            return res.status(400).json({
            "success": false,
            "message": "Origin and destination are required fields."
            })
        }

        const is_ship = await ship.findOne({shipment_number})
        if(is_ship){
            return res.status(400).json({
            "success": false,
            "message": "shipments already exists"
            })
        }
        const hops = [origin,destination]
        const new_ship = new ship({
            origin,destination,shipment_number,hops
        })
    
        await new_ship.save()
    
        return res.status(200).json({
            "success": true,
            "message": "Shipment created successfully.",
            "data": {
                "shipment_number": new_ship.shipment_number,
                "hops": new_ship.hops
            }
        })
    } catch (error) {
        return res.status(500).json({
            "success": false,
            "message": error
            })
    }

}



const add_hops=async (req,res)=>{
    try {
        const {previous_hop,next_hop,new_hop} = req.body
    
        const {shipment_number} = req.params
    
        if(!shipment_number){
            return res.status(400).json({
                "success": false,
                "message": "ship number is required"
                })
        }
        if(!previous_hop || !next_hop || !new_hop){
            return res.status(400).json({
                "success": false,
                "message": "all fields are required"
                })
        }
    
        const shipping = await ship.findOne({
            shipment_number:shipment_number
        })
    
        if(!shipping){
            return res.status(400).json({
                "success": false,
                "message": "shipping does not exist"
                })
        }
    
    
        const index_hop = shipping.hops.indexOf(previous_hop)
        if(index_hop==-1){
            return res.status(400).json({
                "success": false,
                "message": "previous ship not exist"
                })
        }
    
        const new_hops = [...shipping.hops.slice(0,index_hop),next_hop,new_hop, ...shipping.hops.slice(index_hop)]
    
        shipping.hops = [...new_hops]
    
        await shipping.save()
    
    
        res.status(200).json({
        "success": true,
        "message": "Hop added successfully.",
        "data": {
            "shipment_number": shipping.shipment_number,
            "hops": shipping.hops
        }
        }
        )
    } catch (error) {
        res.status(500).json({
        "success": false,
        "message": "server error"})
    }



}



const addFlight = async(req,res)=>{
    const {carrier,from , to, flight_number,departure,arrival} = req.body 

    const {shipment_number} = req.params

    if(!carrier || !from || !to || !flight_number || !departure || !arrival){
        return res.status(400).json({
                "success": false,
                "message": "all fields are required"
                })
        }

    if(!shipment_number){
        return res.status(400).json({
                "success": false,
                "message": "all fields are required"
                })
        }
    

    const shipping = await ship.findOne({
            shipment_number:shipment_number
        })
        
    if(!shipping){
            return res.status(400).json({
                "success": false,
                "message": "shipping does not exist"
                })
        }
    

    const path =from+carrier+to
    const new_flight = new flight({
        carrier,from,to,flight_number,departure,arrival,flight_path:path,shipment_number
    })

    await new_flight.save()

    return res.status(200).json({
        "success": true,
        "message": "Flight information added successfully.",
        "data": {
            "shipment_number": shipment_number,
            "flight_number": new_flight.flight_number,
            "flight_path": from+carrier+to,
            "departure": departure,
            "arrival": arrival,
            "status": "in-transit"}})
    

        }


const update_Flight = async(req,res)=>{
    const status = req.body
    const {flight_number} = req.params
    if(!status){
        return res.status(400).json({"success": false,
                "message": "all fields are required"
                })
    }

    if(!flight_number){
        return res.status(400).json({"success": false,
                "message": "all fields are required"
                })
    }

    const req_flight = await flight.findOne({flight_number})


    if(!req_flight){
        return res.status(400).json({"success": false,
                "message": "fligth does not exist"
                })
    }

    req_flight.status = status
    await req_flight.save()

    return res.status(200).json({
        "success": true,
  "message": "Flight status updated successfully.",
  "data": {
    "flight_number": req_flight.flight_number,
    "status": req_flight.status
  }

    })
}
export {Create_Shipments,add_hops,addFlight,update_Flight}