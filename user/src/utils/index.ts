import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { connect, Connection, Channel, ConsumeMessage } from "amqplib";
import { CONFIG } from '../config/index';

//Utility functions
export const GenerateSalt = async (): Promise<string> => {
  return await bcrypt.genSalt();
};

export const GeneratePassword = async (
  password: string,
  salt: number | string
): Promise<string> => {
  return await bcrypt.hash(password, salt);
};

// Validate Password
export const ValidatePassword = async (
  enteredPassword: string,
  savedPassword: string,
  salt: number | string
) => {
  return (await GeneratePassword(enteredPassword, salt)) === savedPassword;
};

export const GenerateSignature = async (payload: any): Promise<string | undefined> => {
  const appSecret = CONFIG.APP_SECRET
  if(appSecret !== undefined) return await jwt.sign(payload, appSecret, { expiresIn: "2h" });
};

export const ValidateSignature = async (req: any): Promise<boolean> => {
  const signature = req.get("Authorization");

  if (signature) {
    try {
      const token = signature.split(" ")[1];
      const appSecret = CONFIG.APP_SECRET
      if(appSecret !== undefined) {
        const payload = await jwt.verify(token, appSecret);
        req.user = payload;
        return true;
      }
    } catch (error) {
      // Handle verification error
      return false;
    }
  }

  return false;
};

export const FormateData = (data: any): { data: any } => {
  if (data) {
    return { data };
  } else {
    throw new Error("Data Not found!");
  }
};

/*----------------Message broker configs-----------*/

// Create a channel
export const CreateChannel = async (): Promise<Channel> => {
  try {
    const messageBrokerURL = CONFIG.MESSAGE_BROKER_URL
    if(messageBrokerURL !== undefined) {
       const connection: Connection = await connect(messageBrokerURL);
       const channel: Channel = await connection.createChannel();
       await channel.assertExchange(CONFIG.EXCHANGE_NAME, "direct",  { durable: false });
       return channel;
    } else{
      throw new Error('Message broker URL is undefined.');
    }
  } catch (error) {
    throw error;
  }
};

// Subscribe to message broker
export const SubscribeToMessage = async (
  channel: Channel,
  service: any
): Promise<void> => {
  try {
    const appQueue = await channel.assertQueue(CONFIG.QUEUE_NAME);
    await channel.bindQueue(appQueue.queue, CONFIG.EXCHANGE_NAME, CONFIG.USER_BINDING_KEY);
    await channel.consume(appQueue.queue, (data : ConsumeMessage | null) => {
      console.log("---received data in user service-----");
      console.log(data?.content.toString());
      service.SubscribeEvents(data?.content.toString());
      if(data !== null) return channel.ack(data);
    });
  } catch (error) {
    throw error;
  }
};
