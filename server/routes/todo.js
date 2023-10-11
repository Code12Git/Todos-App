import express from "express";
import {
	createTodo,
	deleteTodo,
	getAllTodo,
	updateTodo,
	statusChangeController,
	prioritizedTodo,
	updatePriority,
	Pagination,
} from "../controllers/todoController.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

//Create Todo
router.post("/", verifyToken, createTodo);

//Update Todo
router.put("/:id", verifyToken, updateTodo);

//Delete Todo
router.delete("/:id", verifyToken, deleteTodo);

//Get All Todo
router.get("/", verifyToken, getAllTodo);

//Status Change
router.put("/status/:id", verifyToken, statusChangeController);

//Prioritized Todo
router.get("/priority", verifyToken, prioritizedTodo);

//Changing Priority
router.put("/priority/:id", verifyToken, updatePriority);

//Pagination
router.get("/pagination", verifyToken, Pagination);

export default router;
