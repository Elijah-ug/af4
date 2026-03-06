import express from "express";
import { index, store } from "../controllers/adminController";
import { authenticateUser } from "../middleware/auth";
const inquiriesRouter = express.Router();

inquiriesRouter.get("/", authenticateUser, index);
inquiriesRouter.post("/", authenticateUser, store);

export default authenticateUser;
