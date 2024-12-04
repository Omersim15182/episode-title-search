import Box from '@mui/material/Box';
import SearchInput from './SearchInput';
import React, { useState } from 'react';
import AddButton from '../Button/AddButton'
import { getEpisodeName } from '../../api/episodeService';
export default function SearchBar() {

  const [tvShowId, setTvShowId] = useState<string | null>('');

  const [seriesInput, setSeriesInput] = useState('');
  const [seasonInput, setSeasonInput] = useState('');
  const [episodeInput, setEpisodeInput] = useState('');

  const [showSeason, setShowSeason] = useState(false);
  const [showEpisode, setShowEpisode] = useState(false);

  const handleSeriesChange = (event: React.ChangeEvent<HTMLInputElement>) => {

    setSeriesInput(event.target.value);

    if (event.target.value) {
      setShowSeason(true);
    } else {
      setShowSeason(false);
      setShowEpisode(false);
    }
  };

  const handleSeasonChange = (event: React.ChangeEvent<HTMLInputElement>) => {

    setSeasonInput(event.target.value);
    
    if (event.target.value) {
      setShowEpisode(true);
    } else {
      setShowEpisode(false);
    }
  };

  const handleEpisodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEpisodeInput(event.target.value);
  };

  const handleAdd = async () => {
    try {
      if (!seriesInput || !seasonInput || !episodeInput) {
        console.log("Please fill in all fields.");
        return;
      }
      const showDetails = {
        showName : seriesInput,
      }
      setTvShowId(await getEpisodeName(showDetails))

    } catch (error) {
      console.error("Error fetching episode name:", error);

    }
  }
console.log('handleAdd value :' , tvShowId);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <SearchInput
        value={seriesInput}
        onChange={handleSeriesChange}
        placeholder="Search series"
        showNextInput={showSeason}
      />

      {showSeason && (
        <SearchInput
          value={seasonInput}
          onChange={handleSeasonChange}
          placeholder="Search season"
          showNextInput={showEpisode}
        />
      )}

      {showEpisode && (
        <>
        <SearchInput 
          value={episodeInput}
          onChange={handleEpisodeChange}
          placeholder="Search episode"
        />
      <AddButton onClick={handleAdd}/>
      </>
    )}
    </Box>
  );
}
