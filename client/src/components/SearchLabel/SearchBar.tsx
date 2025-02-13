import Box from "@mui/material/Box";
import SearchInput from "./SearchInput";
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import AddButton from "../Button/AddButton";
import { Episode } from "../../types/types";
import style from "./SearchBar.module.css";
import { getEpisodeTitle } from "../../api/series/series.api";
import Notification from "../Notifications/Notification";
import Chart from "../Chart/Chart";
import StreamingOptions from "../Streaming/StreamingOptions";

interface Props {
  title: string;
  setTitle: Dispatch<SetStateAction<string>>;
}

export default function SearchBar({ title, setTitle }: Props) {
  //Input labels value
  const [seriesInput, setSeriesInput] = useState("");
  const [seasonInput, setSeasonInput] = useState("");
  const [episodeInput, setEpisodeInput] = useState("");
  const [seriesId, setSeriesId] = useState<string | null>("");
  const [searchTrigger, setSearchTrigger] = useState(0);
  const [alert, setAlert] = useState<{
    type: "error";
    message: string;
  } | null>(null);

  //Visibility of the input labels
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

  const handleAddEpisode = async () => {
    const seriesEpisode: Episode = {
      seriesName: seriesInput,
      seasonNumber: seasonInput,
      episodeNumber: episodeInput,
    };
    const episodeTitle = await getEpisodeTitle(seriesEpisode);
    if (episodeTitle) {
      setTitle(episodeTitle.episodeTitle);
      setSeriesId(episodeTitle.seriesId);
      setSearchTrigger((prev) => prev + 1);
    }
    setAlert({ type: "error", message: "Can't fetch episode title" });
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
          <AddButton onClick={handleAddEpisode} />
        </>
      )}
      <h3 className={style["h3-container"]}>{title}</h3>
      {seriesId && (
        <StreamingOptions seriesId={seriesId} searchTrigger={searchTrigger} />
      )}
      <Chart title={title} />
      <Notification alert={alert} setAlert={setAlert} />
    </Box>
  );
}
