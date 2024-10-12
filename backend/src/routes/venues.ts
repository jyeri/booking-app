import express, { Request, Response} from 'express';
import Venue from '../models/venue';
import { VenueSearchResponse } from '../shared/types';

const router = express.Router();

router.get("/search", async (req: Request, res: Response) => {
    try{
        const query = constructSearchQuery(req.query);

        let sortOptions = {};
        switch (req.query.sortOption) {
            case "starRating":
                sortOptions = { starRating: -1 };
                break;
            case "pricePerHour":
                sortOptions = { pricePerHour: 1 };
                break;
            case "pricePerHourDesc":
                sortOptions = { pricePerHour: -1 };
                break;
            
        }

        const pageSize = 5;
        const pageNumber = parseInt(req.query.page ? req.query.page.toString() : "1" );
        const skip = (pageNumber - 1) * pageSize;
        const venues = await Venue.find(query).sort(sortOptions).skip(skip).limit(pageSize);

        const total = await Venue.countDocuments(query);

        const response: VenueSearchResponse = {
            data: venues,
            pagination: {
                total,
                page: pageNumber,
                pages: Math.ceil(total / pageSize)
            },
        };

        res.json(response);
    } catch (error) {
        console.log("error", error);
        res.status(500).json({message: "Search error"});
    }
});

const constructSearchQuery = (queryParams: any) => {
    let constructedQuery: any = {};
  
    if (queryParams.destination) {
      constructedQuery.$or = [
        { city: new RegExp(queryParams.destination, "i") },
        { country: new RegExp(queryParams.destination, "i") },
      ];
    }
  
    if (queryParams.capacity) {
      constructedQuery.capacity = {
        $gte: parseInt(queryParams.capacity),
      };
    }
  
    if (queryParams.facilities) {
      constructedQuery.facilities = {
        $all: Array.isArray(queryParams.facilities)
          ? queryParams.facilities
          : [queryParams.facilities],
      };
    }
  
    if (queryParams.types) {
      constructedQuery.type = {
        $in: Array.isArray(queryParams.types)
          ? queryParams.types
          : [queryParams.types],
      };
    }
  
    if (queryParams.stars) {
      const starRatings = Array.isArray(queryParams.stars)
        ? queryParams.stars.map((star: string) => parseInt(star))
        : parseInt(queryParams.stars);
  
      constructedQuery.starRating = { $in: starRatings };
    }
  
    if (queryParams.maxPrice) {
      constructedQuery.pricePerHour = {
        $lte: parseInt(queryParams.maxPrice).toString(),
      };
    }
  
    return constructedQuery;
  };

export default router;