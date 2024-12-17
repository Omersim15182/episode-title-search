export function isInvalidSeriesId(seriesId) {
  return (
    seriesId === null ||
    typeof seriesId !== "string" ||
    !/^tt\d+$/.test(seriesId)
  );
}
