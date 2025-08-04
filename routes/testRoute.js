import { Router } from "express";

const route=Router();

route.get("/",(req,res)=>{
    res.status(200).json({"message":"hello this is running"})
})

export default route;
