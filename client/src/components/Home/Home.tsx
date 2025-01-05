import demoTheme from "./theme";
import DescriptionIcon from "@mui/icons-material/Description";
import FolderIcon from "@mui/icons-material/Folder";
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { useDemoRouter } from "@toolpad/core/internal";
import DemoPageContent from "./DemoPageContent";
import { useEffect, useState } from "react";
import { getRecentSearches } from "../../api/series/recentSearches.api";
import { Episode } from "../../types/types";

interface DemoProps {
  window?: () => Window;
}

export default function Home(props: DemoProps) {
  const [title, setTitle] = useState<string>("");
  const [series, setSeries] = useState<Episode[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const { window } = props;
  const router = useDemoRouter("/movies/lord-of-the-rings");
  const demoWindow = window !== undefined ? window() : undefined;

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

  return (
    <AppProvider
      navigation={[
        {
          segment: "movies",
          title: "Search history",
          icon: <FolderIcon />,
          children: seriesName.map((item, index) => ({
            segment: item.episodeTitle,
            title: item.episodeTitle,
            icon: <DescriptionIcon />,
            key: index,
          })),
        },
      ]}
      router={router}
      theme={demoTheme}
      window={demoWindow}
    >
      <DashboardLayout>
        <DemoPageContent title={title} setTitle={setTitle}></DemoPageContent>
      </DashboardLayout>
    </AppProvider>
  );
}
