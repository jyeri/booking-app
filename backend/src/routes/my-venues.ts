import express, { Request, Response } from 'express';
import multer from 'multer';
import cloudinary from 'cloudinary';
import Venue from '../models/venue';
import { VenueType } from '../shared/types';
import { verifyToken } from '../middleware/auth';
import { body } from 'express-validator';

const router = express.Router();

const storage = multer.memoryStorage();

const upload = multer({ 
    storage: storage,
    limits: {
        fileSize: 10 * 1024 * 1024 //10MB
    }
});

// api to post a new venue
router.post("/",
    verifyToken, [
    body("name").notEmpty().withMessage("Name is required"),
    body("city").notEmpty().withMessage("City is required"),
    body("country").notEmpty().withMessage("Country is required"),
    body("description").notEmpty().withMessage("Description is required"),
    body("address").notEmpty().withMessage("Address is required"),
    body("type").notEmpty().withMessage("Type is required"),
    body("capacity").notEmpty().isNumeric().withMessage("Capacity must be a number"),
    body("facilities").isArray().withMessage("Facilities must be an array"),
    body("pricePerHour").notEmpty().isNumeric().withMessage("Price per hour must be a number"),
    body("starRating").isInt().withMessage("Star rating must be a number betweem 1 and 5"),

    ],
    upload.array("imageFiles", 6),
    async (req: Request, res: Response) => {
    try {
        const imageFiles = req.files as Express.Multer.File[];
        const newVenue: VenueType = req.body;

        const uploadPromises = imageFiles.map(async(image) => {
            const b64 = Buffer.from(image.buffer).toString("base64");
            let dataURI = "data:" + image.mimetype + ";base64," + b64;
            const res = await cloudinary.v2.uploader.upload(dataURI);
            return res.url;
        });
        const imageUrls = await Promise.all(uploadPromises);
        newVenue.imageUrls = imageUrls;
        newVenue.lastUpdated = new Date();
        newVenue.userId = req.userId;
    
        const venue = new Venue(newVenue);
        await venue.save();
    
        res.status(201).send(venue);
    }
    catch (error) {
        console.error("Error creating new venue: ", error);
        res.status(500).json({message: "Something went wrong"});
    }
})

router.get("/", verifyToken, async (req: Request, res: Response) => {
    try {
        const venues = await Venue.find({ userId: req.userId });
        res.json(venues);
    } catch (error) {
        res.status(500).json({message: "Error fetching venues"});
    }
})

export default router;