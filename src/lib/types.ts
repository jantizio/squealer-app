export type post_t = {
  id: number;
  title: string;
  username: string;
  body: string;
};

export type user_t = {
  // id: string;
  email: string;
  username: string;
  firstname: string;
  lastname: string;
  password: string;
  type: 'standard' | 'professional' | 'moderator';
  verified: false;
  SMM: string | null;
};

// export type channel_t = {
//   name: string;
// };

export type channel_t = {
  userId: number;
  id: number;
  title: string;
};
