import Box from '@mui/material/Box';
import SearchInput from './SearchInput';
import React, { useState } from 'react';
import AddButton from '../Button/AddButton'
import { getSeriesNameService } from '../../api/SeriesNameService';
import { getEpisodeNameService } from '../../api/EpisodeNameService';
import {DescEpisode } from '../../types/config';
import {SeriesConfig } from '../../types/config';

export default function SearchBar() {

  const [tvShowId, setTvShowId] = useState<string | null>('');
  const [tvShowName, setTvShowName] = useState<string | null>('');

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
      const showDetails : SeriesConfig = {
        seriesName : seriesInput ,
      }
      setTvShowId(await getSeriesNameService(showDetails))

      const updateData : DescEpisode = {
        seriesId: tvShowId ,
        seasonNumber : seasonInput ,
        episodeNumber : episodeInput ,

      }
      setTvShowName(await getEpisodeNameService(updateData))

    } catch (error) {
      console.error("Error fetching episode name:", error);

    }
  }
console.log('handleAdd value :' , tvShowId);
console.log('title value :' , tvShowName);

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
    )}<p>title is : {tvShowName}</p>
    </Box>
  );
}
