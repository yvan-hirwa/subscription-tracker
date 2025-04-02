import express from 'express';
import { PORT } from "./config/env.js";

import subscriptionRouter from './routes/subscription.routes.js';
import userRouter from './routes/user.routes.js';
import authRouter from './routes/auth.routes.js';


const app = express();

app.use('/api/v1/subscriptions', subscriptionRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/auth', authRouter);


app.get('/', (req, res) => {

    res.send('Welcome to suscription tracker');
})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})

export default app;