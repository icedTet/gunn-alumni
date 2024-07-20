export type CPost = {
  // Client Post object, server uses RawPost
  _id: string;
  title: string;
  markdown: string;
  comments?: CComment[];
  reactions?: CReaction[];
};

export type CReaction = {
  _id: string;
  type: string;
  users: string[];
};

export type CComment = {
  _id: string;
  markdown: string;
  replies?: Comment[];
};

export type RawPost = {
  _id: string;
  title: string;
  markdown: string;
  reactions?: CReaction[];
};

export type RawComment = {
  _id: string;
  markdown: string;
  post: string;
  parent?: string;
};
