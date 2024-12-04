import axios from "axios";
import {DescEpisode } from '../types/config';

const apiKey = import.meta.env.VITE_API_KEY;

export const getEpisodeNameService = async ( 
  updateData : DescEpisode  
) : Promise < string | null> => {

    const { seriesId ,seasonNumber , episodeNumber} = updateData;

    const options = {
      method: 'GET',
      url: 'https://imdb8.p.rapidapi.com/title/get-seasons',
      params: {
        tconst: seriesId
      },
      headers: {
        'x-rapidapi-key': apiKey,
        'x-rapidapi-host': 'imdb8.p.rapidapi.com'
      }
    };
    
    try {
      const response = await axios.request(options);
      console.log('res',response.data);
      const seasons = response.data[(parseInt(seasonNumber, 10) - 1).toString()];
      const episode = seasons.episodes[(parseInt(episodeNumber, 10) - 1).toString()];
      const title = episode.title;
      
      console.log('asda',response.data[(parseInt(episodeNumber, 10) - 1).toString()]);
      console.log('seasons ' , seasons);
      console.log('episode ', episode);
     
      return title;
     
    } catch (error) {
      console.error(error);
      return null;

    }
}