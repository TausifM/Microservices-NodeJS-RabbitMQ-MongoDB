import mongoose, { Document, Model, Schema } from "mongoose";

interface IUser extends Document {
  email: string;
  password: string;
  salt: string;
  phone: string;
  cart: {
    product: {
      _id: string;
      name: string;
      banner: string;
      price: number;
    };
    unit: number;
  }[];
  wishlist: {
    _id: string;
    name: string;
    description: string;
    banner: string;
    available: boolean;
    price: number;
  }[];
  orders: {
    _id: string;
    amount: string;
    date: Date;
  }[];
}

const UserSchema: Schema<IUser> = new Schema<IUser>(
  {
    email: String,
    password: String,
    salt: String,
    phone: String,
    cart: [
      {
        product: {
          _id: { type: String, required: true },
          name: { type: String },
          banner: { type: String },
          price: { type: Number },
        },
        unit: { type: Number, required: true },
      },
    ],
    wishlist: [
      {
        _id: { type: String, required: true },
        name: { type: String },
        description: { type: String },
        banner: { type: String },
        available: { type: Boolean },
        price: { type: Number },
      },
    ],
    orders: [
      {
        _id: { type: String, required: true },
        amount: { type: String },
        date: { type: Date, default: Date.now },
      },
    ],
  },
  {
    toJSON: {
      transform(doc, ret) {
        delete ret.password;
        delete ret.salt;
        delete ret.__v;
      },
    },
    timestamps: true,
  }
);

const UserModel: Model<IUser> = mongoose.model<IUser>("user", UserSchema);

export default UserModel;
