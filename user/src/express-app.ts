import express, { Express } from 'express';
import { Channel } from 'amqplib';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();
export const expressApp = async (app: Express, channel: Channel) => {
    app.use(express.json({ limit: "1mb" }));
    app.use(express.urlencoded({ extended: true, limit: "1mb" }));
    app.use(cors());
    app.use(express.static(__dirname + "/public"));
  
    // //api
    // user(app, channel);
  
    // app.use(HandleErrors);
  };
