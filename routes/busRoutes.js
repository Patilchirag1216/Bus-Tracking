import express from "express";
import { getBuses, deleteBus, addBus,getAvailableBuses,assignBus, updateBus, updateBusLocation,stopSharingLocation,GetBusLocationById} from "../controllers/busController.js";const router = express.Router();

router.get("/", getBuses);
router.post("/", addBus);
router.delete("/:id", deleteBus);
router.get("/available", getAvailableBuses);
router.put("/assignbus",assignBus);
router.put("/updatelocation",updateBusLocation);
router.put("/stopsharing",stopSharingLocation);
router.get("/getbuslocationbyid/:id",GetBusLocationById);


export default router;
