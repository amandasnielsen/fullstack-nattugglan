import express from 'express';
import cors from 'cors';
import router from './core/router/router';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', router);

app.get('/', (req, res) => {
	res.send('Backend is running');
});

export default app;
