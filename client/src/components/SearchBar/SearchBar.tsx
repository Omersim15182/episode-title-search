import Box from "@mui/material/Box";
import SearchInput from "./SearchInput";
import React, { useState } from "react";
import AddButton from "../Button/AddButton";
import { Series } from "../../types/types";
import instance from "../../api/AxiosCreate";
import style from "./SearchBar.module.css";

export default function SearchBar() {
  const [episodeTitle, setEpisodeTitle] = useState("");

  const [seriesInput, setSeriesInput] = useState("");
  const [seasonInput, setSeasonInput] = useState("");
  const [episodeInput, setEpisodeInput] = useState("");

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
      const seriesNameInput: Series = {
        seriesName: seriesInput,
        seasonNumber: seasonInput,
        episodeNumber: episodeInput,
      };

      const response = await instance.post(
        "/episodeNamer/Series/series-data",
        seriesNameInput
      );
      setEpisodeTitle(response.data.episodeTitle);
      console.log("Series name successfully:", response.data.episodeTitle);
    } catch (error) {
      console.error("Error fetching episode name:", error);
    }
  };

  return (
    <Box className={style["search-bar-container"]}>
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
          <AddButton onClick={handleAdd} />
        </>
      )}
      <h3>title is : {episodeTitle}</h3>
    </Box>
  );
}
