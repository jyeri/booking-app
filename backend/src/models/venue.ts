import mongoose from "mongoose";
import { VenueType } from "../shared/types";

const venueSchema = new mongoose.Schema<VenueType>({
    userId: { type: String, required: true },
    name: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
    address: { type: String, required: true },
    description: { type: String, required: true },
    type: { type: String, required: true },
    capacity: { type: Number, required: true },
    facilities: [{ type: String, required: true }],
    pricePerHour: { type: Number, required: true },
    starRating: { type: Number, required: true, min: 1, max: 5 },
    imageUrls: [{ type: String, required: true }],
    lastUpdated: { type: Date, required: true },
});

const Venue = mongoose.model<VenueType>("Venue", venueSchema);
export default Venue;