import axios from "axios";

interface TVShowRequest  {
    showName : String
    season : number
    episode : number
}

const BASE_URL = 'https://api.tvmaze.com/singlesearch/shows?q=girls&embed=episodes'

export const getEpisodeName = async (
    showDetails : TVShowRequest
) : Promise<void> => {
    const { showName, season, episode } = showDetails;
    try {
        const response = await axios.get(BASE_URL, {
            params: {
              q: showName,
              season: `${season}`
              embed: `${episode}`,
            },
          });
    }

    catch (error: any)  {
    console.log('error',error.message);

    }

}