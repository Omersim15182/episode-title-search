export type Episode = {
  seriesId?: string | null;
  seriesName?: string;
  episodeDescription?: string;
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
