import { prisma } from "../db/conn.js";
import { todoSchema } from "../validations/todoSchema.js";
import vine from "@vinejs/vine";
import { errors } from "@vinejs/vine";
import { CustomErrorReporter } from "../validations/CustomErrorReporter.js";
//Creating a Todo
export const createTodo = async (req, res) => {
	try {
		vine.errorReporter = () => new CustomErrorReporter();
		const validator = vine.compile(todoSchema);
		const payload = await validator.validate(req.body);
		const userId = req.user.id;
		console.log("Request Payload:", req.body);
		console.log(req.user.id);
		const dueDate = req.body.dueDate ? new Date(req.body.dueDate) : new Date();

		const todo = await prisma.todo.create({
			data: {
				...payload,
				dueDate,
				user: { connect: { id: userId } },
			},
		});
		return res.status(200).json({
			success: true,
			message: "Todo created successfully",
			todo,
		});
	} catch (error) {
		if (error instanceof errors.E_VALIDATION_ERROR) {
			return res.status(400).json({ errors: error.messages });
		} else {
			console.error(error);
			return res.status(500).json("Internal Server Error");
		}
	}
};

//Updating a Todo
export const updateTodo = async (req, res) => {
	try {
		vine.errorReporter = () => new CustomErrorReporter();
		const validator = vine.compile(todoSchema);
		const payload = await validator.validate(req.body);

		const todo = await prisma.todo.update({
			where: {
				id: parseInt(req.params.id, 10),
			},
			data: payload,
		});
		if (!todo) {
			return res.status(404).json({
				success: false,
				message: "Todo not found",
			});
		}
		return res.status(200).json({
			success: true,
			message: "Todo updated successfully",
			todo,
		});
	} catch (error) {
		if (error instanceof errors.E_VALIDATION_ERROR) {
			return res.status(400).json({ errors: error.messages });
		} else {
			console.error(error);
			return res.status(500).json("Internal Server Error");
		}
	}
};

//Delete a Todo

export const deleteTodo = async (req, res) => {
	try {
		const todo = await prisma.todo.delete({
			where: {
				id: parseInt(req.params.id, 10),
			},
		});
		return res.status(200).json({
			success: true,
			message: "Todo deleted successfully",
		});
	} catch (err) {
		res.status(500).json({ errors: err.messages });
	}
};

//Getting a Todo
export const getTodo = async (req, res) => {
	try {
		const todo = await prisma.todo.findUnique({
			where: {
				id: parseInt(req.params.id, 10),
			},
		});
		return res.status(200).json({
			success: true,
			message: "Todo fetched successfully",
			todo,
		});
	} catch (err) {
		res.status(500).json({ errors: err.messages });
	}
};

//Getting All Todo
export const getAllTodo = async (req, res) => {
	try {
		const todos = await prisma.todo.findMany();
		return res.status(200).json({
			success: true,
			message: "Todos fetched successfully",
			todos,
		});
	} catch (err) {
		res.status(500).json({ errors: err.messages });
	}
};

//Searching Todo

export const searchTodo = async (req, res) => {
	const query = req.query;
	console.log(query);

	try {
		const todos = await prisma.todo.findMany({
			where: {
				OR: [
					{
						title: {
							startsWith: query,
						},
					},
					{
						description: {
							startsWith: query,
						},
					},
				],
			},
		});

		if (todos.length === 0) {
			return res.status(200).json({
				success: true,
				message: "No todos found",
				todos: [],
			});
		}

		return res.status(200).json({
			success: true,
			message: "Todo fetched successfully",
			todos,
		});
	} catch (err) {
		return res.status(500).json({ errors: err.messages });
	}
};

//Sorting Todo
export const sortTodo = async (req, res) => {
	try {
		const sortTodo = await prisma.todo.find({
			orderBy: {
				title: req.query.sort,
			},
		});
		return res.status(200).json({
			success: true,
			message: "Todo fetched successfully",
			sortTodo,
		});
	} catch (err) {
		res.status(500).json({ errors: err.messages });
	}
};

// export const paginationTodo=async(req,res)=>{
// 	try{
// 		const todo=await prisma.todo.
// 	}catch(err){

// 	}
// }

//Proritized Todo
export const proritizedTodo = async (req, res) => {
	try {
		const todo = await prisma.todo.findMany({
			where: {
				priority: req.query.priority,
			},
		});
		return res.status(200).json({
			success: true,
			message: "Todo fetched successfully",
			todo,
		});
	} catch (err) {
		res.status(500).json({ errors: err.messages });
	}
};
