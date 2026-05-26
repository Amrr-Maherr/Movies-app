/**
 * Discover Feature Types
 */

export type {
  DiscoverMoviesParams,
  DiscoverTvParams,
  PlatformContentResponse,
} from "./discoverServiceTypes";

export type {
  Genre as GenreServiceGenre,
  GenresResponse,
  DiscoverMoviesParams as GenreDiscoverMoviesParams,
  DiscoverTvParams as GenreDiscoverTvParams,
  DiscoverResponse,
} from "./genreServiceTypes";

export type {
  StreamingPlatform as PlatformStreamingPlatform,
  PlatformContentResponse as PlatformServiceContentResponse,
} from "./platformServiceTypes";

export type {
  Collection,
  MoviePart,
} from "./collectionServiceTypes";

export type {
  Company,
  CompanyMoviesResponse,
} from "./companyServiceTypes";

export type {
  Network,
  NetworkTVSeriesResponse,
} from "./networkServiceTypes";
