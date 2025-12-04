
import express from "express";
import cors from "cors";
import router from "./core/router/router";
import { requireApiKey } from "./core/middleware/apiKey";


app.use(requireApiKey);
app.use(cors());
app.use(express.json());

app.use('/api', router);

app.get('/', (req, res) => {
	res.send('Backend is running');
});

export default app;
