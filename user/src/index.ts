import express, { Request, Response } from 'express';
import { CONFIG } from "./config";
import { CreateChannel } from "./utils";
import { expressApp } from './express-app';
import connectDB from './database/connection';

const port = CONFIG.PORT;

const StartServer = async () => {
   const app = express();

  await connectDB();

  const channel = await CreateChannel();

  await expressApp(app, channel);
app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
  app.listen(CONFIG.PORT, () => {
      console.log(`listening to port ${CONFIG.PORT}`);
    })
    .on("error", (err) => {
      console.log(err);
      process.exit();
    });
};

StartServer();