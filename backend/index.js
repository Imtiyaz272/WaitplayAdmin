import express, { request } from "express";
import mongoose from "mongoose";
import cors from 'cors';
import tableRoute from './routes/tableRoute.js';
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
app.use('/superadmin',adminRoute);

const dropIndex = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/<WaitPlay>", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const Table = mongoose.model("Table", new mongoose.Schema({}));
    console.log(await Table.collection.getIndexes()); // Check existing indexes

    await Table.collection.dropIndex("tableId"); // Drop the unique index
    console.log("Index dropped successfully!");
  } catch (error) {
    console.error("Error dropping index:", error.message);
  } finally {
    // mongoose.connection.close();
  }
};

dropIndex();


app.listen(PORT, ()=>{
    console.log(`App is listening to port : ${PORT}`);
});
