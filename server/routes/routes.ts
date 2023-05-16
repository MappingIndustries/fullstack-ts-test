import express, { Request, Response } from "express";
interface CustomRequest extends Request {
  user?: any;
}
import { Favourites } from "../models/model";
import { fetchKey, fetchWeather } from "../helper_functions/helperFunctions";
import { Query } from "../types/types";
import { authenticateToken, accessTokenSecret } from "../helper_functions/authentication";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import jwt from "jsonwebtoken";

const router = express.Router();

router.get("/api/search", authenticateToken, async (req: Request<unknown, unknown, unknown, Query>, res: Response) => {
  try {
    const query = req.query.q
    const searchedCity = await fetchKey(query);
    const currentWeather = await fetchWeather(searchedCity.Key)
    return res.status(200).send({currentWeather, query});
  } catch (err) {
    return res.status(400).send({status: 'Not a valid city'})
  }
});
router.get("/api/favorites", authenticateToken, async (req: any, res: Response) => {
  try {
    const favourites = await Favourites.find({ uid: req.user.uid });
    return res.status(200).send(favourites[0].favourites);
  } catch (err) {
    return res.status(400).send(err)
  }
});
router.post("/api/favorites", authenticateToken, async (req: CustomRequest, res: Response) => {
  try {
    const favourites = await Favourites.find({ uid: req.user.uid });
    const keySet = new Set(favourites.flatMap((data) => data.favourites.map((item) => item.key)))
    if(!keySet.has(req.body.key)) {
      await Favourites.updateOne({uid: req.user.uid}, {$push: {favourites: req.body}})
      return res.status(200).send({status: 'success'});
    }
    return res.status(404).send({status: 'Favourite exists'})
  } catch (err) {
    return res.status(400).send({status: 'failed'});
  }
});
router.delete("/api/favorites/:key", authenticateToken, async(req: CustomRequest, res: Response) => {
  try {
    await Favourites.updateOne({uid: req.user.uid}, {$pull: {favourites:{key: req.params.key}}})
    return res.status(200).send({status: 'success'});
  } catch (err) {
    return res.status(400).send({status: 'failed'});
  }
});
router.get("/api/user", authenticateToken, async (req: CustomRequest, res: Response) => {
  const user = await Favourites.find({ uid: req.user.uid });
  res
    .status(200)
    .send({
      email: user[0]?.email,
      uid: user[0]?.uid,
      favourites: user[0]?.favourites,
      status: "success",
    });
});
router.post("/api/user/register", async (req: Request, res: Response) => {
  const hashedPass = await bcrypt.hash(req.body.password, 10);
  try {
    await Favourites.create({
      email: req.body.email,
      password: hashedPass,
      uid: uuidv4(),
      favourites: [],
    });
    return res.status(200).send({status: 'success'});
  } catch (err) {
    return res.status(400).send(`failed to create new User, ERROR: ${err}`);
  }
});
router.post("/api/user/login/", async (req: Request, res: Response) => {
  const verifyUser = await Favourites.find({ email: req.body.email });
  verifyUser.find(async (user) => {
    if (user.password) {
      if (await bcrypt.compare(req.body.password, user.password)) {
        if (typeof accessTokenSecret === "string") {
          const userDetails = {
            email: user.email,
            uid: user.uid,
            favourites: user.favourites,
          };
          const accessToken = jwt.sign(userDetails, accessTokenSecret);
          return res
            .status(200)
            .send({ status: "Login Successful", accessToken: accessToken });
        }
        return res.status(500).send("Internal Server Error");
      }
      return res.status(404).send("Invalid Password");
    }
    return res.status(500).send("Internal Server Error");
  });
});

export { router as appRouter };
