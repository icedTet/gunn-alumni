export enum UserTags {
  WEBMASTER = "webmaster",
  ADMIN = "admin",
  CLASS_PRESIDENT = "classpresident",
  SEC = "sec",
}

export type User = {
  _id: string;
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  pfp?: string;
  bio?: string;
  classOf?: number;
  tags?: UserTags[];
};

export type GivenUser = {
  _id: string;
  username: string;
  firstName: string;
  lastName: string;
  email?: string;
  pfp?: string;
  bio?: string;
  classOf?: number;
  tags?: UserTags[];
};

export type PublicUser = {
  _id: string;
  username: string;
  firstName: string;
  lastName: string;
  email?: string;
  pfp?: string;
  bio?: string;
  classOf?: number;
  tags?: UserTags[];
};

export type UnverifiedUser = {
  _id: string;
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};
