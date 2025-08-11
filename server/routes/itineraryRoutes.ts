import { Router } from "express";
import {
  createItinerary,
  getItineraryByTripId,
  updateItinerary,
  deleteItinerary,
} from "../controllers/itineraryController";

const router = Router();

router.post("/", createItinerary);
router.get("/:tripId", getItineraryByTripId);
router.put("/:tripId", updateItinerary);
router.delete("/:tripId", deleteItinerary);
 
export default router;
