import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { Encryptions } from "../../../utils/classes/Encryptions";
import { getUserID } from "../../../utils/Clients/AuthManager";
import Mongo from "../../../utils/Clients/Mongo";
import { getUser } from "../../../utils/ServersideHelpers/getUser";
import { GivenUser, User } from "../../../utils/types/user";
type NotFoundResponse = null;
export type SelfUserResponse = GivenUser | NotFoundResponse;
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SelfUserResponse>
) {
  if (req.method === "GET") {
    const userID = await getUserID(req);
    if (!userID) {
      return res.status(401).json(null);
    }
    const user = await getUser(userID);
    console.log({ user });
    if (!user) {
      return res.status(404).json(null);
    }
    delete user.password;
    return res.status(200).json(user);
  }
}