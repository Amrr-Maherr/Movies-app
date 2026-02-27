# 🎬 Movie Platform API Endpoints

This document contains all the GET endpoints available for the frontend movie platform. All endpoints use **The Movie Database (TMDB) API**.

---

## 📋 Table of Contents

- [Environment Variables](#environment-variables)
- [Movie Endpoints](#movie-endpoints)
- [TV Show Endpoints](#tv-show-endpoints)
- [Person Endpoints](#person-endpoints)
- [Search Endpoints](#search-endpoints)
- [Discover Endpoints](#discover-endpoints)
- [Genre Endpoints](#genre-endpoints)
- [Collection Endpoints](#collection-endpoints)
- [Company Endpoints](#company-endpoints)
- [Network Endpoints](#network-endpoints)
- [Keyword Endpoints](#keyword-endpoints)
- [Configuration Endpoints](#configuration-endpoints)
- [Trending Endpoints](#trending-endpoints)
- [List Endpoints](#list-endpoints)
- [Guest Session Endpoints](#guest-session-endpoints)
- [Account Endpoints](#account-endpoints)
- [Certification Endpoints](#certification-endpoints)

---

## 🔐 Environment Variables

| Variable | Description |
|----------|-------------|
| `REACT_APP_TMDB_API_KEY` | Your TMDB API key (required for all requests) |
| `REACT_APP_TMDB_BASE_URL` | `https://api.themoviedb.org/3` |
| `REACT_APP_TMDB_IMAGE_BASE_URL` | `https://image.tmdb.org/t/p` |

---

## 🎬 Movie Endpoints

### Popular Movies

| Field | Value |
|-------|-------|
| **Variable** | `REACT_APP_MOVIES_POPULAR` |
| **Endpoint** | `/movie/popular` |
| **Full URL** | `https://api.themoviedb.org/3/movie/popular?language=en-US&page=1&region=US` |
| **Description** | Fetches a list of currently popular movies |
| **Parameters** | `page` (number), `region` (ISO 3166-1 alpha-2) |
| **Returns** | Movie list with popularity rankings |

**Example Response:**
```json
{
  "page": 1,
  "results": [
    {
      "id": 123456,
      "title": "Movie Title",
      "overview": "Description...",
      "poster_path": "/path.jpg",
      "release_date": "2024-01-15",
      "vote_average": 7.5
    }
  ],
  "total_pages": 500,
  "total_results": 10000
}
```

---

### Top Rated Movies

| Field | Value |
|-------|-------|
| **Variable** | `REACT_APP_MOVIES_TOP_RATED` |
| **Endpoint** | `/movie/top_rated` |
| **Full URL** | `https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1` |
| **Description** | Fetches movies sorted by highest average rating |
| **Parameters** | `page` (number) |
| **Returns** | Movie list sorted by rating |

---

### Upcoming Movies

| Field | Value |
|-------|-------|
| **Variable** | `REACT_APP_MOVIES_UPCOMING` |
| **Endpoint** | `/movie/upcoming` |
| **Full URL** | `https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1&region=US` |
| **Description** | Fetches movies with future release dates |
| **Parameters** | `page` (number), `region` (ISO 3166-1 alpha-2) |
| **Returns** | Movie list with future release dates |

---

### Now Playing Movies

| Field | Value |
|-------|-------|
| **Variable** | `REACT_APP_MOVIES_NOW_PLAYING` |
| **Endpoint** | `/movie/now_playing` |
| **Full URL** | `https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1&region=US` |
| **Description** | Fetches movies currently in theaters |
| **Parameters** | `page` (number), `region` (ISO 3166-1 alpha-2) |
| **Returns** | Movie list currently in cinemas |

---

### Movie Details

| Field | Value |
|-------|-------|
| **Variable** | `REACT_APP_MOVIE_DETAILS` |
| **Endpoint** | `/movie/{movie_id}` |
| **Full URL** | `https://api.themoviedb.org/3/movie/{movie_id}?language=en-US&append_to_response=credits,reviews,videos,recommendations,similar,images` |
| **Description** | Fetches detailed information about a specific movie |
| **Parameters** | `movie_id` (path, integer), `language` (query), `append_to_response` (query) |
| **Returns** | Movie details including overview, budget, revenue, runtime, genres, credits, reviews, videos |

**Example Response:**
```json
{
  "id": 123456,
  "title": "Movie Title",
  "overview": "Detailed description...",
  "runtime": 142,
  "release_date": "2024-01-15",
  "budget": 150000000,
  "revenue": 500000000,
  "vote_average": 7.5,
  "genres": [
    { "id": 28, "name": "Action" },
    { "id": 12, "name": "Adventure" }
  ],
  "credits": { "cast": [], "crew": [] },
  "videos": { "results": [] }
}
```

---

### Movie Credits

| Field | Value |
|-------|-------|
| **Variable** | `REACT_APP_MOVIE_CREDITS` |
| **Endpoint** | `/movie/{movie_id}/credits` |
| **Full URL** | `https://api.themoviedb.org/3/movie/{movie_id}/credits?language=en-US` |
| **Description** | Fetches cast and crew for a specific movie |
| **Parameters** | `movie_id` (path, integer), `language` (query) |
| **Returns** | Cast and crew arrays with person details |

---

### Movie Reviews

| Field | Value |
|-------|-------|
| **Variable** | `REACT_APP_MOVIE_REVIEWS` |
| **Endpoint** | `/movie/{movie_id}/reviews` |
| **Full URL** | `https://api.themoviedb.org/3/movie/{movie_id}/reviews?language=en-US&page=1` |
| **Description** | Fetches user reviews for a specific movie |
| **Parameters** | `movie_id` (path, integer), `language` (query), `page` (query) |
| **Returns** | Review list with author, content, and ratings |

---

### Movie Recommendations

| Field | Value |
|-------|-------|
| **Variable** | `REACT_APP_MOVIE_RECOMMENDATIONS` |
| **Endpoint** | `/movie/{movie_id}/recommendations` |
| **Full URL** | `https://api.themoviedb.org/3/movie/{movie_id}/recommendations?language=en-US&page=1` |
| **Description** | Fetches recommended movies based on a movie |
| **Parameters** | `movie_id` (path, integer), `language` (query), `page` (query) |
| **Returns** | Movie list of recommendations |

---

### Similar Movies

| Field | Value |
|-------|-------|
| **Variable** | `REACT_APP_MOVIE_SIMILAR` |
| **Endpoint** | `/movie/{movie_id}/similar` |
| **Full URL** | `https://api.themoviedb.org/3/movie/{movie_id}/similar?language=en-US&page=1` |
| **Description** | Fetches movies similar to a specific movie |
| **Parameters** | `movie_id` (path, integer), `language` (query), `page` (query) |
| **Returns** | Movie list of similar titles |

---

### Movie Videos

| Field | Value |
|-------|-------|
| **Variable** | `REACT_APP_MOVIE_VIDEOS` |
| **Endpoint** | `/movie/{movie_id}/videos` |
| **Full URL** | `https://api.themoviedb.org/3/movie/{movie_id}/videos?language=en-US&page=1` |
| **Description** | Fetches video trailers, teasers, and clips for a movie |
| **Parameters** | `movie_id` (path, integer), `language` (query), `page` (query) |
| **Returns** | Video list with YouTube keys and types |

---

### Movie Images

| Field | Value |
|-------|-------|
| **Variable** | `REACT_APP_MOVIE_IMAGES` |
| **Endpoint** | `/movie/{movie_id}/images` |
| **Full URL** | `https://api.themoviedb.org/3/movie/{movie_id}/images?language=en-US&include_image_language=en,null` |
| **Description** | Fetches poster and backdrop images for a movie |
| **Parameters** | `movie_id` (path, integer), `language` (query), `include_image_language` (query) |
| **Returns** | Image arrays for posters and backdrops |

---

### Movie Watch Providers

| Field | Value |
|-------|-------|
| **Variable** | `REACT_APP_MOVIE_WATCH_PROVIDERS` |
| **Endpoint** | `/movie/{movie_id}/watch/providers` |
| **Full URL** | `https://api.themoviedb.org/3/movie/{movie_id}/watch/providers?watch_region=US` |
| **Description** | Fetches streaming availability for a movie |
| **Parameters** | `movie_id` (path, integer), `watch_region` (query) |
| **Returns** | Streaming provider information by region |

---

## 📺 TV Show Endpoints

### Popular TV Shows

| Field | Value |
|-------|-------|
| **Variable** | `REACT_APP_TV_POPULAR` |
| **Endpoint** | `/tv/popular` |
| **Full URL** | `https://api.themoviedb.org/3/tv/popular?language=en-US&page=1` |
| **Description** | Fetches currently popular TV shows |
| **Parameters** | `page` (number) |
| **Returns** | TV show list with popularity rankings |

---

### Top Rated TV Shows

| Field | Value |
|-------|-------|
| **Variable** | `REACT_APP_TV_TOP_RATED` |
| **Endpoint** | `/tv/top_rated` |
| **Full URL** | `https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=1` |
| **Description** | Fetches TV shows sorted by highest average rating |
| **Parameters** | `page` (number) |
| **Returns** | TV show list sorted by rating |

---

### TV Shows Airing Today

| Field | Value |
|-------|-------|
| **Variable** | `REACT_APP_TV_AIRING_TODAY` |
| **Endpoint** | `/tv/airing_today` |
| **Full URL** | `https://api.themoviedb.org/3/tv/airing_today?language=en-US&page=1&timezone=America/New_York` |
| **Description** | Fetches TV shows airing on the current date |
| **Parameters** | `page` (number), `timezone` (query) |
| **Returns** | TV show list airing today |

---

### TV Shows On The Air

| Field | Value |
|-------|-------|
| **Variable** | `REACT_APP_TV_ON_THE_AIR` |
| **Endpoint** | `/tv/on_the_air` |
| **Full URL** | `https://api.themoviedb.org/3/tv/on_the_air?language=en-US&page=1` |
| **Description** | Fetches TV shows currently broadcasting new episodes |
| **Parameters** | `page` (number) |
| **Returns** | TV show list currently in production |

---

### TV Show Details

| Field | Value |
|-------|-------|
| **Variable** | `REACT_APP_TV_DETAILS` |
| **Endpoint** | `/tv/{tv_id}` |
| **Full URL** | `https://api.themoviedb.org/3/tv/{tv_id}?language=en-US&append_to_response=credits,reviews,videos,recommendations,similar,images,external_ids` |
| **Description** | Fetches detailed information about a TV series |
| **Parameters** | `tv_id` (path, integer), `language` (query), `append_to_response` (query) |
| **Returns** | TV show details including seasons, episodes, networks, genres |

---

### TV Show Credits

| Field | Value |
|-------|-------|
| **Variable** | `REACT_APP_TV_CREDITS` |
| **Endpoint** | `/tv/{tv_id}/credits` |
| **Full URL** | `https://api.themoviedb.org/3/tv/{tv_id}/credits?language=en-US` |
| **Description** | Fetches cast and crew for a TV series |
| **Parameters** | `tv_id` (path, integer), `language` (query) |
| **Returns** | Cast and crew arrays |

---

### TV Show Reviews

| Field | Value |
|-------|-------|
| **Variable** | `REACT_APP_TV_REVIEWS` |
| **Endpoint** | `/tv/{tv_id}/reviews` |
| **Full URL** | `https://api.themoviedb.org/3/tv/{tv_id}/reviews?language=en-US&page=1` |
| **Description** | Fetches user reviews for a TV series |
| **Parameters** | `tv_id` (path, integer), `language` (query), `page` (query) |
| **Returns** | Review list |

---

### TV Show Recommendations

| Field | Value |
|-------|-------|
| **Variable** | `REACT_APP_TV_RECOMMENDATIONS` |
| **Endpoint** | `/tv/{tv_id}/recommendations` |
| **Full URL** | `https://api.themoviedb.org/3/tv/{tv_id}/recommendations?language=en-US&page=1` |
| **Description** | Fetches recommended TV shows |
| **Parameters** | `tv_id` (path, integer), `language` (query), `page` (query) |
| **Returns** | TV show list of recommendations |

---

### Similar TV Shows

| Field | Value |
|-------|-------|
| **Variable** | `REACT_APP_TV_SIMILAR` |
| **Endpoint** | `/tv/{tv_id}/similar` |
| **Full URL** | `https://api.themoviedb.org/3/tv/{tv_id}/similar?language=en-US&page=1` |
| **Description** | Fetches TV shows similar to a specific show |
| **Parameters** | `tv_id` (path, integer), `language` (query), `page` (query) |
| **Returns** | TV show list of similar titles |

---

### TV Show Videos

| Field | Value |
|-------|-------|
| **Variable** | `REACT_APP_TV_VIDEOS` |
| **Endpoint** | `/tv/{tv_id}/videos` |
| **Full URL** | `https://api.themoviedb.org/3/tv/{tv_id}/videos?language=en-US&page=1` |
| **Description** | Fetches video trailers for a TV series |
| **Parameters** | `tv_id` (path, integer), `language` (query), `page` (query) |
| **Returns** | Video list with YouTube keys |

---

### TV Show Images

| Field | Value |
|-------|-------|
| **Variable** | `REACT_APP_TV_IMAGES` |
| **Endpoint** | `/tv/{tv_id}/images` |
| **Full URL** | `https://api.themoviedb.org/3/tv/{tv_id}/images?language=en-US&include_image_language=en,null` |
| **Description** | Fetches poster and backdrop images for a TV series |
| **Parameters** | `tv_id` (path, integer), `language` (query), `include_image_language` (query) |
| **Returns** | Image arrays |

---

### TV Show Watch Providers

| Field | Value |
|-------|-------|
| **Variable** | `REACT_APP_TV_WATCH_PROVIDERS` |
| **Endpoint** | `/tv/{tv_id}/watch/providers` |
| **Full URL** | `https://api.themoviedb.org/3/tv/{tv_id}/watch/providers?watch_region=US` |
| **Description** | Fetches streaming availability for a TV series |
| **Parameters** | `tv_id` (path, integer), `watch_region` (query) |
| **Returns** | Streaming provider information |

---

### TV Season Details

| Field | Value |
|-------|-------|
| **Variable** | `REACT_APP_TV_SEASON_DETAILS` |
| **Endpoint** | `/tv/{tv_id}/season/{season_number}` |
| **Full URL** | `https://api.themoviedb.org/3/tv/{tv_id}/season/{season_number}?language=en-US&append_to_response=credits,videos,images,external_ids` |
| **Description** | Fetches detailed information about a specific season |
| **Parameters** | `tv_id` (path), `season_number` (path), `language` (query) |
| **Returns** | Season details including episodes |

---

### TV Episode Details

| Field | Value |
|-------|-------|
| **Variable** | `REACT_APP_TV_EPISODE_DETAILS` |
| **Endpoint** | `/tv/{tv_id}/season/{season_number}/episode/{episode_number}` |
| **Full URL** | `https://api.themoviedb.org/3/tv/{tv_id}/season/{season_number}/episode/{episode_number}?language=en-US&append_to_response=credits,videos,images,external_ids` |
| **Description** | Fetches detailed information about a specific episode |
| **Parameters** | `tv_id`, `season_number`, `episode_number` (path), `language` (query) |
| **Returns** | Episode details including runtime, overview, guest stars |

---

## 👤 Person Endpoints

### Person Details

| Field | Value |
|-------|-------|
| **Variable** | `REACT_APP_PERSON_DETAILS` |
| **Endpoint** | `/person/{person_id}` |
| **Full URL** | `https://api.themoviedb.org/3/person/{person_id}?language=en-US` |
| **Description** | Fetches detailed information about a person |
| **Parameters** | `person_id` (path, integer), `language` (query) |
| **Returns** | Person details including biography, birthday, profile image |

---

### Person Movie Credits

| Field | Value |
|-------|-------|
| **Variable** | `REACT_APP_PERSON_MOVIE_CREDITS` |
| **Endpoint** | `/person/{person_id}/movie_credits` |
| **Full URL** | `https://api.themoviedb.org/3/person/{person_id}/movie_credits?language=en-US` |
| **Description** | Fetches all movie credits for a person |
| **Parameters** | `person_id` (path, integer), `language` (query) |
| **Returns** | Cast and crew movie credits |

---

### Person TV Credits

| Field | Value |
|-------|-------|
| **Variable** | `REACT_APP_PERSON_TV_CREDITS` |
| **Endpoint** | `/person/{person_id}/tv_credits` |
| **Full URL** | `https://api.themoviedb.org/3/person/{person_id}/tv_credits?language=en-US` |
| **Description** | Fetches all TV credits for a person |
| **Parameters** | `person_id` (path, integer), `language` (query) |
| **Returns** | Cast and crew TV credits |

---

### Person Images

| Field | Value |
|-------|-------|
| **Variable** | `REACT_APP_PERSON_IMAGES` |
| **Endpoint** | `/person/{person_id}/images` |
| **Full URL** | `https://api.themoviedb.org/3/person/{person_id}/images?language=en-US` |
| **Description** | Fetches profile images for a person |
| **Parameters** | `person_id` (path, integer), `language` (query) |
| **Returns** | Profile image array |

---

### Person External IDs

| Field | Value |
|-------|-------|
| **Variable** | `REACT_APP_PERSON_EXTERNAL_IDS` |
| **Endpoint** | `/person/{person_id}/external_ids` |
| **Full URL** | `https://api.themoviedb.org/3/person/{person_id}/external_ids?language=en-US` |
| **Description** | Fetches external IDs (IMDB, Instagram, Twitter) for a person |
| **Parameters** | `person_id` (path, integer), `language` (query) |
| **Returns** | External ID mappings |

---

## 🔍 Search Endpoints

### Search Movies

| Field | Value |
|-------|-------|
| **Variable** | `REACT_APP_SEARCH_MOVIES` |
| **Endpoint** | `/search/movie` |
| **Full URL** | `https://api.themoviedb.org/3/search/movie?query={query}&language=en-US&page=1&include_adult=false&primary_release_year=&year=&region=US` |
| **Description** | Searches for movies by title/keywords |
| **Parameters** | `query` (string), `page` (number), `include_adult` (boolean), `primary_release_year` (number), `year` (number), `region` (string) |
| **Returns** | Movie list matching search criteria |

---

### Search TV Shows

| Field | Value |
|-------|-------|
| **Variable** | `REACT_APP_SEARCH_TV` |
| **Endpoint** | `/search/tv` |
| **Full URL** | `https://api.themoviedb.org/3/search/tv?query={query}&language=en-US&page=1&include_adult=false&first_air_date_year=&year=` |
| **Description** | Searches for TV shows by title/keywords |
| **Parameters** | `query` (string), `page` (number), `include_adult` (boolean), `first_air_date_year` (number), `year` (number) |
| **Returns** | TV show list matching search criteria |

---

### Search People

| Field | Value |
|-------|-------|
| **Variable** | `REACT_APP_SEARCH_PERSON` |
| **Endpoint** | `/search/person` |
| **Full URL** | `https://api.themoviedb.org/3/search/person?query={query}&language=en-US&page=1&include_adult=false` |
| **Description** | Searches for actors, directors, crew |
| **Parameters** | `query` (string), `page` (number), `include_adult` (boolean) |
| **Returns** | Person list matching search criteria |

---

### Multi Search

| Field | Value |
|-------|-------|
| **Variable** | `REACT_APP_SEARCH_MULTI` |
| **Endpoint** | `/search/multi` |
| **Full URL** | `https://api.themoviedb.org/3/search/multi?query={query}&language=en-US&page=1&include_adult=false` |
| **Description** | Searches movies, TV shows, and people in one request |
| **Parameters** | `query` (string), `page` (number), `include_adult` (boolean) |
| **Returns** | Combined results with movies, tv, and person categories |

---

## 🧭 Discover Endpoints

### Discover Movies

| Field | Value |
|-------|-------|
| **Variable** | `REACT_APP_DISCOVER_MOVIES` |
| **Endpoint** | `/discover/movie` |
| **Full URL** | `https://api.themoviedb.org/3/discover/movie?language=en-US&page=1&sort_by=popularity.desc&include_adult=false&include_video=false&region=US&primary_release_year=&vote_average.gte=&vote_count.gte=&with_genres=&with_original_language=&with_release_type=&with_runtime.lte=&with_runtime.gte=&with_watch_providers=&watch_region=&with_cast=&with_crew=&with_companies=&with_keywords=&without_keywords=&without_genres=&year=` |
| **Description** | Advanced movie search with multiple filters |
| **Parameters** | `page`, `sort_by`, `certification`, `include_adult`, `primary_release_date.gte/lte`, `vote_average.gte/lte`, `with_genres`, `with_original_language`, `with_watch_providers`, `watch_region`, `with_cast`, `with_crew`, `with_companies` |
| **Returns** | Movie list matching all filter criteria |

---

### Discover TV Shows

| Field | Value |
|-------|-------|
| **Variable** | `REACT_APP_DISCOVER_TV` |
| **Endpoint** | `/discover/tv` |
| **Full URL** | `https://api.themoviedb.org/3/discover/tv?language=en-US&page=1&sort_by=popularity.desc&include_adult=false&include_null_first_air_dates=false&first_air_date_year=&vote_average.gte=&vote_count.gte=&with_genres=&with_original_language=&with_runtime.lte=&with_runtime.gte=&with_status=&with_type=&with_watch_providers=&watch_region=&with_cast=&with_crew=&with_companies=&with_keywords=&without_keywords=&without_genres=&timezone=America/New_York&screened_theatrically=false` |
| **Description** | Advanced TV show search with multiple filters |
| **Parameters** | `page`, `sort_by`, `air_date.gte/lte`, `include_adult`, `vote_average.gte/lte`, `with_genres`, `with_original_language`, `with_status`, `with_type`, `with_watch_providers`, `watch_region`, `with_cast`, `with_crew` |
| **Returns** | TV show list matching all filter criteria |

---

## 🏷️ Genre Endpoints

### Movie Genres

| Field | Value |
|-------|-------|
| **Variable** | `REACT_APP_GENRES_MOVIE` |
| **Endpoint** | `/genre/movie/list` |
| **Full URL** | `https://api.themoviedb.org/3/genre/movie/list?language=en-US` |
| **Description** | Fetches all official movie genres |
| **Parameters** | `language` (query) |
| **Returns** | Genre list with ID and name |

**Example Response:**
```json
{
  "genres": [
    { "id": 28, "name": "Action" },
    { "id": 12, "name": "Adventure" },
    { "id": 16, "name": "Animation" }
  ]
}
```

---

### TV Show Genres

| Field | Value |
|-------|-------|
| **Variable** | `REACT_APP_GENRES_TV` |
| **Endpoint** | `/genre/tv/list` |
| **Full URL** | `https://api.themoviedb.org/3/genre/tv/list?language=en-US` |
| **Description** | Fetches all official TV show genres |
| **Parameters** | `language` (query) |
| **Returns** | Genre list with ID and name |

---

## 📦 Collection Endpoints

### Collection Details

| Field | Value |
|-------|-------|
| **Variable** | `REACT_APP_COLLECTION_DETAILS` |
| **Endpoint** | `/collection/{collection_id}` |
| **Full URL** | `https://api.themoviedb.org/3/collection/{collection_id}?language=en-US` |
| **Description** | Fetches movie collection/franchise details |
| **Parameters** | `collection_id` (path, integer), `language` (query) |
| **Returns** | Collection details including all movies in the collection |

---

## 🏢 Company Endpoints

### Company Details

| Field | Value |
|-------|-------|
| **Variable** | `REACT_APP_COMPANY_DETAILS` |
| **Endpoint** | `/company/{company_id}` |
| **Full URL** | `https://api.themoviedb.org/3/company/{company_id}?language=en-US` |
| **Description** | Fetches production company details |
| **Parameters** | `company_id` (path, integer), `language` (query) |
| **Returns** | Company details including logo, headquarters, description |

---

### Company Movies

| Field | Value |
|-------|-------|
| **Variable** | `REACT_APP_COMPANY_MOVIES` |
| **Endpoint** | `/company/{company_id}/movies` |
| **Full URL** | `https://api.themoviedb.org/3/company/{company_id}/movies?language=en-US&page=1&sort_by=popularity.desc&include_adult=false` |
| **Description** | Fetches movies produced by a company |
| **Parameters** | `company_id` (path, integer), `page` (query), `sort_by` (query) |
| **Returns** | Movie list produced by the company |

---

## 📡 Network Endpoints

### Network Details

| Field | Value |
|-------|-------|
| **Variable** | `REACT_APP_NETWORK_DETAILS` |
| **Endpoint** | `/network/{network_id}` |
| **Full URL** | `https://api.themoviedb.org/3/network/{network_id}?language=en-US` |
| **Description** | Fetches TV network details |
| **Parameters** | `network_id` (path, integer), `language` (query) |
| **Returns** | Network details including logo, headquarters |

---

### Network TV Shows

| Field | Value |
|-------|-------|
| **Variable** | `REACT_APP_NETWORK_TV_SHOWS` |
| **Endpoint** | `/network/{network_id}/tv_series` |
| **Full URL** | `https://api.themoviedb.org/3/network/{network_id}/tv_series?language=en-US&page=1&sort_by=popularity.desc&include_adult=false` |
| **Description** | Fetches TV shows produced by a network |
| **Parameters** | `network_id` (path, integer), `page` (query), `sort_by` (query) |
| **Returns** | TV show list produced by the network |

---

## 🏷️ Keyword Endpoints

### Keyword Details

| Field | Value |
|-------|-------|
| **Variable** | `REACT_APP_KEYWORD_DETAILS` |
| **Endpoint** | `/keyword/{keyword_id}` |
| **Full URL** | `https://api.themoviedb.org/3/keyword/{keyword_id}?language=en-US` |
| **Description** | Fetches keyword/tag details |
| **Parameters** | `keyword_id` (path, integer), `language` (query) |
| **Returns** | Keyword details including name and description |

---

### Keyword Movies

| Field | Value |
|-------|-------|
| **Variable** | `REACT_APP_KEYWORD_MOVIES` |
| **Endpoint** | `/keyword/{keyword_id}/movies` |
| **Full URL** | `https://api.themoviedb.org/3/keyword/{keyword_id}/movies?language=en-US&page=1&sort_by=popularity.desc&include_adult=false` |
| **Description** | Fetches movies associated with a keyword |
| **Parameters** | `keyword_id` (path, integer), `page` (query), `sort_by` (query) |
| **Returns** | Movie list associated with the keyword |

---

## ⚙️ Configuration Endpoints

### API Configuration

| Field | Value |
|-------|-------|
| **Variable** | `REACT_APP_CONFIGURATION` |
| **Endpoint** | `/configuration` |
| **Full URL** | `https://api.themoviedb.org/3/configuration` |
| **Description** | Fetches API configuration including image sizes |
| **Parameters** | None |
| **Returns** | Configuration object with image base URLs and sizes |

---

### Countries List

| Field | Value |
|-------|-------|
| **Variable** | `REACT_APP_COUNTRIES` |
| **Endpoint** | `/country/list` |
| **Full URL** | `https://api.themoviedb.org/3/country/list` |
| **Description** | Fetches ISO 3166-1 alpha-2 country codes |
| **Parameters** | None |
| **Returns** | Country list with ISO codes |

---

### Languages List

| Field | Value |
|-------|-------|
| **Variable** | `REACT_APP_LANGUAGES` |
| **Endpoint** | `/language/list` |
| **Full URL** | `https://api.themoviedb.org/3/language/list` |
| **Description** | Fetches ISO 639-1 language codes |
| **Parameters** | None |
| **Returns** | Language list with ISO codes |

---

### Watch Regions

| Field | Value |
|-------|-------|
| **Variable** | `REACT_APP_WATCH_REGIONS` |
| **Endpoint** | `/watch/providers/regions` |
| **Full URL** | `https://api.themoviedb.org/3/watch/providers/regions` |
| **Description** | Fetches supported watch regions |
| **Parameters** | None |
| **Returns** | Watch region list with ISO codes |

---

### Watch Providers

| Field | Value |
|-------|-------|
| **Variable** | `REACT_APP_WATCH_PROVIDERS` |
| **Endpoint** | `/watch/providers/movie` |
| **Full URL** | `https://api.themoviedb.org/3/watch/providers/movie?watch_region=US` |
| **Description** | Fetches watch providers for a region |
| **Parameters** | `watch_region` (query) |
| **Returns** | Provider list with logos |

---

## 📈 Trending Endpoints

### Trending Media

| Field | Value |
|-------|-------|
| **Variable** | `REACT_APP_TRENDING` |
| **Endpoint** | `/trending/{media_type}/{time_window}` |
| **Full URL** | `https://api.themoviedb.org/3/trending/{media_type}/{time_window}?language=en-US&page=1` |
| **Description** | Fetches trending movies, TV shows, or people |
| **Parameters** | `media_type` (path: movie/tv/person/all), `time_window` (path: day/week), `page` (query), `language` (query) |
| **Returns** | Trending media list sorted by trend score |

---

## 📋 List Endpoints

### List Details

| Field | Value |
|-------|-------|
| **Variable** | `REACT_APP_LIST_DETAILS` |
| **Endpoint** | `/list/{list_id}` |
| **Full URL** | `https://api.themoviedb.org/3/list/{list_id}?language=en-US&page=1` |
| **Description** | Fetches user-created movie list details |
| **Parameters** | `list_id` (path, integer), `page` (query), `language` (query) |
| **Returns** | List details including creator info and movie items |

---

## 👤 Guest Session Endpoints

### Guest Rated Movies

| Field | Value |
|-------|-------|
| **Variable** | `REACT_APP_GUEST_RATED_MOVIES` |
| **Endpoint** | `/guest_session/{guest_session_id}/rated/movies` |
| **Full URL** | `https://api.themoviedb.org/3/guest_session/{guest_session_id}/rated/movies?language=en-US&page=1&sort_by=created_at.desc` |
| **Description** | Fetches movies rated in a guest session |
| **Parameters** | `guest_session_id` (path), `page` (query), `sort_by` (query) |
| **Returns** | Rated movie list with user ratings |

---

### Guest Rated TV Shows

| Field | Value |
|-------|-------|
| **Variable** | `REACT_APP_GUEST_RATED_TV` |
| **Endpoint** | `/guest_session/{guest_session_id}/rated/tv` |
| **Full URL** | `https://api.themoviedb.org/3/guest_session/{guest_session_id}/rated/tv?language=en-US&page=1&sort_by=created_at.desc` |
| **Description** | Fetches TV shows rated in a guest session |
| **Parameters** | `guest_session_id` (path), `page` (query), `sort_by` (query) |
| **Returns** | Rated TV show list with user ratings |

---

## 🔐 Account Endpoints (Requires Authentication)

### Account Details

| Field | Value |
|-------|-------|
| **Variable** | `REACT_APP_ACCOUNT_DETAILS` |
| **Endpoint** | `/account` |
| **Full URL** | `https://api.themoviedb.org/3/account?language=en-US` |
| **Description** | Fetches authenticated user's account info |
| **Parameters** | `language` (query) |
| **Returns** | Account details including username, avatar |

---

### Favorite Movies

| Field | Value |
|-------|-------|
| **Variable** | `REACT_APP_ACCOUNT_FAVORITE_MOVIES` |
| **Endpoint** | `/account/{account_id}/favorite/movies` |
| **Full URL** | `https://api.themoviedb.org/3/account/{account_id}/favorite/movies?language=en-US&page=1&sort_by=created_at.desc` |
| **Description** | Fetches user's favorite movies |
| **Parameters** | `account_id` (path), `page` (query), `sort_by` (query) |
| **Returns** | Favorite movie list |

---

### Favorite TV Shows

| Field | Value |
|-------|-------|
| **Variable** | `REACT_APP_ACCOUNT_FAVORITE_TV` |
| **Endpoint** | `/account/{account_id}/favorite/tv` |
| **Full URL** | `https://api.themoviedb.org/3/account/{account_id}/favorite/tv?language=en-US&page=1&sort_by=created_at.desc` |
| **Description** | Fetches user's favorite TV shows |
| **Parameters** | `account_id` (path), `page` (query), `sort_by` (query) |
| **Returns** | Favorite TV show list |

---

### Watchlist Movies

| Field | Value |
|-------|-------|
| **Variable** | `REACT_APP_ACCOUNT_WATCHLIST_MOVIES` |
| **Endpoint** | `/account/{account_id}/watchlist/movies` |
| **Full URL** | `https://api.themoviedb.org/3/account/{account_id}/watchlist/movies?language=en-US&page=1&sort_by=created_at.desc` |
| **Description** | Fetches user's movie watchlist |
| **Parameters** | `account_id` (path), `page` (query), `sort_by` (query) |
| **Returns** | Watchlist movie list |

---

### Watchlist TV Shows

| Field | Value |
|-------|-------|
| **Variable** | `REACT_APP_ACCOUNT_WATCHLIST_TV` |
| **Endpoint** | `/account/{account_id}/watchlist/tv` |
| **Full URL** | `https://api.themoviedb.org/3/account/{account_id}/watchlist/tv?language=en-US&page=1&sort_by=created_at.desc` |
| **Description** | Fetches user's TV watchlist |
| **Parameters** | `account_id` (path), `page` (query), `sort_by` (query) |
| **Returns** | Watchlist TV show list |

---

### Rated Movies

| Field | Value |
|-------|-------|
| **Variable** | `REACT_APP_ACCOUNT_RATED_MOVIES` |
| **Endpoint** | `/account/{account_id}/rated/movies` |
| **Full URL** | `https://api.themoviedb.org/3/account/{account_id}/rated/movies?language=en-US&page=1&sort_by=created_at.desc` |
| **Description** | Fetches movies rated by the user |
| **Parameters** | `account_id` (path), `page` (query), `sort_by` (query) |
| **Returns** | Rated movie list with user ratings |

---

### Rated TV Shows

| Field | Value |
|-------|-------|
| **Variable** | `REACT_APP_ACCOUNT_RATED_TV` |
| **Endpoint** | `/account/{account_id}/rated/tv` |
| **Full URL** | `https://api.themoviedb.org/3/account/{account_id}/rated/tv?language=en-US&page=1&sort_by=created_at.desc` |
| **Description** | Fetches TV shows rated by the user |
| **Parameters** | `account_id` (path), `page` (query), `sort_by` (query) |
| **Returns** | Rated TV show list with user ratings |

---

## 🎬 Certification Endpoints

### Movie Certifications

| Field | Value |
|-------|-------|
| **Variable** | `REACT_APP_CERTIFICATIONS_MOVIES` |
| **Endpoint** | `/certification/movie/list` |
| **Full URL** | `https://api.themoviedb.org/3/certification/movie/list` |
| **Description** | Fetches movie certification ratings by country |
| **Parameters** | None |
| **Returns** | Certification list by country (G, PG, PG-13, R, etc.) |

---

### TV Show Certifications

| Field | Value |
|-------|-------|
| **Variable** | `REACT_APP_CERTIFICATIONS_TV` |
| **Endpoint** | `/certification/tv/list` |
| **Full URL** | `https://api.themoviedb.org/3/certification/tv/list` |
| **Description** | Fetches TV show certification ratings by country |
| **Parameters** | None |
| **Returns** | Certification list by country |

---

## 💡 Usage Tips

### Pagination
All list endpoints support pagination using the `page` parameter. Check `total_pages` in the response to know when to stop loading.

### Image URLs
Build image URLs using: `https://image.tmdb.org/t/p/{size}{path}`

Available sizes: `w92`, `w154`, `w185`, `w342`, `w500`, `w780`, `original`

### YouTube Videos
Build YouTube URLs using: `https://www.youtube.com/watch?v={key}`

### Rate Limiting
TMDB allows ~40 requests per 10 seconds. Implement caching to avoid hitting limits.

---

## 📚 Resources

- [TMDB API Documentation](https://developers.themoviedb.org/3)
- [TMDB Image Sizes](https://developers.themoviedb.org/3/getting-started/images)
