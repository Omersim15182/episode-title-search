export interface SeriesConfig  {
    seriesId? : string | null ,
    seriesName? : string  ,
    episodeDescription? : string 
}

export interface DescEpisode   extends SeriesConfig {
    seasonNumber: string  ; 
    episodeNumber: string ;
  }