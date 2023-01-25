import { ObjectId } from "mongodb";
import Mongo from "../Clients/Mongo";
import { User } from "../types/user";

export const getUser = (id: string) =>
  Mongo.then((mongo) =>
    mongo
      .db("UserData")
      .collection("users")
      .findOne({
        _id: new ObjectId(id),
      })
  ).then((x) => ({
    ...x,
    _id: x._id.toString(),
  })) as any as User | null;
export const getUserByEmail = (email: string) =>
  Mongo.then((mongo) =>
    mongo.db("UserData").collection("users").findOne({
      email,
    })
  ).then((x) => ({
    ...x,
    _id: x._id.toString(),
  })) as any as User | null;
export const updateUser = (id: string, data: Partial<User>) =>
  Mongo.then((mongo) =>
    mongo
      .db("UserData")
      .collection("users")
      .updateOne({ _id: new ObjectId(id) }, { $set: data })
  );
