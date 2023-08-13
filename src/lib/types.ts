export type post_t = {
  id: number;
  title: string;
  username: string;
  body: string;
};
export type quota_t = {
  day: number;
  week: number;
  month: number;
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
  quota: quota_t;
};

// export type channel_t = {
//   name: string;
// };

export type channel_t = {
  userId: number;
  id: number;
  title: string;
};

export type squealIn_t = {
  receivers: string[];
  author: string;
  body: string | File; //TODO: aggiungere il tipo per la geolocation
  category: string[];
  automatic_receiver: string[];
};

export type squealOut_t = {
  id: number;
  receivers: string[];
  author: string;
  body: string | File; //TODO: aggiungere il tipo per la geolocation
  datetime: Date;
  impressions: number;
  positive_reactions: number;
  negative_reactions: number;
  category: string[];
  automatic_receiver: string[];
};

export type error_t = {
  path: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  message: string;
};