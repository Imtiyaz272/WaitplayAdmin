import express, { request } from "express";
import mongoose from "mongoose";
import cors from 'cors';
import tableRoute from './routes/tableRoute.js';
import restaurantRoute from './routes/restaurantRoute.js';
import requestsRoute from './routes/requestsRoute.js'
import adminRoute from './routes/adminRoute.js';
import {PORT, mongoURL} from './config.js';

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(mongoURL).then(()=>{
    console.log("Database is connected");
})
.catch((error) => {
    console.log(error);
});

app.get('/', (req, res)=>{
    return res.status(200).send("Backend");
});

app.use('/api', tableRoute);
app.use('/',restaurantRoute);
app.use('/admin',requestsRoute);
app.use('/superadmin',adminRoute);

app.listen(PORT, ()=>{
    console.log(`App is listening to port : ${PORT}`);
});
