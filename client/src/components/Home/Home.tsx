import demoTheme from "./theme";
import DescriptionIcon from "@mui/icons-material/Description";
import FolderIcon from "@mui/icons-material/Folder";
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { useDemoRouter } from "@toolpad/core/internal";
import DemoPageContent from "./DemoPageContent.";
import { useState } from "react";

interface DemoProps {
  window?: () => Window;
}

export default function Home(props: DemoProps) {
  const [title, setTitle] = useState<string>("");
  console.log("title test :", title);

  const { window } = props;

  const router = useDemoRouter("/movies/lord-of-the-rings");

  const demoWindow = window !== undefined ? window() : undefined;

  // useEffect(() => {
  //   const getSeriesData = async () => {
  //     try {
  //       const response = await instance.get(
  //         "/episodeNamer/Series/retrieve-data"
  //       );
  //       const data = response.data;
  //       console.log("data retrieve successfully : ", data);
  //     } catch (error) {
  //       console.error("Error retrieve data:", error);
  //     }
  //   };
  //   getSeriesData();
  // }, [title]);

  console.log("titile omer ", title);

  return (
    // preview-start
    <AppProvider
      navigation={[
        {
          segment: "movies",
          title: "Movies search history",
          icon: <FolderIcon />,
          children: [
            {
              segment: "lord-of-the-rings",
              title: "Lord of the Rings",
              icon: <DescriptionIcon />,
            },
            {
              segment: "harry-potter",
              title: "Harry Potter",
              icon: <DescriptionIcon />,
            },
          ],
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
