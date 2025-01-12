import { useEffect, useState } from "react";
import { getRecentSearches } from "../../api/series/recentSearches.api";
import { Episode } from "../../types/types";
import ShowEpisodeData from "../Modal/EpisodeModal";
import PageContent from "../SearchBar/BoxSearch";
import DescriptionIcon from "@mui/icons-material/Description";
import FolderIcon from "@mui/icons-material/Folder";
import style from "./SearchHistory.module.css";

export default function SearchHistory() {
  const [title, setTitle] = useState<string>("");
  const [series, setSeries] = useState<Episode[]>([]);
  const [selectedEpisode, setSelectedEpisode] = useState<Episode | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    const fetchRecentSearches = async () => {
      try {
        setIsLoading(true);
        const fetchedSeries = await getRecentSearches();
        console.log("fetchedSeries", fetchedSeries);

        if (fetchedSeries && Array.isArray(fetchedSeries.data)) {
          setSeries(fetchedSeries.data);
        } else {
          console.error("Unexpected data structure:", fetchedSeries);
        }

        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        console.error("Error fetching series data:", err);
      }
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

  console.log("series", series);

  return (
    <div className={style["page-container"]}>
      <nav className={style["nav-container"]}>
        <div className={style["nav-title"]}>Episode Title Search</div>

        <div className={style["search-history-title"]}>
          <FolderIcon className={style.icon} />
          <span>Search History</span>
        </div>

        <div className={style["series-list-container"]}>
          {seriesName.map((item, index) => (
            <div
              key={index}
              className={`${style["series-item"]} ${
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
        <PageContent title={title} setTitle={setTitle} />
      </div>
    </div>
  );
}
