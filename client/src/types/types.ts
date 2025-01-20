export type Episode = {
  seriesId?: string | null;
  seriesName?: string;
  episodeTitle?: string;
  seasonNumber?: string;
  episodeNumber?: string;
};

export type userLogin = {
  email: string;
  password: string;
};

export type userRegister = {
  name: string;
  email: string;
  password: string;
};

export type UserInfo = {
  name: string;
  email: string;
  id: string;
};
