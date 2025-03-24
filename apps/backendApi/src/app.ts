import express from 'express';
import bodyParser from 'body-parser';
import userRoutes from './routes/user.routes'

const app = express();

// Middlewares
app.use(bodyParser.json());

// Routes
app.use('/api/users', userRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to the backend!');
});

export default app;
