import Box from "@mui/material/Box";
import SearchInput from "./SearchInput";
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import AddButton from "../Button/AddButton";
import { Series } from "../../types/types";
import instance from "../../api/AxiosCreate";
import style from "./SearchBar.module.css";

interface Props {
  setTitle: Dispatch<SetStateAction<string>>;
}

export default function SearchBar({ setTitle }: Props) {
  const [episodeTitle, setEpisodeTitle] = useState("");

  const [seriesInput, setSeriesInput] = useState("");
  const [seasonInput, setSeasonInput] = useState("");
  const [episodeInput, setEpisodeInput] = useState("");

  const [showSeasonInput, setShowSeasonInput] = useState(false);
  const [showEpisodeInput, setShowEpisodeInput] = useState(false);

  const handleSeriesChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSeriesInput(event.target.value);

    if (event.target.value) {
      setShowSeasonInput(true);
    } else {
      setShowSeasonInput(false);
      setShowEpisodeInput(false);
    }
  };

  const handleSeasonChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSeasonInput(event.target.value);

    if (event.target.value) {
      setShowEpisodeInput(true);
    } else {
      setShowEpisodeInput(false);
    }
  };

  const handleEpisodeChange = (event: ChangeEvent<HTMLInputElement>) => {
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
      setTitle(response.data.episodeTitle);
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
        showNextInput={showSeasonInput}
      />
      {showSeasonInput && (
        <SearchInput
          value={seasonInput}
          onChange={handleSeasonChange}
          placeholder="Search season"
          showNextInput={showEpisodeInput}
        />
      )}
      {showEpisodeInput && (
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
