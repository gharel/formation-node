import express from "express";

const app = express();
const port = 3000;

app.get("/", (req, res) => {
	res.json({ message: "Hello API TypeScript!" });
});

app.listen(port, () => {
	console.log(`API started: http://localhost:${port}`);
});
