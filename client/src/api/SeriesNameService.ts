import axios from "axios";
import {SeriesConfig} from '../types/config';


const apiKey = import.meta.env.VITE_API_KEY;

export const getSeriesNameService = async (
    showDetails : SeriesConfig  
) : Promise <string | null> => {
    const { seriesName } = showDetails;

    const options = {
        method: 'GET',
        url: 'https://imdb8.p.rapidapi.com/auto-complete',
        params: {q: seriesName },
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