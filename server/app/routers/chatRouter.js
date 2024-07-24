import express from "express";
const router = express.Router();

import auth from "../middleware/auth.js";
import GCPSignedUrl from "../controllers/chat/GCPSignedUrl.js";
import CreateChatGCP from "../controllers/chat/CreateChatGCP.js";

//routes
router.post("/gcp", auth(), CreateChatGCP);
router.get("/upload/gcp", auth(), GCPSignedUrl);

export default router;
