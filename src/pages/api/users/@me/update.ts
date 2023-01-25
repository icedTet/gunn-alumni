import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { getUserID } from "../../../../utils/Clients/AuthManager";
import Mongo from "../../../../utils/Clients/Mongo";
import {
  getUser,
  updateUser,
} from "../../../../utils/ServersideHelpers/getUser";
import { GivenUser, User } from "../../../../utils/types/user";
type NotFoundResponse = null;
export type SelfUserResponse = GivenUser | NotFoundResponse;
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SelfUserResponse>
) {
  if (req.method === "POST") {
    const data = req.body.user as Partial<User>;

    const userID = await getUserID(req);
    if (!userID) {
      return res.status(401).json(null);
    }
    const user = await getUser(userID);
    if (!user) {
      return res.status(404).json(null);
    }
    if (req.body.firstName) user.firstName = req.body.firstName;
    if (req.body.lastName) user.lastName = req.body.lastName;
    if (req.body.bio) user.bio = req.body.bio;
    if (req.body.classOf) user.classOf = req.body.classOf;
    delete user._id;
    delete user.password;
    delete user.tags;
    delete user.pfp;
    delete user.email;
    await updateUser(userID, user);

    return res.status(200).json(user);
  }
}
