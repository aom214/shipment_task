import { Router } from "express";
import testroute from "./testRoute.js"

const route=Router();

route.use("/test",testroute)


export default route;
