import { prisma } from "../db/conn.js";
import bcrypt from "bcryptjs";
import vine from "@vinejs/vine";
import { errors } from "@vinejs/vine";
import { CustomErrorReporter } from "../validations/CustomErrorReporter.js";
import { registerSchema } from "../validations/registerSchema.js";
import { loginSchema } from "../validations/loginSchema.js";
import jwt from "jsonwebtoken";

//Register Controller
export const registerController = async (req, res) => {
	try {
		vine.errorReporter = () => new CustomErrorReporter();
		const validator = vine.compile(registerSchema);
		const payload = await validator.validate(req.body);

		// Check if the email already exists
		const emailExist = await prisma.user.findUnique({
			where: {
				email: payload.email,
			},
		});

		if (emailExist) {
			return res.status(400).json({
				success: false,
				message: "Email already exists",
			});
		}

		// Hash the password before creating the user
		const saltRounds = 10;
		const hashedPassword = await bcrypt.hash(payload.password, saltRounds);

		// Create the user
		const user = await prisma.user.create({
			data: {
				name: payload.name,
				email: payload.email,
				username: payload.username,
				password: hashedPassword,
			},
		});

		return res.status(200).json({
			success: true,
			message: "User registered successfully",
			user,
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

//Login Controller
export const loginController = async (req, res) => {
	try {
		vine.errorReporter = () => new CustomErrorReporter();
		const validator = vine.compile(loginSchema);
		const payload = await validator.validate(req.body);

		// Check if the email already exists
		const emailExist = await prisma.user.findUnique({
			where: {
				email: payload.email,
			},
		});

		if (!emailExist) {
			return res.status(400).json({
				message: "Invalid Credentials",
			});
		}

		// Compare the hashed password from the database with the provided password
		const isPasswordValid = await bcrypt.compare(
			payload.password,
			emailExist.password
		);

		if (!isPasswordValid) {
			return res.status(400).json({
				message: "Invalid Credentials",
			});
		}
		const token = jwt.sign(
			{
				id: emailExist.id,
			},
			process.env.SECRET_KEY,
			{ expiresIn: "2d" }
		);

		return res.status(200).json({
			message: "User logged in successfully",
			user: emailExist,
			token,
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
