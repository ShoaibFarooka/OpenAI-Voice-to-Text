import express from "express";
const router = express.Router();

import CreateRequest from "../controllers/request/CreateRequest.js";

//routes
router.post("/", CreateRequest);

export default router;
