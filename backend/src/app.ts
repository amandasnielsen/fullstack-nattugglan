import express from 'express';
import cors from 'cors';
import router from './core/router/router';
import { requireApiKey } from './core/middleware/apiKey';

const app = express();

app.use(
	cors({
		origin: 'http://nattugglan.s3-website.eu-north-1.amazonaws.com',
		allowedHeaders: ['Content-Type', 'x-api-key', 'Authorization'],
		methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
	})
);
app.use(express.json());

app.get('/', (req, res) => {
	res.send('Backend is running');
});

app.use('/api', requireApiKey, router);

export default app;
