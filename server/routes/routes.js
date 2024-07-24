import express from "express";
const router = express.Router();

import authRouter from "../app/routers/authRouter.js";
import chatRouter from "../app/routers/chatRouter.js";
import feedbackRouter from "../app/routers/feedbackRouter.js";
import requestRouter from "../app/routers/requestRouter.js";

const apiRoutes = [
  {
    path: "/auth",
    route: authRouter,
  },
  {
    path: "/chat",
    route: chatRouter,
  },
  {
    path: "/feedback",
    route: feedbackRouter,
  },
  {
    path: "/request",
    route: requestRouter,
  },
];

apiRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
