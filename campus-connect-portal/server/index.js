
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import Club from "./models/Club.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Logging middleware
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// Home route
app.get("/", (req, res) => {
    res.redirect("/clubs");
});

// GET - Display all clubs
app.get("/clubs", async (req, res) => {
    try {
        const clubs = await Club.find();
        res.status(200).json(clubs);
    } catch (error) {
        res.status(500).json({
            message: "Error fetching clubs",
            error: error.message
        });
    }
});

// GET - Display a club by ID
app.get("/clubs/:id", async (req, res) => {
    try {
        if (!mongoose.isValidObjectId(req.params.id)) {
            return res.status(400).json({
                message: "Invalid club ID"
            });
        }

        const club = await Club.findById(req.params.id);

        if (!club) {
            return res.status(404).json({
                message: "Club not found"
            });
        }

        res.status(200).json(club);

    } catch (error) {
        res.status(500).json({
            message: "Error fetching club",
            error: error.message
        });
    }
});

// POST - Add a new club
app.post("/clubs", async (req, res) => {
    try {
        const { name, description } = req.body;

        if (!name?.trim() || !description?.trim()) {
            return res.status(400).json({
                message: "Name and description are required"
            });
        }

        const newClub = await Club.create({
            name: name.trim(),
            description: description.trim()
        });

        res.status(201).json({
            message: "Club added successfully",
            club: newClub
        });

    } catch (error) {
        res.status(500).json({
            message: "Error adding club",
            error: error.message
        });
    }
});

// PUT - Update an existing club
app.put("/clubs/:id", async (req, res) => {
    try {
        if (!mongoose.isValidObjectId(req.params.id)) {
            return res.status(400).json({
                message: "Invalid club ID"
            });
        }

        const { name, description } = req.body;

        if (!name?.trim() || !description?.trim()) {
            return res.status(400).json({
                message: "Name and description are required"
            });
        }

        const updatedClub = await Club.findByIdAndUpdate(
            req.params.id,
            {
                name: name.trim(),
                description: description.trim()
            },
            {
                new: true,
                runValidators: true
            }
        );

        if (!updatedClub) {
            return res.status(404).json({
                message: "Club not found"
            });
        }

        res.status(200).json({
            message: "Club updated successfully",
            club: updatedClub
        });

    } catch (error) {
        res.status(500).json({
            message: "Error updating club",
            error: error.message
        });
    }
});

// DELETE - Remove a club
app.delete("/clubs/:id", async (req, res) => {
    try {
        if (!mongoose.isValidObjectId(req.params.id)) {
            return res.status(400).json({
                message: "Invalid club ID"
            });
        }

        const deletedClub = await Club.findByIdAndDelete(
            req.params.id
        );

        if (!deletedClub) {
            return res.status(404).json({
                message: "Club not found"
            });
        }

        res.status(200).json({
            message: "Club deleted successfully",
            club: deletedClub
        });

    } catch (error) {
        res.status(500).json({
            message: "Error deleting club",
            error: error.message
        });
    }
});

// Connect to MongoDB and start server
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB connected successfully!");

        app.listen(PORT, "0.0.0.0", () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error("MongoDB connection failed:", error.message);
    });
