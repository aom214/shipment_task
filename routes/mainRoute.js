import { Router } from "express";
import testroute from "./testRoute.js"
import shipping from "./shipping.js"

import { update_Flight } from "../controller/shipments.js";

const route=Router();

route.use("/test",testroute)
route.use("/shipments",shipping)


route.put("/flights/:flight_number/status",update_Flight)

export default route;
