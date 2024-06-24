
import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { connectDB } from './src/db/connection.js';
import { rootController } from './src/controller/root.js';

const app = express();
const port = 5036;

dotenv.config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

connectDB();

rootController(app)

app.listen(port, () => {
    console.log(`Our server is live on ${port}. Yay!`);
});
