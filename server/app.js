import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import admin from 'firebase-admin';
import serviceAccount from './FIREBASE_ADMIN_SDK.json' assert { type: 'json' };
import { register } from './Controllers/Register.js';
import { login } from './Controllers/Login.js';
import connectDB from './Utils/dbconn.js';
import { googleAuth } from './Controllers/GoogleAuth.js';
const app = express();
let PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

app.post('/signup', register);
app.post('/signin', login);
app.post('/google-auth', googleAuth);

app.listen(PORT, async () => {
  await connectDB();
  console.log('Server listening at 3000');
});
