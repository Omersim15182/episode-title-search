import axios from "axios";

interface TVShowRequest  {
    showName : string
}


const apiKey = import.meta.env.VITE_API_KEY;

export const getEpisodeName = async (
    showDetails : TVShowRequest
) : Promise<string | null> => {
    const { showName } = showDetails;

    const options = {
        method: 'GET',
        url: 'https://imdb8.p.rapidapi.com/auto-complete',
        params: {q:showName },
        headers: {
          'x-rapidapi-key': apiKey,
          'x-rapidapi-host': 'imdb8.p.rapidapi.com'
        }
      };
      
      try {
          const response = await axios.request(options);
          console.log(response.data);

          const tvShowId = response.data.d?.[0]?.id || null;
          console.log(tvShowId);
          return tvShowId;
          
      } catch (error) {
          console.error(error);
          return null;
      }
   

}