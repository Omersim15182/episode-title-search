export type Episode = {
  seriesId?: string | null;
  seriesName?: string;
  episodeTitle?: string;
  seasonNumber?: string;
  episodeNumber?: string;
};

export type UserLogin = {
  email: string;
  password: string;
};

export type UserRegister = {
  name: string;
  email: string;
  password: string;
  photo: string | null;
};

export type UserInfo = {
  name: string;
  email: string;
  id: string;
};

export type User = {
  _id: string;
  name: string;
  email: string;
  password: string;
  photo: string | undefined;
};
