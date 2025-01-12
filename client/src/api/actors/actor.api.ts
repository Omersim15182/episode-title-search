import axiosInstance from "../axiosInstance";

interface ActorDataPrpos {
  seriesId?: string | null;
}

export const getActor = async ({ seriesId }: ActorDataPrpos) => {
  try {
    const response = await axiosInstance.post(
      "/episodeNamer/Series/series-data/actorId",
      { seriesId },
      { withCredentials: true }
    );
    console.log("response from actor id server", response.data);
    return response.data;
  } catch (e: any) {
    return e.response.data;
  }
};
