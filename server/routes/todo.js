import express from "express";
import {
	createTodo,
	deleteTodo,
	getAllTodo,
	getTodo,
	proritizedTodo,
	searchTodo,
	sortTodo,
	updateTodo,
} from "../controllers/todoController.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

//Create Todo
router.post("/", verifyToken, createTodo);

//Update Todo
router.put("/:id", verifyToken, updateTodo);

//Delete Todo
router.delete("/:id", verifyToken, deleteTodo);

//Get Todo
router.get("/:id", verifyToken, getTodo);

//Get All Todo
router.get("/", verifyToken, getAllTodo);

//Search Todo
router.get("/search", verifyToken, searchTodo);

//Sort Todo
router.get("/sort", verifyToken, sortTodo);

//Prioritized Todo
router.get("/priority", verifyToken, proritizedTodo);

export default router;
