import * as React from 'react';
import Box from '@mui/material/Box';
import SearchInput from './SearchInput';

export default function SearchBar() {
  // State to track user input in each field
  const [seriesInput, setSeriesInput] = React.useState('');
  const [seasonInput, setSeasonInput] = React.useState('');
  const [episodeInput, setEpisodeInput] = React.useState('');

  const [showSeason, setShowSeason] = React.useState(false);
  const [showEpisode, setShowEpisode] = React.useState(false);

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
        <SearchInput
          value={episodeInput}
          onChange={handleEpisodeChange}
          placeholder="Search episode"
        />
      )}
    </Box>
  );
}
