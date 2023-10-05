import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoute from "./routes/auth.js";
import todoRoute from "./routes/todo.js";
// Loading environment variables from the config file
dotenv.config({ path: "./.env" });

// Creating an instance of the Express app
const app = express();

// Defining the port for the server to listen on
const port = process.env.PORT || 3000;

// Applying middleware
app.use(express.json());
app.use(cors());
app.use("/api", authRoute);
app.use("/api/todo", todoRoute);
// CORS

app.use(cors());

// Enabling Cross-Origin Resource Sharing (CORS)
// app.use("/api/auth", authRoute); // API for authentication

// Testing route to check if the server is working
app.get("/", (req, res) => {
	res.status(200).json("Working!");
});

// Starting the server and listen on the specified port
app.listen(port, () => {
	console.log(`Server is up on PORT: ${port}`);
});
