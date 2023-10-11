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
		if (!query.title) {
			return res.status(400).json({
				success: false,
				message: "You must provide at least one search criteria title.",
			});
		}

		const lowercasedAndTrimmedTitle = query.title ? query.title.trim() : "";

		const todos = await prisma.todo.findMany({
			where: {
				title: {
					startsWith: lowercasedAndTrimmedTitle,
					mode: "insensitive",
				},
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
		return res.status(500).json({ errors: err.message });
	}
};

//Sorting Todo By Date
export const sortTodoByDate = async (req, res) => {
	try {
		const sortOrder = req.query.sortOrder;
		let orderBy = {};

		if (sortOrder === "asc") {
			orderBy = {
				dueDate: "asc",
			};
		} else if (sortOrder === "desc") {
			orderBy = {
				dueDate: "desc",
			};
		}

		const sortedTodo = await prisma.todo.findMany({
			orderBy: orderBy,
		});

		return res.status(200).json({
			success: true,
			message: "Todo fetched successfully",
			sortedTodo,
		});
	} catch (err) {
		res.status(500).json({ errors: err.messages });
	}
};

//Proritized Todo
export const prioritizedTodo = async (req, res) => {
	try {
		const todos = await prisma.todo.findMany({
			where: {
				prioritized: req.body.prioritized,
			},
		});

		res.status(200).json({
			success: true,
			message: "Todos fetched successfully",
			todos,
		});
	} catch (err) {
		res.status(500).json({ errors: err.messages });
	}
};

//Updating Priority
export const updatePriority = async (req, res) => {
	try {
		const todo = await prisma.todo.update({
			where: {
				id: parseInt(req.params.id, 10),
			},
			data: {
				prioritized: req.body.prioritized,
			},
		});
		return res.status(200).json({
			success: true,
			message: "Priority updated successfully",
			todo,
		});
	} catch (err) {
		res.status(500).json({ errors: err.messages });
	}
};

//Changing Status

export const statusChangeController = async (req, res) => {
	console.log(req.body);
	try {
		const todo = await prisma.todo.update({
			where: {
				id: parseInt(req.params.id, 10),
			},
			data: {
				status: req.body.status,
			},
		});
		return res.status(200).json({
			success: true,
			message: "Status changed successfully",
			todo,
		});
	} catch (err) {
		res.status(500).json({ errors: err.messages });
	}
};

//Pagination
export const Pagination = async (req, res) => {
	try {
		const pgnum = +(req.query.pgnum ?? 0);
		const pgsize = +(req.query.pgsize ?? 10);
		console.log(pgnum, pgsize);
		if (pgnum < 0 || pgsize <= 0) {
			return res.status(400).json({ error: "Invalid query parameters" });
		}
		const search = req.query.search ? req.query.search.trim() : null;

		const searchFilter = search
			? {
					title: {
						startsWith: search,
						mode: "insensitive",
					},
			  }
			: {};

		const todos = await prisma.todo.findMany({
			skip: pgnum * pgsize,
			take: pgsize,
			where: searchFilter,
		});

		res.status(200).json(todos);
	} catch (err) {
		res.status(500).json(err);
	}
};
