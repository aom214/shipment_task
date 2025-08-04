import { Router } from "express";
import { Create_Shipments, add_hops, addFlight} from "../controller/shipments.js";
const route=Router();

route.post("/create",Create_Shipments)
route.post("/:shipment_number/hops/add",add_hops)

route.post("/:shipment_number/flights/add",addFlight)

export default route;
