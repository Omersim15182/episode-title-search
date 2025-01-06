import { useEffect, useState } from "react";
import { getRecentSearches } from "../../api/series/recentSearches.api";
import { Episode } from "../../types/types";
import ShowEpisodeData from "./ShowEpisodeData";
import PageContent from "./PageContent";
import DescriptionIcon from "@mui/icons-material/Description";
import FolderIcon from "@mui/icons-material/Folder";

// Import the CSS module
import style from "./Home.module.css";

export default function Home() {
  const [title, setTitle] = useState<string>("");
  const [series, setSeries] = useState<Episode[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [open, setOpen] = useState<boolean>(false);
  const [selectedMenu, setSelectedMenu] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecentSearches = async () => {
      try {
        setIsLoading(true);
        const fetchedSeries = await getRecentSearches();

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
      }));

  // Handle menu item click
  const handleMenuItemClick = (episodeTitle: string) => {
    setSelectedMenu(episodeTitle);
    setTitle(episodeTitle);
  };

  const setCloseModal = () => {
    setOpen(false);
  };

  return (
    <div className={style["demo-page-container"]}>
      <nav className={style["nav-container"]}>
        <div className={style["nav-title"]}>Movies</div>

        <div className={style["search-history-title"]}>
          <FolderIcon className={style.icon} />
          <span>Search History</span>
        </div>

        <div className={style["series-list-container"]}>
          {seriesName.map((item, index) => (
            <div
              key={index}
              className={`${style["series-item"]} ${
                selectedMenu === item.episodeTitle ? style["selected"] : ""
              }`}
              onClick={() => setOpen(true)}
            >
              <DescriptionIcon className={style.icon} />
              <span>{item.episodeTitle}</span>
            </div>
          ))}
        </div>
      </nav>
      <div className={style["content-container"]}>
        <ShowEpisodeData open={open} setCloseModal={setCloseModal} />
        <PageContent title={title} setTitle={setTitle} />
      </div>
    </div>
  );
}
