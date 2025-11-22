import express from "express";
import { getBuses, deleteBus, addBus,getAvailableBuses,assignBus, updateBus, updateBusLocation} from "../controllers/busController.js";const router = express.Router();

router.get("/", getBuses);
router.post("/", addBus);
router.delete("/:id", deleteBus);
router.get("/available", getAvailableBuses);
router.put("/assignbus",assignBus);
router.put("/updatelocation",updateBusLocation);

export default router;
