import 'dotenv/config';
import express from 'express';
import { register } from './Controllers/Register.js';
import { login } from './Controllers/Login.js';
import connectDB from './utils/dbconn.js';
const app = express();
let PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(cors());

app.post('/signup', register);
app.post('/signin', login);

app.listen(PORT, async () => {
  await connectDB();
  console.log('Server listening at 3000');
});