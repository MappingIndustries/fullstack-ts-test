import express from "express";
import controller from "../controllers/Dog";

const router = express.Router();
router.get("/favorites", controller.seeAllFavorites);
router.post("/newFavorite", controller.addToFavorite);
router.delete("/delete/:id", controller.deleteFavorite);
router.get("/favorites/breed", controller.getFavoritesByBreed);

export = router;
