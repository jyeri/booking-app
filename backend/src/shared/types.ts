export interface VenueType {
    _id: string;
    userId: string;
    name: string;
    city: string;
    country: string;
    description: string;
    address: string;
    type: string;
    capacity: number;
    facilities: string[];
    pricePerHour: number;
    starRating: number;
    imageUrls: string[];
    lastUpdated: Date;
}
