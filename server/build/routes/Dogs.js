"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const Dog_1 = __importDefault(require("../controllers/Dog"));
const router = express_1.default.Router();
router.get("/favorites", Dog_1.default.seeAllFavorites);
router.post("/newFavorite", Dog_1.default.addToFavorite);
router.delete("/delete/:id", Dog_1.default.deleteFavorite);
router.get("/favorites/breed", Dog_1.default.getFavoritesByBreed);
module.exports = router;
