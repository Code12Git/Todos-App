import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";

dotenv.config();

const prisma = new PrismaClient();

export const verifyToken = async (req, res, next) => {
	const authHeader = req.headers.authorization;

	if (authHeader) {
		const token = authHeader.split(" ")[1];

		try {
			const decoded = jwt.verify(token, process.env.SECRET_KEY);
			const user = await prisma.user.findUnique({
				where: {
					id: decoded.id,
				},
			});

			if (!user) {
				return res
					.status(403)
					.json("Token is not associated with a valid user!");
			}

			req.user = user;
			next();
		} catch (err) {
			return res.status(403).json("Token is not valid!");
		}
	} else {
		return res.status(401).json("You are not authenticated!");
	}
};
