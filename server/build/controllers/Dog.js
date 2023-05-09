"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Dog_1 = __importDefault(require("../models/Dog"));
const addToFavorite = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { image, breed } = req.body;
    try {
        const existingFavorite = yield Dog_1.default.findOne({ image });
        if (existingFavorite) {
            return res.status(409).json({ message: "Doggy already in the list" });
        }
        const favorite = new Dog_1.default({
            _id: new mongoose_1.default.Types.ObjectId(),
            image,
            breed,
        });
        const savedFavorite = yield favorite.save();
        res.status(201).json({ dog: savedFavorite });
    }
    catch (error) {
        res.status(500).json({ error });
    }
});
const seeAllFavorites = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const favorites = yield Dog_1.default.find();
        res.status(200).json({ favorites });
    }
    catch (error) {
        res.status(500).json({ error });
    }
});
const deleteFavorite = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const favorite = yield Dog_1.default.findByIdAndDelete(id);
        if (!favorite) {
            return res.status(404).json({ message: "Not found" });
        }
        return res.status(201).json({ favorite, message: "Deleted" });
    }
    catch (error) {
        return res.status(500).json({ error });
    }
});
exports.default = {
    addToFavorite,
    seeAllFavorites,
    deleteFavorite,
};
