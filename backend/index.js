import express, { request } from "express";
import mongoose from "mongoose";
import cors from 'cors';
import tableRoute from './routes/tableRoute.js';
import adminRoute from './routes/adminRoute.js';
import orderRoute from './routes/orderRoute.js';
import menuRoute from './routes/menuRoute.js';
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
app.use('/orders', orderRoute);
app.use('/superadmin',adminRoute);
app.use('/menu', menuRoute);
app.use("/uploads", express.static("uploads"));

app.listen(PORT, ()=>{
    console.log(`App is listening to port : ${PORT}`);
});
