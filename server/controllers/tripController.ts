import { Request, Response } from "express";
import Trip from "../model/Tripcreate.js";

export const createTrip = async (req: Request, res: Response) => {
  try {
    console.log("Received trip data:", req.body);
    
    const { destination, startDate, endDate, travelers, budget, preferences, accommodation, transportation, activities, userId } = req.body;
    
    // Validate required fields
    if (!destination || !startDate || !endDate || !travelers || !budget) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    
    const tripData = {
      userId: userId || "temp-user-id",
      destination,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      travelers: Number(travelers),
      budget,
      preferences: preferences || [],
      accommodation: accommodation || "",
      transportation: transportation || "",
      activities: activities || [],
      status: "planning"
    };
    
    console.log("Processed trip data:", tripData);
    
    const trip = new Trip(tripData);
    const savedTrip = await trip.save();
    
    console.log("Saved trip:", savedTrip);
    res.status(201).json(savedTrip);
  } catch (error: unknown) {
    console.error("Error creating trip:", error);
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(400).json({ message: "An unknown error occurred" });
    }
  }
};

export const getTrips = async (req: Request, res: Response) => {
  try {
    const userId = req.query.userId || "temp-user-id"; // Extract from JWT token in production
    const trips = await Trip.find({ userId }).sort({ createdAt: -1 });
    res.json(trips);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(400).json({ message: "An unknown error occurred" });
    }
  }
};

export const getTripById = async (req: Request, res: Response) => {
  try {
    const trip = await Trip.findById(req.params.id);
    if (!trip) return res.status(404).json({ message: "Trip not found" });
    res.json(trip);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(400).json({ message: "An unknown error occurred" });
    }
  }
};

export const updateTrip = async (req: Request, res: Response) => {
  try {
    const trip = await Trip.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!trip) return res.status(404).json({ message: "Trip not found" });
    res.json(trip);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(400).json({ message: "An unknown error occurred" });
    }
  }
};

export const deleteTrip = async (req: Request, res: Response) => {
  try {
    const tripId = req.params.id;
    const userId = req.body.userId || "temp-user-id"; // Extract from JWT token in production
    
    // Find the trip and check if it belongs to the user
    const trip = await Trip.findById(tripId);
    if (!trip) {
      return res.status(404).json({ message: "Trip not found" });
    }
    
    // Check if the trip belongs to the requesting user
    if (trip.userId !== userId) {
      return res.status(403).json({ message: "Not authorized to delete this trip" });
    }
    
    await Trip.findByIdAndDelete(tripId);
    res.json({ message: "Trip deleted successfully" });
  } catch (error: unknown) {
    console.error("Error deleting trip:", error);
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(400).json({ message: "An unknown error occurred" });
    }
  }
};
