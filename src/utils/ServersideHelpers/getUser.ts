import { ObjectId } from "mongodb";
import Mongo from "../Clients/Mongo";
import {
  AutoGeneratedUser,
  Link,
  PublicUser,
  UnverifiedUser,
  User,
  urlRegexes,
} from "../types/user";

const ripUndefined = <T extends Record<string, any>>(obj: T) => {
  const newObj = {} as T;
  for (const key in obj) {
    if (obj[key] !== undefined) {
      newObj[key] = obj[key];
    }
  }
  return newObj;
};

export const getUser = (id: string) =>
  Mongo.then((mongo) =>
    mongo
      .db("UserData")
      .collection("users")
      .findOne({
        _id: new ObjectId(id),
      })
  ).then((x) =>
    ripUndefined({
      ...x,
      _id: x._id.toString(),
    })
  ) as Promise<User | null>;
export const getUserByEmail = (email: string) =>
  Mongo.then((mongo) =>
    mongo.db("UserData").collection("users").findOne({
      email,
    })
  ).then((x) =>
    ripUndefined({
      ...x,
      _id: x._id.toString(),
    })
  ) as Promise<User | null>;
export const updateUser = (id: string, data: Partial<User>) =>
  Mongo.then((mongo) =>
    mongo
      .db("UserData")
      .collection("users")
      .updateOne({ _id: new ObjectId(id) }, { $set: data })
  );
export function getAllUsers<B extends boolean>(
  raw: B = false as B
): B extends true ? User[] : PublicUser[] {
  return Mongo.then((mongo) =>
    mongo.db("UserData").collection("users").find().toArray()
  ).then((x) =>
    x.map((x) =>
      ripUndefined(
        raw
          ? {
              ...x,
              _id: x._id.toString(),
            }
          : cleanUser(x as unknown as User | null)
      )
    )
  ) as any;
}
export function getAllUnverifiedUsers(): AutoGeneratedUser[] {
  return Mongo.then((mongo) =>
    mongo.db("UserData").collection("offlineUsers").find().toArray()
  ).then((x) =>
    x.map((x) =>
      ripUndefined({
        ...x,
        _id: x._id.toString(),
        type: 0,
      })
    )
  ) as any;
}

export const cleanUser = (user: User) => {
  return ripUndefined({
    _id: user._id.toString(),
    username: user.username,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    pfp: user.pfp,
    bio: user.bio,
    classOf: user.classOf,
    tags: user.tags,
    type: 1,
  } as PublicUser);
};
export const cleanlinksInput = (links: Link[]) => {
  return links.filter(
    (x) =>
      x.type && urlRegexes[x.type] && x.url && x.url.match(urlRegexes[x.type]) 
  );
};
