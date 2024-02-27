import 'dotenv/config';
import express from 'express';
const app = express();
let PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  await connectDB();
  console.log('Server listening at 3000');
});