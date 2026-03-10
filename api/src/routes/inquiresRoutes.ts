import express from "express";
import { authenticateUser } from "../middleware/auth";
import { destroy, index, store } from "../controllers/inquiries/userInquiryController";
const inquiriesRouter = express.Router();

inquiriesRouter.get("/", authenticateUser, index);
inquiriesRouter.post("/send", authenticateUser, store);
inquiriesRouter.delete("/:id", authenticateUser, destroy);

export default inquiriesRouter;
