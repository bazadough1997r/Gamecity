import express from "express";
import { getPosts, createPost ,createuser} from "../controller/controller.js";

const router = express.Router();
router.post("/regester", createuser)
router.get("/", getPosts);
router.post("/", createPost);

export default router;
