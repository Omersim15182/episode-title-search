//Function checks if series ID is invalid
export default function isInvalidSeriesId(seriesId) {
  return (
    seriesId === null ||
    typeof seriesId !== "string" ||
    !/^tt\d+$/.test(seriesId)
  );
}
