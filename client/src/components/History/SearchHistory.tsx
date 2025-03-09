import { useEffect, useState } from "react";
import { getRecentSearches } from "../../api/series/recentSearches.api";
import { Episode } from "../../types/types";
import ShowEpisodeData from "../Modal/EpisodeModal";
import DescriptionIcon from "@mui/icons-material/Description";
import FolderIcon from "@mui/icons-material/Folder";
import style from "./SearchHistory.module.css";
import Notification from "../Notifications/Notification";
// import ActorCard from "../Card/ActorCard";

interface Props {
  title: string;
}

export default function SearchHistory({ title }: Props) {
  const [series, setSeries] = useState<Episode[]>([]);
  const [selectedEpisode, setSelectedEpisode] = useState<Episode | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [open, setOpen] = useState<boolean>(false);
  const [alert, setAlert] = useState<{
    type: "error";
    message: string;
  } | null>(null);

  useEffect(() => {
    const fetchRecentSearches = async () => {
      setIsLoading(true);
      const fetchedSeries = await getRecentSearches();

      if (fetchedSeries && Array.isArray(fetchedSeries.data)) {
        setSeries(fetchedSeries.data);
      } else {
        setAlert({ type: "error", message: "Can't see searches history" });
      }

      setIsLoading(false);
      setIsLoading(false);
    };

    fetchRecentSearches();
  }, [title]);

  const seriesName = isLoading
    ? []
    : series.map((item) => ({
        episodeNumber: item.episodeNumber,
        episodeTitle: item.episodeTitle,
        seasonNumber: item.seasonNumber,
        seriesName: item.seriesName,
        seriesId: item.seriesId,
      }));

  const setCloseModal = () => {
    setOpen(false);
  };

  const handleClickItem = (episode: Episode) => {
    setSelectedEpisode(episode);
    setOpen(true);
  };

  return (
    <div className={style["search-history-container"]}>
      <nav className={style["search-history-block"]}>
        <div className={style["search-history-nav-title"]}>
          Episode Title Search
        </div>

        <div className={style["search-history-title"]}>
          <FolderIcon className={style.icon} />
          <span>Search History</span>
        </div>

        <div className={style["search-history-series-list-container"]}>
          {seriesName.map((item, index) => (
            <div
              key={index}
              className={`${style["search-history-series-item"]} ${
                item.episodeTitle ? style["selected"] : ""
              }`}
              onClick={() => handleClickItem(item)}
            >
              <DescriptionIcon className={style.icon} />
              <span>{item.episodeTitle}</span>
            </div>
          ))}
        </div>
      </nav>
      <div className={style["content-container"]}>
        <ShowEpisodeData
          episode={selectedEpisode}
          open={open}
          setCloseModal={setCloseModal}
        />
      </div>
      <Notification alert={alert} setAlert={setAlert} />
    </div>
  );
}
