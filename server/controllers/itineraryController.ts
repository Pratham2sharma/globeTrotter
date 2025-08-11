import { Request, Response } from "express";
import Itinerary from "../model/Itinerary.js";

export const createItinerary = async (req: Request, res: Response) => {
  try {
    const itinerary = new Itinerary(req.body);
    await itinerary.save();
    res.status(201).json(itinerary);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(400).json({ message: "An unknown error occurred" });
    }
  }
};

export const getItineraryByTripId = async (req: Request, res: Response) => {
  try {
    const itinerary = await Itinerary.findOne({ tripId: req.params.tripId });
    if (!itinerary)
      return res.status(404).json({ message: "Itinerary not found" });
    res.json(itinerary);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(400).json({ message: "An unknown error occurred" });
    }
  }
};

export const updateItinerary = async (req: Request, res: Response) => {
  try {
    const itinerary = await Itinerary.findOneAndUpdate(
      { tripId: req.params.tripId },
      req.body,
      { new: true }
    );
    if (!itinerary)
      return res.status(404).json({ message: "Itinerary not found" });
    res.json(itinerary);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(400).json({ message: "An unknown error occurred" });
    }
  }
};

export const deleteItinerary = async (req: Request, res: Response) => {
  try {
    const itinerary = await Itinerary.findOneAndDelete({
      tripId: req.params.tripId,
    });
    if (!itinerary)
      return res.status(404).json({ message: "Itinerary not found" });
    res.json({ message: "Itinerary deleted" });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(400).json({ message: "An unknown error occurred" });
    }
  }
};
