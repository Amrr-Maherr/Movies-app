# 🎬 Netflix Clone - React + TypeScript

A full-featured, production-ready Netflix clone built with React 19, TypeScript, and Tailwind CSS. Stream movies and TV shows with a beautiful, responsive interface powered by The Movie Database (TMDB) API.

![Netflix Clone](https://img.shields.io/badge/React-19.2.0-61dafb?style=flat&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178c6?style=flat&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.2-38bdf8?style=flat&logo=tailwindcss)
![TMDB API](https://img.shields.io/badge/TMDB-API-green?style=flat)

---

## 📋 Table of Contents

- [Features](#-features)
- [Live Demo](#-live-demo)
- [Screenshots](#-screenshots)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Installation](#-installation)
- [Environment Variables](#-environment-variables)
- [Available Scripts](#-available-scripts)
- [API Reference](#-api-reference)
- [Components](#-components)
- [Pages](#-pages)
- [Key Features](#-key-features)
- [TypeScript Types](#-typescript-types)
- [State Management](#-state-management)
- [Responsive Design](#-responsive-design)
- [Performance](#-performance)
- [Contributing](#-contributing)
- [License](#-license)
- [📖 Comprehensive Developer Guide](#-comprehensive-developer-guide)

---

> 📘 **New Developer?** Check out the [DEVELOPER_GUIDE.md](./DEVELOPER_GUIDE.md) for in-depth documentation including folder structure, component details, API integration, state management, and contributing guidelines.

## ✨ Features

### Core Features
- 🎥 **Movie & TV Show Browsing** - Explore thousands of titles from TMDB
- 🔍 **Live Search** - Real-time search with debounced input for movies and TV shows
- 📺 **TV Show Details** - Seasons, episodes, and series information
- 🎬 **Movie Details** - Cast, crew, trailers, reviews, and recommendations
- 👤 **Person Profiles** - Actor/director biographies and filmography
- 📝 **My List** - Personal watchlist (placeholder for authentication)
- 🎯 **Personalized Recommendations** - "Because You Watched" suggestions
- 🏆 **Top 10 Rankings** - Daily trending content with gradient badges
- 🆕 **New Releases** - Latest movies and episodes
- 🎞️ **Trailers & Videos** - Embedded YouTube players
- ⭐ **Ratings & Reviews** - User reviews and match scores
- 📺 **Streaming Providers** - Where to watch information
- 🏷️ **Genres & Keywords** - Content tags and categories

### UI/UX Features
- 🎨 **Netflix Design System** - Authentic dark theme with custom properties
- 🎭 **Smooth Animations** - Framer Motion page transitions
- 🎪 **Hero Carousel** - Auto-rotating featured content with background video
- 🃏 **Card Variants** - 6 different card layouts (Standard, Compact, Top 10, New Release, Award Winner, Recommendation)
- 📱 **Fully Responsive** - Mobile-first design (320px - 1920px+)
- ⌨️ **Keyboard Navigation** - Full accessibility support
- 🔄 **Loading States** - Skeleton loaders and spinners
- ❌ **Error Handling** - Retry mechanisms with user-friendly messages
- 🎯 **Hover Effects** - Interactive card overlays with quick actions
- 📲 **Mobile Sidebar** - Drawer navigation for mobile devices
- 🔔 **Profile Menu** - User account dropdown
- 🎬 **Modal Dialogs** - Movie info and trailer modals
- 🎮 **Video Controls** - Inline Play/Pause, Mute/Unmute, and Fullscreen buttons
- 🔊 **Audio Controls** - Background video mute/unmute with visual feedback
- ⛶ **Fullscreen Mode** - Enter/exit fullscreen with one click

---

## 🌐 Live Demo

> **Coming Soon** - Deploy to Vercel, Netlify, or your preferred hosting platform

---

## 📸 Screenshots

### Homepage
![Homepage](./screenshots/home.png)
*Hero carousel with trending content and multiple sections*

### Movie Details
![Movie Details](./screenshots/movie-details.png)
*Full movie information with cast, trailers, and recommendations*

### TV Show Details
![TV Show Details](./screenshots/tv-show.png)
*Seasons, episodes, and series information*

### Search Popup
![Search](./screenshots/search.png)
*Live search with instant results*

### Mobile Responsive
![Mobile](./screenshots/mobile.png)
*Fully responsive design for all screen sizes*

---

## 🛠️ Tech Stack

### Frontend Framework
- **React 19.2.0** - UI library with latest features
- **TypeScript 5.9** - Type-safe development
- **React Router DOM 7.13** - Client-side routing
- **Framer Motion 12.34** - Page transitions and animations

### State Management
- **TanStack React Query 5.90** - Server state management
- **Redux Toolkit 2.11** - Installed for future global state (optional)
- **Local State** - Component-level useState/useReducer

### Styling
- **Tailwind CSS 4.2** - Utility-first CSS framework
- **CSS Custom Properties** - Theme variables for Netflix colors
- **Class Variance Authority** - Component variant management
- **tailwind-merge** - Dynamic className utilities

### UI Components
- **Radix UI** - Headless accessible components
- **ShadCN UI** - Pre-built component patterns
- **Vaul** - Drawer component for mobile
- **Lucide React** - Icon library

### Data Fetching
- **Axios 1.13** - HTTP client
- **TMDB API** - Movie/TV database

### Forms
- **React Hook Form 7.71** - Form handling

### Build Tools
- **Vite 7.3** - Fast build tool and dev server
- **ESLint 9.39** - Code linting
- **TypeScript ESLint** - Type-aware lint rules

### Testing
- **Vitest 4.0** - Unit testing framework
- **Playwright 1.58** - E2E testing
- **Testing Library** - Component testing utilities

---

## 🔌 Services Architecture

The application uses a centralized services layer for all API communication with TMDB. This architecture provides:

- **Clean separation of concerns** - API logic is isolated from UI components
- **Type safety** - Full TypeScript support with exported types
- **Reusability** - Service functions can be used across multiple components
- **Maintainability** - Easy to update API endpoints or add new features
- **Consistent error handling** - All API calls follow the same error handling pattern

### Service Modules

| Module | Description | Key Functions |
|--------|-------------|---------------|
| `moviesService.ts` | Movie-related API calls | `getPopularMovies`, `getMovieDetails`, `getMovieCredits`, `getMovieReviews` |
| `tvService.ts` | TV show-related API calls | `getPopularTvShows`, `getTVShowDetails`, `getTVSeasonDetails`, `getTVEpisodeDetails` |
| `personService.ts` | Person/actor API calls | `getPersonDetails`, `getPersonMovieCredits`, `getPersonTVCredits` |
| `searchService.ts` | Search functionality | `searchMovies`, `searchTvShows`, `searchPeople`, `multiSearch` |
| `discoverService.ts` | Advanced filtering | `discoverMovies`, `discoverTvShows`, `getMovieGenres` |
| `trendingService.ts` | Trending content | `getTrendingMoviesDay`, `getTrendingTvShowsWeek`, `getStreamingPlatforms` |

### Usage Examples

```typescript
// Import from the central index
import { getPopularMovies, getMovieDetails } from '@/services';

// Or import specific service modules
import * as moviesService from '@/services/moviesService';
import * as tvService from '@/services/tvService';

// Use with React Query
import { useQuery } from '@tanstack/react-query';
import { getPopularMovies } from '@/services';

function PopularMovies() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['popularMovies'],
    queryFn: () => getPopularMovies(),
  });
}
```

### Adding New API Endpoints

1. **Identify the category** - Determine which service module the endpoint belongs to
2. **Add the function** - Create a new function in the appropriate service file
3. **Add TypeScript types** - Define response types in the same file or export from types
4. **Export from index** - Add the function to `services/index.ts` for centralized access
5. **Add JSDoc comments** - Document the function purpose, parameters, and return value

---

## 📁 Project Structure

```
netflix/
├── public/                     # Static assets
│   └── favicon.ico
├── src/
│   ├── services/               # TMDB API service layer (6 modules)
│   │   ├── index.ts            # Central export point for all services
│   │   ├── moviesService.ts    # Movie-related API calls
│   │   │   ├── getPopularMovies()
│   │   │   ├── getTopRatedMovies()
│   │   │   ├── getUpcomingMovies()
│   │   │   ├── getNowPlayingMovies()
│   │   │   ├── getMovieDetails()
│   │   │   ├── getMovieCredits()
│   │   │   ├── getMovieReviews()
│   │   │   ├── getMovieRecommendations()
│   │   │   ├── getMovieSimilar()
│   │   │   ├── getMovieVideos()
│   │   │   ├── getMovieImages()
│   │   │   └── getMovieWatchProviders()
│   │   │
│   │   ├── tvService.ts        # TV show-related API calls
│   │   │   ├── getPopularTvShows()
│   │   │   ├── getTopRatedTvShows()
│   │   │   ├── getAiringTodayTvShows()
│   │   │   ├── getOnTheAirTvShows()
│   │   │   ├── getTVShowDetails()
│   │   │   ├── getTVCredits()
│   │   │   ├── getTVReviews()
│   │   │   ├── getTVRecommendations()
│   │   │   ├── getTVSimilar()
│   │   │   ├── getTVVideos()
│   │   │   ├── getTVImages()
│   │   │   ├── getTVWatchProviders()
│   │   │   ├── getTVSeasonDetails()
│   │   │   ├── getTVEpisodeDetails()
│   │   │   └── getSeasonEpisodes()
│   │   │
│   │   ├── personService.ts    # Person-related API calls
│   │   │   ├── getPersonDetails()
│   │   │   ├── getPersonExternalIds()
│   │   │   ├── getPersonMovieCredits()
│   │   │   ├── getPersonTVCredits()
│   │   │   ├── getPersonCombinedCredits()
│   │   │   ├── getPersonImages()
│   │   │   └── getPopularPeople()
│   │   │
│   │   ├── searchService.ts    # Search API calls
│   │   │   ├── searchMovies()
│   │   │   ├── searchTvShows()
│   │   │   ├── searchPeople()
│   │   │   └── multiSearch()
│   │   │
│   │   ├── discoverService.ts  # Discover & filter API calls
│   │   │   ├── discoverMovies()
│   │   │   ├── discoverTvShows()
│   │   │   ├── getKidsMovies()
│   │   │   ├── getMediaByLanguage()
│   │   │   ├── getMovieGenres()
│   │   │   └── getTvGenres()
│   │   │
│   │   └── trendingService.ts  # Trending API calls
│   │       ├── getTrendingMoviesDay()
│   │       ├── getTrendingMoviesWeek()
│   │       ├── getTrendingTvShowsDay()
│   │       ├── getTrendingTvShowsWeek()
│   │       ├── getTrendingPeopleDay()
│   │       ├── getTrendingPeopleWeek()
│   │       └── getStreamingPlatforms()
│   │
│   ├── components/
│   │   ├── sections/           # Page section components (28 files)
│   │   │   ├── TopPicksSection.tsx
│   │   │   ├── MoviePromo.tsx
│   │   │   ├── ContinueWatchingSection.tsx
│   │   │   ├── BecauseYouWatchedSection.tsx
│   │   │   ├── NewReleasesSection.tsx
│   │   │   ├── OnlyOnNetflixSection.tsx
│   │   │   ├── AwardWinnersSection.tsx
│   │   │   ├── BingeWorthySection.tsx
│   │   │   ├── WeekendWatchSection.tsx
│   │   │   ├── GenreShowcaseSection.tsx
│   │   │   ├── PricingSection.tsx
│   │   │   ├── AskedQuestions.tsx
│   │   │   ├── EpisodesSection.tsx
│   │   │   ├── FullCreditsSection.tsx
│   │   │   ├── TrailersSection.tsx
│   │   │   ├── ReviewsSection.tsx
│   │   │   ├── MoreLikeThisSection.tsx
│   │   │   ├── WatchProvidersSection.tsx
│   │   │   ├── KeywordsSection.tsx
│   │   │   ├── BiographySection.tsx
│   │   │   ├── KnownForSection.tsx
│   │   │   └── ...
│   │   │
│   │   ├── shared/             # Reusable components
│   │   │   ├── Card/
│   │   │   │   ├── Card.tsx                    # Main card component
│   │   │   │   ├── CardPoster.tsx              # Poster image wrapper
│   │   │   │   ├── CardHoverOverlay.tsx        # Hover state overlay
│   │   │   │   ├── CardBadges.tsx              # Trending/award badges
│   │   │   │   ├── CardMetadata.tsx            # Metadata display
│   │   │   │   └── CardVariantLayouts.tsx      # Special layouts
│   │   │   │
│   │   │   ├── cards/                          # Card type components
│   │   │   │   ├── MovieCard.tsx
│   │   │   │   ├── PersonCard.tsx
│   │   │   │   ├── TrailerCard.tsx
│   │   │   │   ├── ReviewCard.tsx
│   │   │   │   ├── SeasonCard.tsx
│   │   │   │   └── EpisodeCard.tsx
│   │   │   │
│   │   │   ├── heroSection/
│   │   │   │   ├── HeroSection.tsx
│   │   │   │   ├── HeroSlide.tsx
│   │   │   │   ├── HeroBackground.tsx
│   │   │   │   ├── HeroContent.tsx
│   │   │   │   └── ActionButtons.tsx
│   │   │   │
│   │   │   ├── Slider/
│   │   │   │   └── slider.tsx                  # Swiper-based carousel
│   │   │   │
│   │   │   ├── MediaSection.tsx                # Generic media section
│   │   │   ├── MediaHero.tsx                   # Detail page hero
│   │   │   ├── PersonHero.tsx                  # Person detail hero
│   │   │   ├── MovieModal.tsx                  # Movie info modal
│   │   │   ├── TrailerModal.tsx                # YouTube trailer modal
│   │   │   ├── SectionHeader.tsx               # Section title
│   │   │   └── logo/
│   │   │       └── Logo.tsx
│   │   │
│   │   └── ui/                 # Base UI components (ShadCN)
│   │       ├── button.tsx
│   │       ├── dialog.tsx
│   │       ├── drawer.tsx
│   │       ├── input.tsx
│   │       ├── select.tsx
│   │       ├── loader.tsx
│   │       └── error.tsx
│   │
│   ├── data/                   # Static data
│   │   ├── header.ts           # Navigation links
│   │   └── footer.ts           # Footer links & social
│   │
│   ├── layout/
│   │   ├── header/
│   │   │   ├── Header.tsx
│   │   │   └── components/
│   │   │       ├── NavLinks.tsx
│   │   │       ├── ProfileMenu.tsx
│   │   │       ├── MobileSidebar.tsx
│   │   │       └── search/
│   │   │           ├── SearchButton.tsx
│   │   │           ├── SearchPopup.tsx
│   │   │           ├── SearchResultCard.tsx
│   │   │           └── index.ts
│   │   │
│   │   ├── footer/
│   │   │   ├── Footer.tsx
│   │   │   ├── FooterLink.tsx
│   │   │   └── index.ts
│   │   │
│   │   └── mainLayout/
│   │       └── MainLayout.tsx
│   │
│   ├── pages/                  # Page components (28 files)
│   │   ├── Home.tsx
│   │   ├── Movie.tsx
│   │   ├── TVShow.tsx
│   │   ├── Kids.tsx
│   │   ├── NewPopular.tsx
│   │   ├── MyList.tsx
│   │   ├── Actor.tsx
│   │   ├── Session.tsx
│   │   ├── MovieDetails.tsx
│   │   ├── TVShowDetails.tsx
│   │   ├── SeasonDetailsPage.tsx
│   │   ├── EpisodeDetailsPage.tsx
│   │   ├── PersonDetails.tsx
│   │   ├── FAQ.tsx
│   │   ├── HelpCenter.tsx
│   │   ├── Account.tsx
│   │   ├── MediaCenter.tsx
│   │   ├── InvestorRelations.tsx
│   │   ├── Jobs.tsx
│   │   ├── WaysToWatch.tsx
│   │   ├── TermsOfUse.tsx
│   │   ├── Privacy.tsx
│   │   ├── CookiePreferences.tsx
│   │   ├── CorporateInformation.tsx
│   │   ├── ContactUs.tsx
│   │   ├── SpeedTest.tsx
│   │   ├── LegalNotices.tsx
│   │   ├── OnlyOnNetflix.tsx
│   │   └── NotFound.tsx
│   │
│   ├── providers/
│   │   └── Providers.tsx       # React Query + Router providers
│   │
│   ├── queries/                # React Query hooks (20 files)
│   │   ├── FetchPopularMovies.tsx
│   │   ├── FetchTopRatedMovies.tsx
│   │   ├── FetchNowPlayingMovies.tsx
│   │   ├── FetchTrendingMoviesDay.tsx
│   │   ├── FetchTrendingMoviesWeek.tsx
│   │   ├── FetchUpcomingMovies.tsx
│   │   ├── FetchPopularTvShows.tsx
│   │   ├── FetchTrendingTvDay.tsx
│   │   ├── FetchTrendingTvWeek.tsx
│   │   ├── FetchTopRatedTvShows.tsx
│   │   ├── FetchAiringTodayTv.tsx
│   │   ├── FetchOnTheAirTv.tsx
│   │   ├── FetchMovieDetails.tsx
│   │   ├── FetchTvShowDetails.tsx
│   │   ├── FetchTvSeasonDetails.tsx
│   │   ├── FetchEpisodeDetails.tsx
│   │   ├── FetchPersonDetails.tsx
│   │   ├── FetchPersonCredits.tsx
│   │   ├── FetchSearch.ts
│   │   └── index.ts
│   │
│   ├── routes/
│   │   └── Routes.tsx          # React Router configuration
│   │
│   ├── types/                  # TypeScript types
│   │   ├── movies.ts           # Movie & TV Show types
│   │   ├── movieDetails.ts     # Detailed movie types
│   │   ├── mediaDetails.ts     # Media union types
│   │   ├── person.ts           # Person/actor types
│   │   ├── hero.ts             # Hero section types
│   │   ├── header.ts           # Header link types
│   │   ├── footer.ts           # Footer link types
│   │   ├── logo.ts             # Logo props
│   │   └── index.ts
│   │
│   ├── utils/                  # Utility functions
│   │   ├── tmdb.ts             # TMDB image URL helpers
│   │   └── movieHelpers.ts     # Movie data helpers
│   │
│   ├── lib/
│   │   └── utils.ts            # className merger (cn)
│   │
│   ├── hooks/                  # Custom React hooks (extendable)
│   ├── store/                  # Redux store (optional)
│   ├── assets/                 # Static assets
│   │
│   ├── App.tsx                 # Main app component
│   ├── App.css                 # App styles
│   ├── main.tsx                # Entry point
│   └── index.css               # Global styles & CSS variables
│
├── tests/                      # Test files
│   ├── e2e/                    # Playwright E2E tests
│   └── components/             # Component tests
│
├── .env.example                # Environment variables template
├── .gitignore
├── package.json
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
├── vite.config.ts
├── vitest.config.ts
├── eslint.config.js
├── playwright.config.ts
└── README.md
```

---

## 🚀 Installation

### Prerequisites

- **Node.js** 18+ (recommended: 20+)
- **npm** or **yarn** or **pnpm**
- **Git**

### Step-by-Step Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/netflix-clone.git
   cd netflix-clone
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Create environment file**
   ```bash
   cp .env.example .env
   ```

4. **Configure environment variables** (see next section)

5. **Start development server**
   ```bash
   npm run dev
   ```

6. **Open in browser**
   ```
   http://localhost:5173
   ```

---

## 🔐 Environment Variables

Create a `.env` file in the root directory:

```env
# TMDB API Configuration
# Get your API key from: https://www.themoviedb.org/settings/api
VITE_TMDB_API_KEY=your_api_key_here
VITE_TMDB_BASE_URL=https://api.themoviedb.org/3
VITE_TMDB_IMAGE_BASE_URL=https://image.tmdb.org/t/p

# App Configuration (optional)
VITE_APP_NAME=Netflix Clone
VITE_APP_URL=http://localhost:5173
```

### Getting TMDB API Key

1. Visit [The Movie Database](https://www.themoviedb.org/)
2. Create a free account
3. Go to Settings → API → Create API Key
4. Copy your API key to `.env`

> **Note:** The app includes a fallback API key for development, but you should use your own for production.

---

## 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server (Vite) |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |
| `npm run test` | Run tests with Vitest |
| `npm run test:ui` | Run tests with UI |
| `npm run test:e2e` | Run E2E tests with Playwright |
| `npm run type-check` | Run TypeScript type checking |

---

## 🌍 API Reference

### Base Configuration

```typescript
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';
```

### Movie Endpoints

| Endpoint | Description | Query Hook |
|----------|-------------|------------|
| `/movie/popular` | Popular movies | `usePopularMovies()` |
| `/movie/top_rated` | Top rated movies | `useTopRatedMovies()` |
| `/movie/now_playing` | Now in theaters | `useNowPlayingMovies()` |
| `/movie/upcoming` | Upcoming releases | `useUpcomingMovies()` |
| `/trending/movie/{day\|week}` | Trending movies | `useTrendingMoviesDay()`, `useTrendingMoviesWeek()` |
| `/movie/{id}` | Movie details | `FetchMovieDetails()` |
| `/movie/{id}/credits` | Cast & crew | (appended) |
| `/movie/{id}/videos` | Trailers | (appended) |
| `/movie/{id}/similar` | Similar movies | (appended) |
| `/movie/{id}/reviews` | Reviews | (appended) |

### TV Show Endpoints

| Endpoint | Description | Query Hook |
|----------|-------------|------------|
| `/tv/popular` | Popular TV shows | `usePopularTvShows()` |
| `/tv/top_rated` | Top rated TV shows | `useTopRatedTvShows()` |
| `/tv/airing_today` | Airing today | `useAiringTodayTv()` |
| `/tv/on_the_air` | Currently airing | `useOnTheAirTv()` |
| `/trending/tv/{day\|week}` | Trending TV shows | `useTrendingTvDay()`, `useTrendingTvWeek()` |
| `/tv/{id}` | TV show details | `FetchTvShowDetails()` |
| `/tv/{id}/season/{season}` | Season details | `FetchTvSeasonDetails()` |
| `/tv/{id}/season/{season}/episode/{episode}` | Episode details | `FetchEpisodeDetails()` |

### Person Endpoints

| Endpoint | Description | Query Hook |
|----------|-------------|------------|
| `/person/{id}` | Person details | `FetchPersonDetails()` |
| `/person/{id}/combined_credits` | Filmography | `FetchPersonCredits()` |
| `/person/{id}/external_ids` | Social media | (appended) |

### Search Endpoints

| Endpoint | Description | Query Hook |
|----------|-------------|------------|
| `/search/movie` | Search movies | `useSearch()` |
| `/search/tv` | Search TV shows | `useSearch()` |
| `/search/person` | Search people | (future) |

### Image Sizes

```typescript
// Posters
w92, w154, w185, w342, w500, w780, original

// Backdrops
w300, w780, w1280, original

// Profile Images
w45, w185, h632, original
```

---

## 🧩 Components

### Shared Components

#### Card Component
**File:** `src/components/shared/Card/Card.tsx`

Main reusable card with 6 variants:

```tsx
<Card 
  movie={movieData} 
  variant="standard"  // | "compact" | "top10" | "newRelease" | "awardWinner" | "recommendation"
  rank={1}            // For top10 variant
  showBadge={true}    // Show trending badge
/>
```

**Features:**
- Hover overlay with play/more info buttons
- Match score percentage
- Age rating (16+, 13+, PG)
- Release year
- Modal on click
- Responsive sizing

#### Slider Component
**File:** `src/components/shared/Slider/slider.tsx`

Swiper-based carousel:

```tsx
<Slider 
  slidesPerView={4}
  slidesPerViewMobile={1}
  spaceBetween={20}
  useFadeEffect={false}
  hideNavigation={true}
>
  {items.map(item => <Card movie={item} />)}
</Slider>
```

**Features:**
- Responsive breakpoints
- Autoplay (4s delay)
- Navigation arrows (optional)
- Fade or slide effects
- Grab cursor
- Touch-friendly

#### HeroSection
**File:** `src/components/shared/heroSection/HeroSection.tsx`

Auto-rotating hero carousel:

```tsx
<HeroSection
  data={heroData}
  isLoading={false}
  error={null}
  onRetry={() => {}}
/>
```

**Features:**
- 8-second auto-rotation
- Fade transitions
- Full-width backdrop with YouTube trailer background
- Gradient overlays
- Play, More Info buttons
- Responsive content

#### MediaHero
**File:** `src/components/shared/MediaHero.tsx`

Detail page hero with video controls:

```tsx
<MediaHero
  media={mediaData}
  onPlayTrailer={() => {}}
  onAddToList={() => {}}
/>
```

**Features:**
- Background video with autoplay, loop, mute
- Inline video controls (Play/Pause, Mute/Unmute, Fullscreen)
- Action buttons (Play, My List, More Info)
- Match score, rating, age rating badges
- Responsive layout
- Fullscreen API support
- ESC key to exit fullscreen

#### ActionButtons
**File:** `src/components/shared/ActionButtons.tsx`

Reusable action buttons component:

```tsx
<ActionButtons
  title={title}
  isAddedToList={isAddedToList}
  showTrailer={showTrailer}
  onPlay={handlePlay}
  onAddToList={handleAddToList}
  onMoreInfo={handleMoreInfo}
/>
```

**Features:**
- Play button with icon
- My List button with dynamic state
- More Info button
- Responsive sizing (smaller on mobile)
- Text hidden on mobile, visible on desktop

#### VideoControls
**File:** `src/components/shared/VideoControls.tsx`

Inline video control buttons:

```tsx
<VideoControls
  isMuted={isMuted}
  isPlaying={isPlaying}
  isFullscreen={isFullscreen}
  onToggleMute={toggleMute}
  onTogglePlay={togglePlay}
  onToggleFullscreen={toggleFullscreen}
/>
```

**Features:**
- Play/Pause toggle (blue when paused)
- Mute/Unmute toggle (red when muted)
- Fullscreen toggle (purple when active)
- Backdrop blur effect
- Hover animations
- Accessible with aria-labels

#### MovieModal
**File:** `src/components/shared/MovieModal.tsx`

Movie information modal:

```tsx
<MovieModal 
  movie={movieData} 
  isOpen={isOpen} 
  onClose={() => setIsOpen(false)} 
/>
```

**Features:**
- Backdrop header
- Movie metadata
- Play/More Info buttons
- Close on ESC/outside click

### UI Components (ShadCN)

Located in `src/components/ui/`:

| Component | Usage |
|-----------|-------|
| `Button` | Multiple variants (default, destructive, outline, ghost, link) |
| `Dialog` | Modal dialogs with Radix UI |
| `Drawer` | Mobile slide-out panels |
| `Input` | Text input fields |
| `Select` | Dropdown selects |
| `Loader` | Loading spinner |
| `Error` | Error state with retry |

### Section Components

28 reusable section components in `src/components/sections/`:

**Content Sections:**
- `TopPicksSection` - Top 10 grid layout
- `MoviePromo` - Featured content showcase
- `NewReleasesSection` - New content with dates
- `OnlyOnNetflixSection` - Original content
- `AwardWinnersSection` - Award-winning titles
- `GenreShowcaseSection` - Genre-based collections
- `BingeWorthySection` - TV show recommendations
- `WeekendWatchSection` - Weekend picks

**Interactive Sections:**
- `ContinueWatchingSection` - User progress tracking
- `BecauseYouWatchedSection` - Personalized recommendations

**Detail Page Sections:**
- `EpisodesSection` - TV episode browser
- `FullCreditsSection` - Cast and crew display
- `TrailersSection` - Video gallery
- `ReviewsSection` - User reviews
- `MoreLikeThisSection` - Similar content
- `WatchProvidersSection` - Streaming availability
- `KeywordsSection` - Tags/genres
- `BiographySection` - Person bio
- `KnownForSection` - Person highlights
- `SocialLinksSection` - External links
- `ProductionSection` - Studios/networks
- `MediaInfoSection` - Media metadata
- `PricingSection` - Subscription tiers
- `AskedQuestions` - FAQ accordion

---

## 📄 Pages

### Main Content Pages

| Page | Route | Component | Description |
|------|-------|-----------|-------------|
| Home | `/` | `Home.tsx` | Main landing page with all sections |
| Movies | `/movies` | `Movie.tsx` | Movies browse page |
| TV Shows | `/tv-shows` | `TVShow.tsx` | TV shows browse page |
| Kids | `/kids` | `Kids.tsx` | Kids content |
| New & Popular | `/new-popular` | `NewPopular.tsx` | Trending content |
| My List | `/my-list` | `MyList.tsx` | User's watchlist |

### Detail Pages

| Page | Route | Component | Description |
|------|-------|-----------|-------------|
| Movie Details | `/movie/:id` | `MovieDetails.tsx` | Full movie information |
| TV Show Details | `/tv/:id` | `TVShowDetails.tsx` | TV series information |
| Season Details | `/tv/:tvId/season/:seasonNumber` | `SeasonDetailsPage.tsx` | Season episodes |
| Episode Details | `/tv/:tvId/season/:seasonNumber/episode/:episodeNumber` | `EpisodeDetailsPage.tsx` | Episode information |
| Person Details | `/person/:id` | `PersonDetails.tsx` | Actor/director profile |

### Footer Pages

Static informational pages: FAQ, Help Center, Account, Media Center, Investor Relations, Jobs, Terms of Use, Privacy, Cookie Preferences, Corporate Information, Contact Us, Speed Test, Legal Notices, Only on Netflix.

---

## 🎯 Key Features

### 1. Live Search Popup

**Location:** `src/layout/header/components/search/`

```tsx
// SearchButton.tsx
<SearchButton />

// SearchPopup.tsx
<SearchPopup 
  isOpen={isPopupOpen} 
  onClose={() => setIsPopupOpen(false)} 
/>
```

**Features:**
- Debounced input (300ms)
- Combined movie + TV results
- ESC key to close
- Outside click detection
- Direct navigation to details
- Scrollable results (max 60vh)
- Empty state messaging

### 2. Card Variants

**Standard Card:**
```tsx
<Card movie={movie} variant="standard" showBadge />
```

**Top 10 Card:**
```tsx
<Card movie={movie} variant="top10" rank={1} />
```

**New Release Card:**
```tsx
<Card movie={movie} variant="newRelease" />
```

**Award Winner Card:**
```tsx
<Card movie={movie} variant="awardWinner" />
```

**Recommendation Card:**
```tsx
<Card movie={movie} variant="recommendation" />
```

**Compact Card:**
```tsx
<Card movie={movie} variant="compact" />
```

### 3. Page Transitions

All pages use Framer Motion for smooth transitions:

```tsx
<motion.div
  initial={{ opacity: 0, x: -50 }}
  animate={{ opacity: 1, x: 0 }}
  exit={{ opacity: 0, x: 50 }}
  transition={{ duration: 0.5 }}
>
  {/* Page content */}
</motion.div>
```

### 4. Responsive Design

**Breakpoints:**
- Mobile: 320px - 639px
- Tablet: 640px - 767px
- Desktop: 768px - 1023px
- Large: 1024px+

**Grid Layouts:**
```tsx
// Top 10 Grid
grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5

// Footer Links
grid-cols-2 md:grid-cols-4
```

### 5. Theme System

**CSS Custom Properties:**
```css
:root {
  --netflix-red: #e50914;
  --background-primary: #141414;
  --background-secondary: #181818;
  --background-tertiary: #1f1f1f;
  --text-primary: #ffffff;
  --text-secondary: #b3b3b3;
  --success: #46d369;
  --hover-overlay: rgba(255, 255, 255, 0.1);
  --header-bg-scrolled: #141414;
}
```

---

## 📝 TypeScript Types

### Core Types

```typescript
// Movie
interface Movie {
  id: number;
  title: string;
  overview: string;
  backdrop_path: string | null;
  poster_path: string | null;
  vote_average: number;
  release_date: string;
  genre_ids: number[];
  // ... more fields
}

// TV Show
interface TvShow {
  id: number;
  name: string;
  overview: string;
  backdrop_path: string | null;
  poster_path: string | null;
  vote_average: number;
  first_air_date: string;
  genre_ids: number[];
  // ... more fields
}

// Movie Details
interface MovieDetails {
  id: number;
  title: string;
  overview: string;
  runtime: number;
  release_date: string;
  budget: number;
  revenue: number;
  vote_average: number;
  genres: Genre[];
  credits: Credits;
  videos: Videos;
  similar: SimilarResponse;
  // ... more fields
}

// TV Show Details
interface TvShowDetails {
  id: number;
  name: string;
  overview: string;
  number_of_seasons: number;
  number_of_episodes: number;
  episode_run_time: number[];
  first_air_date: string;
  vote_average: number;
  genres: Genre[];
  credits: Credits;
  videos: Videos;
  seasons: Season[];
  // ... more fields
}
```

### Utility Types

```typescript
// Hero Media Union
type HeroMedia = Movie | TvShow;

// Media Details Union
type MediaDetails = MovieDetails | TvShowDetails;

// Search Result
interface SearchResult {
  item: Movie | TvShow;
  type: "movie" | "tv";
}
```

### Helper Functions

```typescript
// movieHelpers.ts
getMatchScore(voteAverage: number): number;      // Returns 0-100
getYear(releaseDate: string): string;            // Returns "YYYY"
getAgeRating(voteAverage: number): string;       // Returns "16+", "13+", "PG"
getGenres(genreIds: number[]): string[];         // Returns genre names

// tmdb.ts
getImageUrl(path: string, size: string): string;
getPosterUrl(path: string, size?: string): string;
getBackdropUrl(path: string): string;
getProfileUrl(path: string): string;
```

---

## 🗄️ State Management

### Server State (React Query)

```typescript
// Query Hook Example
export default function usePopularMovies(page: number = 1) {
  return useQuery({
    queryKey: ["PopularMovies"],
    queryFn: () => GetPopularMovies(page) as Promise<Movie[]>,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}
```

**Configuration:**
- **Stale Time:** 5 minutes for all queries
- **Retry:** Default (3 attempts)
- **Cache:** Persistent during session

### Local State

```typescript
// Component State
const [isModalOpen, setIsModalOpen] = useState(false);
const [isHovered, setIsHovered] = useState(false);
const [query, setQuery] = useState("");

// Debounced Search
const debouncedQuery = useDebounce(query, 300);
```

### Redux (Optional)

Redux Toolkit is installed but not currently used. The `src/store/` directory is available for implementing global client state (user authentication, viewing history, my list, etc.).

---

## 📱 Responsive Design

### Mobile-First Approach

**Header:**
- Desktop: Logo + Nav Links + Search + Profile
- Mobile: Logo + Search + Hamburger Menu → Sidebar Drawer

**Hero Section:**
- Desktop: Full-width backdrop, centered content
- Mobile: Cropped backdrop, adjusted text positioning

**Cards:**
- Desktop: 6 columns (lg), 5 columns (md), 4 columns (sm)
- Tablet: 3 columns
- Mobile: 2 columns

**Sections:**
- Desktop: Container with padding (px-16)
- Tablet: Container with padding (px-12)
- Mobile: Container with padding (px-4)

### Breakpoint Utilities

```tsx
// Responsive Classes
className="text-sm md:text-base lg:text-lg"
className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6"
className="hidden md:block"
className="md:hidden"
```

---

## ⚡ Performance

### Optimizations

1. **Code Splitting**
   ```tsx
   const MovieDetails = lazy(() => import("@/pages/MovieDetails"));
   <Suspense fallback={<Loader />}>
     <MovieDetails />
   </Suspense>
   ```

2. **Image Optimization**
   - Lazy loading for below-fold images
   - Eager loading for hero/above-fold
   - Multiple sizes from TMDB

3. **React Query Caching**
   - 5-minute stale time
   - Background refetching
   - Deduplicated requests

4. **Debounced Search**
   - 300ms delay before API calls
   - Reduces unnecessary requests

5. **Memoization**
   ```tsx
   const Card = memo(({ movie, variant }) => {
     const posterUrl = useMemo(() => ..., [movie.poster_path]);
     const matchScore = useMemo(() => ..., [movie.vote_average]);
   });
   ```

6. **Bundle Size**
   - Tree shaking with Vite
   - Dynamic imports for routes
   - Shared chunk optimization

### Build Output

```
Total Build Size: ~650 KB (gzipped: ~180 KB)
- Main chunk: 540 KB (gzipped: 176 KB)
- Slider chunk: 103 KB (gzipped: 32 KB)
- CSS: 103 KB (gzipped: 15 KB)
```

---

## 🤝 Contributing

### Getting Started

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Commit Convention

We follow [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation
- `style:` - Formatting
- `refactor:` - Code refactoring
- `test:` - Tests
- `chore:` - Maintenance

### Development Guidelines

- Use TypeScript for all new code
- Follow existing code style
- Write tests for new features
- Update documentation
- Ensure responsive design
- Test on multiple screen sizes

---

## 📄 License

This project is for **educational purposes only**. Netflix and the Netflix logo are trademarks of Netflix, Inc.

All movie and TV show data is provided by [The Movie Database (TMDB)](https://www.themoviedb.org/) and is licensed under their [Terms of Use](https://www.themoviedb.org/terms-of-use).

---

## 🙏 Acknowledgments

- [The Movie Database (TMDB)](https://www.themoviedb.org/) - API and data
- [Netflix](https://www.netflix.com/) - Design inspiration
- [ShadCN UI](https://ui.shadcn.com/) - Component library
- [Radix UI](https://www.radix-ui.com/) - Accessible primitives
- [Swiper](https://swiperjs.com/) - Carousel library
- [Framer Motion](https://www.framer.com/motion/) - Animations

---

## 📞 Support

For questions or issues:
- Open an issue on GitHub
- Check existing documentation
- Review TMDB API docs

---

**Built with ❤️ using React, TypeScript, and Tailwind CSS**

---

## 📚 Comprehensive Developer Documentation

> **Note:** This section provides an in-depth technical analysis of the entire application architecture, components, and implementation details.

### 1. Project Overview

**Purpose:**
This is a full-featured Netflix clone—a streaming platform interface that allows users to browse, search, and explore movies and TV shows. The application fetches real-time data from The Movie Database (TMDB) API and presents it in a polished, Netflix-inspired UI.

**Main Features:**
- **Hero Carousel:** Auto-rotating featured content with backdrop images
- **Content Browsing:** Multiple sections (Trending, Popular, Top Rated, New Releases)
- **Live Search:** Real-time search with debounced input for movies, TV shows, and people
- **Detail Pages:** Comprehensive movie/TV show information with cast, trailers, reviews
- **TV Show Navigation:** Season and episode browsing with detailed information
- **Person Profiles:** Actor/director biographies with filmography
- **Multiple Card Variants:** 15+ card layouts (Standard, Compact, Top 10, Episode, etc.)
- **Responsive Design:** Mobile-first approach (320px to 1920px+)
- **Smooth Animations:** Framer Motion page transitions and hover effects
- **My List:** Watchlist functionality (placeholder for authentication)
- **Genre & Language Browsing:** Filter content by categories

---

### 2. Folder & File Structure

```
d:\Netflix\
├── public/                          # Static assets served at root
│   ├── robots.txt                   # Search engine crawling rules
│   ├── sitemap.xml                  # SEO sitemap
│   └── vite.svg                     # Favicon
│
├── scripts/                         # Build and utility scripts
│   └── generate-sitemap.js          # Sitemap generation script
│
├── src/                             # Main source code
│   ├── api/                         # TMDB API service functions (40 files)
│   │   ├── PopularMovies.ts         # Fetch popular movies
│   │   ├── PopularTvShows.ts        # Fetch popular TV shows
│   │   ├── TrendingMoviesDay.ts     # Daily trending movies
│   │   ├── TrendingMoviesWeek.ts    # Weekly trending movies
│   │   ├── TrendingTvDay.ts         # Daily trending TV
│   │   ├── TrendingTvWeek.ts        # Weekly trending TV
│   │   ├── MovieDetails.ts          # Single movie details
│   │   ├── TvShowDetails.ts         # Single TV show details
│   │   ├── TvSeasonDetails.ts       # Season details
│   │   ├── GetEpisodeDetails.ts     # Episode details
│   │   ├── PersonDetails.ts         # Person biography
│   │   ├── PersonCredits.ts         # Person filmography
│   │   ├── Search.ts                # Search functionality
│   │   ├── MovieCredits.ts          # Movie cast & crew
│   │   ├── MovieReviews.ts          # Movie reviews
│   │   ├── MovieRecommendations.ts  # Movie recommendations
│   │   ├── MovieSimilar.ts          # Similar movies
│   │   ├── MovieVideos.ts           # Movie trailers
│   │   ├── MovieImages.ts           # Movie images
│   │   ├── MovieWatchProviders.ts   # Streaming providers
│   │   ├── TVCredits.ts             # TV cast & crew
│   │   ├── TVReviews.ts             # TV reviews
│   │   ├── TVRecommendations.ts     # TV recommendations
│   │   ├── TVSimilar.ts             # Similar TV shows
│   │   ├── TVVideos.ts              # TV trailers
│   │   ├── TVImages.ts              # TV images
│   │   ├── TVWatchProviders.ts      # TV streaming providers
│   │   ├── NowPlayingMovies.ts      # Currently in theaters
│   │   ├── UpcomingMovies.ts        # Upcoming releases
│   │   ├── TopRatedMovies.ts        # Top rated movies
│   │   ├── TopRatedTvShows.ts       # Top rated TV shows
│   │   ├── AiringTodayTv.ts         # Airing today
│   │   ├── OnTheAirTv.ts            # Currently airing
│   │   ├── KidsMovies.ts            # Kids content
│   │   ├── MediaByLanguage.ts       # Browse by language
│   │   ├── PopularPeople.ts         # Popular actors
│   │   ├── PersonImages.ts          # Person photos
│   │   ├── StreamingPlatforms.ts    # Platform list
│   │   └── PersonCreditsExtended.ts # Extended credits
│   │
│   ├── components/                  # React components
│   │   ├── sections/                # Page section components (36 files)
│   │   │   ├── TopPicksSection.tsx           # Top 10 grid
│   │   │   ├── MoviePromo.tsx                # Featured promo
│   │   │   ├── NewReleasesSection.tsx        # New content
│   │   │   ├── OnlyOnNetflixSection.tsx      # Original content
│   │   │   ├── AwardWinnersSection.tsx       # Award winners
│   │   │   ├── GenreShowcaseSection.tsx      # Genre showcase
│   │   │   ├── BingeWorthySection.tsx        # TV recommendations
│   │   │   ├── WeekendWatchSection.tsx       # Weekend picks
│   │   │   ├── BecauseYouWatchedSection.tsx  # Personalized recs
│   │   │   ├── ContinueWatchingSection.tsx   # Progress tracking
│   │   │   ├── EpisodesSection.tsx           # Episode list
│   │   │   ├── FullCreditsSection.tsx        # Cast & crew
│   │   │   ├── TrailersSection.tsx           # Video gallery
│   │   │   ├── ReviewsSection.tsx            # User reviews
│   │   │   ├── MoreLikeThisSection.tsx       # Similar content
│   │   │   ├── WatchProvidersSection.tsx     # Streaming info
│   │   │   ├── KeywordsSection.tsx           # Tags/genres
│   │   │   ├── BiographySection.tsx          # Person bio
│   │   │   ├── KnownForSection.tsx           # Person highlights
│   │   │   ├── SocialLinksSection.tsx        # External links
│   │   │   ├── ProductionSection.tsx         # Studios/networks
│   │   │   ├── MediaInfoSection.tsx          # Metadata
│   │   │   ├── PricingSection.tsx            # Subscription tiers
│   │   │   ├── AskedQuestions.tsx            # FAQ accordion
│   │   │   ├── PlatformCard.tsx              # Platform card
│   │   │   ├── PlatformSkeleton.tsx          # Platform loader
│   │   │   ├── PlatformsSection.tsx          # Platforms grid
│   │   │   ├── CreditsSection.tsx            # Credits display
│   │   │   ├── FullCreditsDetail.tsx         # Detailed credits
│   │   │   ├── ImagesGallery.tsx             # Image gallery
│   │   │   ├── RecommendationsSection.tsx    # Recommendations
│   │   │   ├── VideosSection.tsx             # Video section
│   │   │   ├── WatchProvidersDetail.tsx      # Provider details
│   │   │   ├── BehindTheScenesSection.tsx    # BTS content
│   │   │   └── index.ts                      # Section exports
│   │   │
│   │   ├── shared/                  # Reusable shared components
│   │   │   ├── Card/                # Card component system
│   │   │   │   ├── Card.tsx                  # Main card component
│   │   │   │   ├── CardPoster.tsx            # Poster image
│   │   │   │   ├── CardHoverOverlay.tsx      # Hover overlay
│   │   │   │   ├── CardBadges.tsx            # Badges display
│   │   │   │   ├── CardMetadata.tsx          # Metadata display
│   │   │   │   └── CardVariantLayouts.tsx    # 15 variant layouts
│   │   │   │
│   │   │   ├── heroSection/         # Hero carousel
│   │   │   │   ├── HeroSection.tsx             # Main hero component
│   │   │   │   ├── HeroSlide.tsx               # Individual slide
│   │   │   │   ├── HeroBackground.tsx          # Backdrop layer
│   │   │   │   ├── HeroContent.tsx             # Content layer
│   │   │   │   └── ActionButtons.tsx           # CTA buttons
│   │   │   │
│   │   │   ├── Slider/              # Swiper carousel wrapper
│   │   │   │   └── slider.tsx                  # Slider component
│   │   │   │
│   │   │   ├── logo/                # Branding
│   │   │   │   └── Logo.tsx                    # Netflix logo
│   │   │   │
│   │   │   ├── SectionHeader/       # Section titles
│   │   │   │   └── SectionHeader.tsx           # Header component
│   │   │   │
│   │   │   ├── MediaSection.tsx     # Generic media section
│   │   │   ├── MediaHero.tsx        # Detail page hero
│   │   │   ├── PersonHero.tsx       # Person hero
│   │   │   ├── MovieModal.tsx       # Movie info modal
│   │   │   ├── SharedMovieModal.tsx # Shared modal instance
│   │   │   ├── TrailerModal.tsx     # YouTube trailer modal
│   │   │   ├── PageTransition.tsx   # Framer Motion transitions
│   │   │   ├── HelmetMeta.tsx       # SEO meta tags
│   │   │   ├── MediaGrid.tsx        # Media grid layout
│   │   │   ├── MediaGridSkeleton.tsx# Grid loader
│   │   │   ├── MovieCardsSection.tsx# Movie cards section
│   │   │   ├── MovieFilters.tsx     # Movie filter UI
│   │   │   ├── TVShowFilters.tsx    # TV filter UI
│   │   │   ├── NewPopularFilters.tsx# Filters for new/popular
│   │   │   ├── CircularGallery.tsx  # Circular image gallery
│   │   │   └── DetailPageNav.tsx    # Detail page navigation
│   │   │
│   │   ├── ui/                      # Base UI components (ShadCN)
│   │   │   ├── button.tsx                    # Button variants
│   │   │   ├── card.tsx                      # Card container
│   │   │   ├── checkbox.tsx                  # Checkbox input
│   │   │   ├── dialog.tsx                    # Modal dialog
│   │   │   ├── drawer.tsx                    # Slide-out drawer
│   │   │   ├── input.tsx                     # Text input
│   │   │   ├── label.tsx                     # Form label
│   │   │   ├── select.tsx                    # Dropdown select
│   │   │   ├── separator.tsx                 # Visual separator
│   │   │   ├── error.tsx                     # Error state
│   │   │   ├── loader.tsx                    # Loading spinner
│   │   │   ├── LoadingFallback.tsx           # Generic loader
│   │   │   ├── PageSkeleton.tsx              # Page loader
│   │   │   ├── SectionSkeleton.tsx           # Section loader
│   │   │   ├── OptimizedImage.tsx            # Image optimization
│   │   │   ├── lazy-wrapper.tsx              # Lazy loading wrapper
│   │   │   └── index.ts                      # UI exports
│   │   │
│   │   ├── Actors/                  # Actors browsing page
│   │   └── BrowseByLanguages/       # Language browsing page
│   │
│   ├── contexts/                    # React Context providers
│   │   └── MovieModalContext.tsx    # Modal state management
│   │
│   ├── data/                        # Static data files
│   │   └── header.ts                # Navigation link config
│   │
│   ├── layout/                      # Layout components
│   │   ├── header/                  # Header component
│   │   │   ├── Header.tsx                    # Main header
│   │   │   └── components/
│   │   │       ├── NavLinks.tsx              # Nav link component
│   │   │       ├── ProfileMenu.tsx           # User dropdown
│   │   │       ├── BrowseDropdown.tsx        # Mobile browse menu
│   │   │       ├── MobileSidebar.tsx         # Mobile drawer
│   │   │       └── search/
│   │   │           ├── SearchButton.tsx      # Search trigger
│   │   │           ├── SearchPopup.tsx       # Search modal
│   │   │           ├── SearchResultCard.tsx  # Search result item
│   │   │           └── index.ts
│   │   │
│   │   ├── footer/                  # Footer component
│   │   │   ├── Footer.tsx                    # Main footer
│   │   │   ├── FooterLink.tsx                # Footer link
│   │   │   └── index.ts
│   │   │
│   │   └── mainLayout/              # Main app layout
│   │       ├── MainLayout.tsx                # Layout wrapper
│   │       └── AuthLayout.tsx                # Auth pages layout
│   │
│   ├── pages/                       # Page components (35+ files)
│   │   ├── Home.tsx                 # Homepage
│   │   ├── Movie.tsx                # Movies browse
│   │   ├── TVShow.tsx               # TV shows browse
│   │   ├── Kids.tsx                 # Kids content
│   │   ├── NewPopular.tsx           # Trending content
│   │   ├── MyList.tsx               # User watchlist
│   │   ├── Actor.tsx                # Actors browse
│   │   ├── Session.tsx              # Session page
│   │   ├── BrowseByLanguages.tsx    # Language browse
│   │   ├── NotFound.tsx             # 404 page
│   │   │
│   │   ├── auth/                    # Authentication pages
│   │   │   ├── Login.tsx            # Login form
│   │   │   └── Signup.tsx           # Signup form
│   │   │
│   │   ├── movie/                   # Movie detail sub-pages
│   │   │   ├── MovieDetails.tsx     # Main movie page
│   │   │   ├── MovieReviewsPage.tsx # Reviews
│   │   │   ├── MovieVideosPage.tsx  # Videos
│   │   │   ├── MovieImagesPage.tsx  # Images
│   │   │   ├── MovieWatchProvidersPage.tsx  # Providers
│   │   │   ├── MovieCreditsPage.tsx # Credits
│   │   │   └── MovieRecommendationsPage.tsx # Recommendations
│   │   │
│   │   ├── tv/                      # TV detail sub-pages
│   │   │   ├── TVShowDetails.tsx    # Main TV page
│   │   │   ├── TVReviewsPage.tsx    # Reviews
│   │   │   ├── TVVideosPage.tsx     # Videos
│   │   │   ├── TVImagesPage.tsx     # Images
│   │   │   ├── TVWatchProvidersPage.tsx  # Providers
│   │   │   ├── TVCreditsPage.tsx    # Credits
│   │   │   └── TVRecommendationsPage.tsx # Recommendations
│   │   │
│   │   ├── person/                  # Person detail sub-pages
│   │   │   ├── PersonDetails.tsx    # Main person page
│   │   │   ├── PersonMovieCreditsPage.tsx  # Movie credits
│   │   │   ├── PersonTVCreditsPage.tsx     # TV credits
│   │   │   └── PersonImagesPage.tsx        # Images
│   │   │
│   │   ├── movies/                  # Movies list pages
│   │   │   └── NowPlayingMoviesPage.tsx     # Now playing
│   │   │
│   │   └── Footer Pages (14 files)
│   │       ├── FAQ.tsx, HelpCenter.tsx, Account.tsx
│   │       ├── MediaCenter.tsx, InvestorRelations.tsx, Jobs.tsx
│   │       ├── WaysToWatch.tsx, TermsOfUse.tsx, Privacy.tsx
│   │       ├── CookiePreferences.tsx, CorporateInformation.tsx
│   │       ├── ContactUs.tsx, SpeedTest.tsx, LegalNotices.tsx
│   │       └── OnlyOnNetflix.tsx
│   │
│   ├── providers/                   # App providers
│   │   └── Providers.tsx            # React Query + Router
│   │
│   ├── queries/                     # React Query hooks (41 files)
│   │   ├── FetchPopularMovies.tsx   # Popular movies query
│   │   ├── FetchTopRatedMovies.tsx  # Top rated query
│   │   ├── FetchNowPlayingMovies.tsx# Now playing query
│   │   ├── FetchUpcomingMovies.tsx  # Upcoming query
│   │   ├── FetchTrendingMoviesDay.tsx
│   │   ├── FetchTrendingMoviesWeek.tsx
│   │   ├── FetchPopularTvShows.tsx
│   │   ├── FetchTrendingTvDay.tsx
│   │   ├── FetchTrendingTvWeek.tsx
│   │   ├── FetchTopRatedTvShows.tsx
│   │   ├── FetchAiringTodayTv.tsx
│   │   ├── FetchOnTheAirTv.tsx
│   │   ├── FetchMovieDetails.tsx
│   │   ├── FetchTvShowDetails.tsx
│   │   ├── FetchTvSeasonDetails.tsx
│   │   ├── FetchEpisodeDetails.tsx
│   │   ├── FetchPersonDetails.tsx
│   │   ├── FetchPersonCredits.tsx
│   │   ├── FetchSearch.ts           # Search query
│   │   ├── FetchMovieCredits.ts
│   │   ├── FetchMovieReviews.ts
│   │   ├── FetchMovieRecommendations.ts
│   │   ├── FetchMovieSimilar.ts
│   │   ├── FetchMovieVideos.ts
│   │   ├── FetchMovieImages.ts
│   │   ├── FetchMovieWatchProviders.ts
│   │   ├── FetchTVCredits.ts
│   │   ├── FetchTVReviews.ts
│   │   ├── FetchTVRecommendations.ts
│   │   ├── FetchTVSimilar.ts
│   │   ├── FetchTVVideos.ts
│   │   ├── FetchTVImages.ts
│   │   ├── FetchTVWatchProviders.ts
│   │   ├── FetchPersonCreditsExtended.ts
│   │   ├── FetchPersonImages.ts
│   │   ├── FetchStreamingPlatforms.tsx
│   │   ├── FetchKidsMovies.tsx
│   │   ├── FetchMediaByLanguage.tsx
│   │   ├── FetchPopularPeople.tsx
│   │   └── index.ts                 # Query exports
│   │
│   ├── routes/                      # Routing configuration
│   │   └── Routes.tsx               # React Router setup
│   │
│   ├── store/                       # Redux store (empty, optional)
│   │
│   ├── types/                       # TypeScript type definitions
│   │   ├── movies.ts                # Movie & TV types
│   │   ├── movieDetails.ts          # Detailed movie types
│   │   ├── mediaDetails.ts          # Media union types
│   │   ├── person.ts                # Person types
│   │   ├── hero.ts                  # Hero section types
│   │   ├── header.ts                # Header types
│   │   ├── footer.ts                # Footer types
│   │   ├── logo.ts                  # Logo types
│   │   └── index.ts                 # Type exports
│   │
│   ├── utils/                       # Utility functions
│   │   ├── movieHelpers.ts          # Movie data helpers
│   │   ├── slugify.ts               # Slug generation
│   │   └── tmdb.ts                  # TMDB image helpers
│   │
│   ├── lib/                         # Core utilities
│   │   └── utils.ts                 # className merger (cn)
│   │
│   ├── hooks/                       # Custom hooks (empty, extendable)
│   ├── assets/                      # Static assets
│   ├── styles/                      # Additional styles
│   │   └── animations.css           # Custom animations
│   │
│   ├── App.tsx                      # Root component
│   ├── App.css                      # App styles
│   ├── main.tsx                     # Entry point
│   ├── index.css                    # Global styles & CSS vars
│   └── vite-env.d.ts                # Vite type declarations
│
├── tests/                           # Test files
│   └── example.spec.ts              # Playwright example
│
├── .gitignore                       # Git ignore rules
├── .env.example                     # Environment template (create this)
├── components.json                  # ShadCN config
├── eslint.config.js                 # ESLint configuration
├── package.json                     # Dependencies & scripts
├── playwright.config.ts             # Playwright config
├── tsconfig.json                    # TypeScript config
├── tsconfig.app.json                # App TypeScript config
├── tsconfig.node.json               # Node TypeScript config
├── vercel.json                      # Vercel deployment config
├── vite.config.ts                   # Vite build config
└── vitest.config.ts                 # Vitest test config
```

---

### 3. Components Deep Dive

#### 3.1 Card Component System (`src/components/shared/Card/`)

The Card component is the core building block with **15 variants**:

| Variant | Usage | Props |
|---------|-------|-------|
| `standard` | Default card with hover overlay | `movie`, `showBadge` |
| `compact` | Dense grids, minimal metadata | `movie` |
| `top10` | Top 10 rankings with gradient badge | `movie`, `rank` |
| `newRelease` | New content with date badge | `movie` |
| `awardWinner` | Award winners with gold border | `movie` |
| `recommendation` | "Because You Watched" section | `movie` |
| `episode` | TV episode cards | `episode`, `tvShowId` |
| `person` | Actor/director cards | `person` |
| `review` | User review cards | `review` |
| `season` | TV season cards | `season`, `tvShowId` |
| `trailer` | Video trailer cards | `trailer` |
| `promo` | Large promotional cards | `movie`, `promoVariant` |
| `continueWatching` | Progress tracking cards | `movie`, `progress` |
| `showcase` | Featured content showcase | `movie`, `aspectRatio` |
| `horizontal` | Horizontal layout cards | `movie`, `plainLayout` |
| `landscape` | Landscape orientation | `movie`, `isHot` |

**Example Usage:**
```tsx
// Standard card
<Card movie={movieData} variant="standard" showBadge />

// Top 10 with rank
<Card movie={movie} variant="top10" rank={1} />

// Episode card
<Card episode={episode} variant="episode" tvShowId={showId} seasonNumber={1} />
```

**Sub-components:**
- `CardPoster.tsx` - Poster image with lazy loading
- `CardHoverOverlay.tsx` - Play/More Info buttons on hover
- `CardBadges.tsx` - Match score, trending badges
- `CardMetadata.tsx` - Year, age rating, match score
- `CardVariantLayouts.tsx` - All 15 variant layout components

#### 3.2 Hero Section (`src/components/shared/heroSection/`)

Auto-rotating carousel featuring trending content:

```tsx
<HeroSection
  data={heroData}
  isLoading={false}
  error={null}
  onRetry={() => refetch()}
/>
```

**Features:**
- 8-second auto-rotation with fade transitions
- Full-width backdrop with gradient overlays
- Play and More Info action buttons
- Responsive content positioning
- Built with Swiper.js fade effect

**Sub-components:**
- `HeroSlide.tsx` - Individual slide with backdrop
- `HeroBackground.tsx` - Background image layer
- `HeroContent.tsx` - Title, overview, buttons
- `ActionButtons.tsx` - Play/More Info CTAs

#### 3.3 Slider Component (`src/components/shared/Slider/`)

Swiper-based carousel wrapper:

```tsx
<Slider
  slidesPerView={4}
  slidesPerViewMobile={1}
  spaceBetween={20}
  useFadeEffect={false}
  hideNavigation={true}
>
  {items.map(item => <Card movie={item} />)}
</Slider>
```

**Features:**
- Responsive breakpoints (mobile, tablet, desktop)
- Autoplay (4s delay, infinite loop)
- Navigation arrows (optional)
- Fade or slide effects
- Pagination support
- Touch-friendly swipe

**Modules Used:**
- `Pagination` - Dot indicators
- `Autoplay` - Auto-rotation
- `Navigation` - Prev/Next arrows
- `EffectFade` - Cross-fade transitions

#### 3.4 UI Components (ShadCN)

Located in `src/components/ui/`:

| Component | Description |
|-----------|-------------|
| `Button` | 5 variants (default, destructive, outline, ghost, link) |
| `Dialog` | Accessible modal dialogs (Radix UI) |
| `Drawer` | Mobile slide-out panels (Vaul) |
| `Input` | Text input with label support |
| `Select` | Dropdown select menus |
| `Checkbox` | Checkbox with label |
| `Separator` | Visual divider |
| `Card` | Card container with header/content/footer |
| `Error` | Error state with retry button |
| `Loader` | Loading spinner |
| `LoadingFallback` | Generic loading skeleton |
| `PageSkeleton` | Full page loading state |
| `SectionSkeleton` | Section loading state |
| `OptimizedImage` | Lazy/eager image loading |
| `lazy-wrapper` | Lazy loading HOC wrapper |

#### 3.5 Section Components (36 files)

**Homepage Sections:**
- `TopPicksSection` - Top 10 grid layout
- `MoviePromo` - Large promotional showcase
- `NewReleasesSection` - New content with dates
- `OnlyOnNetflixSection` - Netflix Originals
- `AwardWinnersSection` - Award-winning titles
- `GenreShowcaseSection` - Genre collections
- `BingeWorthySection` - TV show recommendations
- `WeekendWatchSection` - Weekend picks

**Detail Page Sections:**
- `EpisodesSection` - TV episode browser
- `FullCreditsSection` / `FullCreditsDetail` - Cast and crew
- `TrailersSection` / `VideosSection` - Video gallery
- `ReviewsSection` - User reviews with ratings
- `MoreLikeThisSection` - Similar content
- `WatchProvidersSection` / `WatchProvidersDetail` - Streaming info
- `KeywordsSection` - Tags/genres
- `BiographySection` - Person biography
- `KnownForSection` - Person filmography highlights
- `SocialLinksSection` - External social media
- `ProductionSection` - Studios/networks
- `MediaInfoSection` - Runtime, release date, etc.
- `CreditsSection` - Simplified credits
- `ImagesGallery` / `CircularGallery` - Image displays
- `RecommendationsSection` - Recommended titles

**Interactive Sections:**
- `ContinueWatchingSection` - User progress tracking
- `BecauseYouWatchedSection` - Personalized recommendations

**Landing Page Sections:**
- `PricingSection` - Subscription tier cards
- `AskedQuestions` - FAQ accordion
- `PlatformCard` / `PlatformSkeleton` / `PlatformsSection` - Device support

---

### 4. Pages & Routing

#### 4.1 Route Configuration (`src/routes/Routes.tsx`)

All routes use **React Router DOM v7** with lazy loading and Framer Motion transitions.

**Main Routes:**

| Path | Component | Description |
|------|-----------|-------------|
| `/` | `Home` | Homepage with hero and sections |
| `/movies` | `Movie` | Movies browse page |
| `/tv-shows` | `TVShow` | TV shows browse page |
| `/kids` | `Kids` | Kids content |
| `/new-popular` | `NewPopular` | Trending content |
| `/my-list` | `MyList` | User watchlist |
| `/browse/languages` | `BrowseByLanguages` | Language filter |
| `/actors` | `Actor` | Popular actors |
| `/now-playing` | `NowPlayingMoviesPage` | In theaters |

**Detail Routes:**

| Path | Component | Description |
|------|-----------|-------------|
| `/movie/:slugWithId` | `MovieDetails` | Movie detail page |
| `/movie/:slugWithId/reviews` | `MovieReviewsPage` | Movie reviews |
| `/movie/:slugWithId/videos` | `MovieVideosPage` | Movie trailers |
| `/movie/:slugWithId/images` | `MovieImagesPage` | Movie images |
| `/movie/:slugWithId/watch` | `MovieWatchProvidersPage` | Streaming info |
| `/movie/:slugWithId/credits` | `MovieCreditsPage` | Cast & crew |
| `/movie/:slugWithId/recommendations` | `MovieRecommendationsPage` | Similar movies |
| `/tv/:slugWithId` | `TVShowDetailsPage` | TV show detail |
| `/tv/:slugWithId/reviews` | `TVReviewsPage` | TV reviews |
| `/tv/:slugWithId/videos` | `TVVideosPage` | TV trailers |
| `/tv/:slugWithId/images` | `TVImagesPage` | TV images |
| `/tv/:slugWithId/watch` | `TVWatchProvidersPage` | TV streaming |
| `/tv/:slugWithId/credits` | `TVCreditsPage` | TV cast & crew |
| `/tv/:slugWithId/recommendations` | `TVRecommendationsPage` | Similar TV |
| `/person/:slugWithId` | `PersonDetailsPage` | Person profile |
| `/person/:slugWithId/movies` | `PersonMovieCreditsPage` | Person movies |
| `/person/:slugWithId/tv` | `PersonTVCreditsPage` | Person TV shows |
| `/person/:slugWithId/images` | `PersonImagesPage` | Person photos |

**Auth Routes:**
| Path | Component |
|------|-----------|
| `/login` | `Login` |
| `/signup` | `Signup` |

**Footer Routes:**
`/faq`, `/help-center`, `/account`, `/media-center`, `/investor-relations`, `/jobs`, `/ways-to-watch`, `/terms-of-use`, `/privacy`, `/cookie-preferences`, `/corporate-information`, `/contact-us`, `/speed-test`, `/legal-notices`, `/only-on-netflix`

**404 Route:**
| Path | Component |
|------|-----------|
| `*` | `NotFound` |

#### 4.2 Dynamic Routing

**Slug Format:** URLs use Netflix-style slugs with IDs:
```
/movie/spider-man-no-way-home-634649
/tv/stranger-things-66732
/person/ryan-reynolds-10859
```

**Slug Utilities:**
```typescript
// Generate slug from title
generateSlug("Spider-Man: No Way Home") 
// → "spider-man-no-way-home"

// Combine slug with ID
formatSlugWithId("spider-man-no-way-home", 634649)
// → "spider-man-no-way-home-634649"

// Extract ID from URL
extractIdFromSlug("spider-man-no-way-home-634649")
// → "634649"
```

#### 4.3 Page Transitions

All pages use Framer Motion for smooth transitions:

```tsx
<motion.div
  initial={{ opacity: 0, x: -50 }}
  animate={{ opacity: 1, x: 0 }}
  exit={{ opacity: 0, x: 50 }}
  transition={{ duration: 0.5 }}
>
  {/* Page content */}
</motion.div>
```

**PageTransition Component:**
```tsx
<Route
  path="/"
  element={
    <PageTransition>
      <Home />
    </PageTransition>
  }
/>
```

---

### 5. State Management

#### 5.1 Server State (TanStack React Query)

**Configuration (`src/providers/Providers.tsx`):**
```typescript
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});
```

**Query Hook Pattern:**
```typescript
// src/queries/FetchPopularMovies.tsx
export default function usePopularMovies() {
  const { data, error, refetch, isLoading } = useQuery<Movie[]>({
    queryKey: ["PopularMovies"],
    queryFn: () => GetPopularMovies() as Promise<Movie[]>,
    staleTime: 5 * 60 * 1000,
    retry: 2,
  });

  return { data, error, refetch, isLoading };
}
```

**Available Query Hooks (41 total):**

**Movies:**
- `usePopularMovies()` - Popular movies
- `useTopRatedMovies()` - Top rated
- `useNowPlayingMovies()` - In theaters
- `useUpcomingMovies()` - Upcoming
- `useTrendingMoviesDay()` - Daily trending
- `useTrendingMoviesWeek()` - Weekly trending

**TV Shows:**
- `usePopularTvShows()` - Popular TV
- `useTopRatedTvShows()` - Top rated TV
- `useAiringTodayTv()` - Airing today
- `useOnTheAirTv()` - Currently airing
- `useTrendingTvDay()` - Daily trending TV
- `useTrendingTvWeek()` - Weekly trending TV

**Details:**
- `FetchMovieDetails()` - Movie details
- `FetchTvShowDetails()` - TV show details
- `FetchTvSeasonDetails()` - Season details
- `FetchEpisodeDetails()` - Episode details
- `FetchPersonDetails()` - Person details
- `FetchPersonCredits()` - Person filmography

**Sub-pages:**
- `useMovieCredits()`, `useMovieReviews()`, `useMovieRecommendations()`
- `useMovieSimilar()`, `useMovieVideos()`, `useMovieImages()`
- `useMovieWatchProviders()`, `useTVCredits()`, `useTVReviews()`
- `useTVRecommendations()`, `useTVSimilar()`, `useTVVideos()`
- `useTVImages()`, `useTVWatchProviders()`
- `usePersonMovieCredits()`, `usePersonTVCredits()`, `usePersonImages()`

**Other:**
- `useSearch()` - Search functionality
- `useStreamingPlatforms()` - Platform list
- `FetchKidsMovies()` - Kids content
- `FetchMediaByLanguage()` - Language browse
- `FetchPopularPeople()` - Popular actors

#### 5.2 Client State (Context API)

**MovieModalContext (`src/contexts/MovieModalContext.tsx`):**
```typescript
interface MovieModalContextType {
  selectedMovie: HeroMedia | null;
  isOpen: boolean;
  openModal: (movie: HeroMedia) => void;
  closeModal: () => void;
}
```

**Usage:**
```tsx
const { openModal, closeModal, selectedMovie, isOpen } = useMovieModal();

// Open modal
openModal(movieData);

// Close modal
closeModal();
```

#### 5.3 Local Component State

```typescript
// Hover states
const [isHovered, setIsHovered] = useState(false);

// Modal states
const [isModalOpen, setIsModalOpen] = useState(false);

// Search input
const [query, setQuery] = useState("");

// Menu states
const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
const [isBrowseMenuOpen, setIsBrowseMenuOpen] = useState(false);

// Image loading
const [imageLoaded, setImageLoaded] = useState(false);
```

#### 5.4 Redux Store

**Status:** Installed but **not currently used**. The `src/store/` directory is empty and available for future implementation of:
- User authentication
- Viewing history
- My List persistence
- User preferences

---

### 6. API Integration

#### 6.1 Configuration

**Base URLs:**
```typescript
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p";
```

**API Key:**
```typescript
const apiKey = import.meta.env.VITE_TMDB_API_KEY || "fallback_key";
```

> **Note:** A fallback API key is included for development, but you should use your own key from [TMDB](https://www.themoviedb.org/settings/api).

#### 6.2 API Service Layer

**Pattern:**
```typescript
// src/api/PopularMovies.ts
export const GetPopularMovies = async (page: number = 1): Promise<Movie[] | null> => {
  try {
    const response = await axios.get<PopularMoviesResponse>(
      `${BASE_URL}/movie/popular`,
      {
        params: {
          api_key: apiKey,
          language: "en-US",
          page,
          include_adult: false,
        },
      }
    );
    return response.data.results;
  } catch (error) {
    console.error("Error fetching popular movies:", error);
    return null;
  }
};
```

#### 6.3 Data Flow

```
Component → React Query Hook → API Service → TMDB API
     ↓                                        ↓
  Render                              JSON Response
     ↓                                        ↓
  Cache ← ← ← ← ← ← ← ← ← ← ← ← ← ← ← ← ← ← ← ←
```

**Example:**
```tsx
// Component
const { data, isLoading, error } = usePopularMovies();

// Query Hook
useQuery({
  queryKey: ["PopularMovies"],
  queryFn: () => GetPopularMovies(),
});

// API Service
axios.get("/movie/popular", { params: { api_key, page } });

// Response
{ page, results: [...], total_pages, total_results }
```

#### 6.4 Image URLs

**Helper Functions (`src/utils/tmdb.ts`):**
```typescript
getPosterUrl(path, size = "w500")
getBackdropUrl(path, size = "w780")
getProfileUrl(path, size = "w185")
```

**Available Sizes:**
| Type | Sizes |
|------|-------|
| Posters | w92, w154, w185, w342, w500, w780, original |
| Backdrops | w300, w780, w1280, original |
| Profiles | w45, w185, h632, original |
| Stills | w185, w300, w500, original |

#### 6.5 Error Handling

**React Query Retry:**
```typescript
useQuery({
  retry: 2, // Retry 2 times before failing
  retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
});
```

**Error Component:**
```tsx
{error && (
  <Error
    retryButtonText="Try Again"
    onRetry={() => refetch()}
  />
)}
```

#### 6.6 Caching Strategy

| Query Type | Stale Time | Retry |
|------------|------------|-------|
| Popular/Trending | 5 min | 2 |
| Details | 5 min | 1 |
| Search | 2 min | 1 |
| Images | 10 min | 1 |

---

### 7. Performance Optimization

#### 7.1 Code Splitting

**Route-based Splitting:**
```typescript
const MovieDetails = lazy(() => import("@/pages/MovieDetails"));

<Suspense fallback={<PageSkeleton />}>
  <MovieDetails />
</Suspense>
```

**Manual Chunks (vite.config.ts):**
```typescript
manualChunks: {
  'react-vendor': ['react', 'react-dom', 'react-router-dom'],
  'animation-vendor': ['framer-motion'],
  'ui-vendor': ['radix-ui', 'lucide-react'],
  'data-vendor': ['@tanstack/react-query', 'axios'],
  'swiper-vendor': ['swiper'],
  'page-home': ['./src/pages/Home.tsx'],
  'page-details': ['./src/pages/MovieDetails.tsx'],
}
```

**Lazy Footer:**
```typescript
const Footer = lazy(() => import("../footer"));
<Suspense fallback={null}>
  <Footer />
</Suspense>
```

#### 7.2 Image Optimization

**OptimizedImage Component:**
```tsx
<OptimizedImage
  src={posterUrl}
  alt={title}
  loading="lazy"      // Lazy load below-fold
  loading="eager"     // Eager load hero images
  objectFit="cover"
/>
```

**Build-time Optimization (vite-plugin-imagemin):**
```typescript
viteImagemin({
  mozjpeg: { quality: 75, progressive: true },
  optipng: { optimizationLevel: 5 },
  pngquant: { quality: [0.65, 0.8], speed: 4 },
  svgo: { plugins: [...] },
})
```

#### 7.3 Memoization

**Component Memo:**
```typescript
const Card = memo(({ movie, variant }) => {
  // Component logic
});
```

**Memoized Values:**
```typescript
const posterUrl = useMemo(() => {
  return movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "placeholder";
}, [movie.poster_path]);

const matchScore = useMemo(
  () => getMatchScore(movie.vote_average),
  [movie.vote_average]
);
```

**Memoized Callbacks:**
```typescript
const handleNavigate = useCallback(() => {
  if (onClick) onClick();
  else navigate(detailsUrl);
}, [onClick, navigate, detailsUrl]);
```

#### 7.4 Debounced Search

**Search Implementation:**
```typescript
const [query, setQuery] = useState("");
const debouncedQuery = useDebounce(query, 300); // 300ms delay

useEffect(() => {
  if (debouncedQuery) {
    searchQuery(debouncedQuery);
  }
}, [debouncedQuery]);
```

#### 7.5 Scroll Optimization

**Throttled Scroll Handler:**
```typescript
useEffect(() => {
  let ticking = false;
  const handleScroll = () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        setIsScrolled(window.scrollY > 10);
        ticking = false;
      });
      ticking = true;
    }
  };
  window.addEventListener("scroll", handleScroll, { passive: true });
}, []);
```

#### 7.6 Bundle Analysis

**Build Output:**
```
Total Build Size: ~650 KB (gzipped: ~180 KB)
├── Main chunk: 540 KB (gzipped: 176 KB)
├── Slider chunk: 103 KB (gzipped: 32 KB)
├── CSS: 103 KB (gzipped: 15 KB)
└── Assets: Various
```

**Visualization:**
Run `npm run build` and open `dist/stats.html` to view bundle treemap.

#### 7.7 Suggested Improvements

1. **Replace Swiper with Embla** - Smaller bundle (~10KB vs 100KB)
2. **Implement Virtual Scrolling** - Use `react-window` for large lists
3. **Prefetch Critical Routes** - Prefetch detail pages on hover
4. **Service Worker** - Add offline support with Workbox
5. **Image CDN** - Use TMDB's CDN with responsive images
6. **GraphQL** - Consider GraphQL for efficient data fetching

---

### 8. UI/UX Features

#### 8.1 Accessibility

**ARIA Labels:**
```tsx
<button aria-label="Notifications">
  <Bell className="w-5 h-5" />
</button>

<button aria-label="Previous slide">
  <ChevronLeft />
</button>
```

**Screen Reader Only:**
```tsx
<span className="sr-only">Play</span>
<span className="sr-only">More info</span>
```

**Keyboard Navigation:**
- Tab through all interactive elements
- Enter/Space to activate buttons
- ESC to close modals/drawers
- Arrow keys for slider navigation

**Focus Management:**
```tsx
focus:outline-none
focus:ring-2
focus:ring-white/50
```

#### 8.2 Animations

**Framer Motion Page Transitions:**
```tsx
<motion.div
  initial={{ opacity: 0, x: -50 }}
  animate={{ opacity: 1, x: 0 }}
  exit={{ opacity: 0, x: 50 }}
  transition={{ duration: 0.5 }}
>
```

**Card Hover Effects:**
```tsx
<motion.div
  whileHover={{ scale: 1.05 }}
  transition={{ duration: 0.3 }}
>
```

**Custom CSS Animations (`src/styles/animations.css`):**
- Fade in/out
- Slide up/down
- Pulse loading
- Spin rotation

#### 8.3 Responsive Design

**Breakpoints:**
```
Mobile:    320px - 639px   (sm)
Tablet:    640px - 767px   (md)
Desktop:   768px - 1023px  (lg)
Large:     1024px+         (xl)
```

**Responsive Utilities:**
```tsx
// Text sizing
className="text-sm md:text-base lg:text-lg"

// Grid columns
className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6"

// Visibility
className="hidden md:block"    // Hide on mobile
className="md:hidden"          // Hide on desktop

// Spacing
className="px-4 md:px-12 lg:px-16"
```

**Mobile-First Components:**
- Header → Hamburger menu on mobile
- Hero → Adjusted text positioning
- Cards → 2 columns on mobile, 6 on desktop
- Footer → 2 columns on mobile, 4 on desktop

#### 8.4 Theme System

**CSS Custom Properties:**
```css
:root {
  /* Netflix Red */
  --netflix-red: #e50914;
  --netflix-red-hover: #f40612;
  --netflix-red-dark: #b20710;

  /* Backgrounds */
  --background-primary: #141414;
  --background-secondary: #181818;
  --background-tertiary: #1f1f1f;

  /* Text */
  --text-primary: #ffffff;
  --text-secondary: #b3b3b3;
  --text-muted: #808080;

  /* Interactive */
  --hover-overlay: rgba(255, 255, 255, 0.1);
  --focus-ring: rgba(229, 9, 20, 0.4);

  /* Status */
  --success: #46d369;
  --warning: #f5c518;
  --error: #e50914;
}
```

**Usage:**
```tsx
className="bg-[var(--background-primary)]"
className="text-[var(--text-primary)]"
className="border-[var(--netflix-red)]"
```

#### 8.5 Loading States

**Skeleton Loaders:**
```tsx
<PageSkeleton />      // Full page loader
<SectionSkeleton />   // Section loader
<MediaGridSkeleton /> // Grid loader
```

**Spinner:**
```tsx
<Loader />
```

**Lazy Loading:**
```tsx
<LazyWrapper height={350}>
  <Card movie={movie} />
</LazyWrapper>
```

---

### 9. Libraries & Dependencies

#### 9.1 Core Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| `react` | 19.2.0 | UI library |
| `react-dom` | 19.2.0 | React DOM renderer |
| `react-router-dom` | 7.13.1 | Client-side routing |
| `typescript` | 5.9.3 | Type safety |

#### 9.2 State Management

| Package | Version | Purpose |
|---------|---------|---------|
| `@tanstack/react-query` | 5.90.21 | Server state management |
| `@tanstack/react-query-devtools` | 5.91.3 | Query debugging |
| `@reduxjs/toolkit` | 2.11.2 | Redux (optional) |
| `react-redux` | 9.2.0 | Redux bindings |

#### 9.3 Styling

| Package | Version | Purpose |
|---------|---------|---------|
| `tailwindcss` | 4.2.1 | Utility-first CSS |
| `@tailwindcss/vite` | 4.2.1 | Tailwind Vite plugin |
| `tw-animate-css` | 1.4.0 | Tailwind animations |
| `class-variance-authority` | 0.7.1 | Component variants |
| `tailwind-merge` | 3.5.0 | ClassName merger |
| `clsx` | 2.1.1 | ClassName utility |

#### 9.4 UI Components

| Package | Version | Purpose |
|---------|---------|---------|
| `radix-ui` | 1.4.3 | Accessible primitives |
| `lucide-react` | 0.575.0 | Icon library |
| `vaul` | 1.1.2 | Drawer component |
| `shadcn` | 3.8.5 | Component patterns |

#### 9.5 Animation

| Package | Version | Purpose |
|---------|---------|---------|
| `framer-motion` | 12.34.3 | Page/component animations |

#### 9.6 Data Fetching

| Package | Version | Purpose |
|---------|---------|---------|
| `axios` | 1.13.6 | HTTP client |

#### 9.7 Carousel

| Package | Version | Purpose |
|---------|---------|---------|
| `swiper` | 12.1.2 | Slider/carousel |

#### 9.8 Forms

| Package | Version | Purpose |
|---------|---------|---------|
| `react-hook-form` | 7.71.2 | Form handling |

#### 9.9 SEO

| Package | Version | Purpose |
|---------|---------|---------|
| `react-helmet` | 6.1.0 | Meta tag management |
| `@types/react-helmet` | 6.1.11 | Helmet types |

#### 9.10 Utilities

| Package | Version | Purpose |
|---------|---------|---------|
| `ogl` | 1.0.11 | 3D graphics (optional) |

#### 9.11 Build Tools

| Package | Version | Purpose |
|---------|---------|---------|
| `vite` | 7.3.1 | Build tool & dev server |
| `@vitejs/plugin-react` | 5.1.1 | React plugin |
| `terser` | 5.46.0 | JS minification |
| `vite-plugin-imagemin` | - | Image optimization |
| `rollup-plugin-visualizer` | 7.0.1 | Bundle visualization |

#### 9.12 Testing

| Package | Version | Purpose |
|---------|---------|---------|
| `vitest` | 4.0.18 | Unit testing |
| `@testing-library/react` | 16.3.2 | Component testing |
| `@testing-library/jest-dom` | 6.9.1 | Jest matchers |
| `@playwright/test` | 1.58.2 | E2E testing |
| `jsdom` | 28.1.0 | DOM environment |

#### 9.13 Linting

| Package | Version | Purpose |
|---------|---------|---------|
| `eslint` | 9.39.1 | Code linting |
| `eslint-plugin-react-hooks` | 7.0.1 | Hooks lint rules |
| `eslint-plugin-react-refresh` | 0.4.24 | Vite refresh |
| `typescript-eslint` | 8.48.0 | TS lint rules |

#### 9.14 Image Optimization (dev)

| Package | Purpose |
|---------|---------|
| `imagemin` | Image compression |
| `imagemin-gifsicle` | GIF optimization |
| `imagemin-mozjpeg` | JPEG optimization |
| `imagemin-pngquant` | PNG quantization |
| `imagemin-svgo` | SVG optimization |

---

### 10. Known Issues & Warnings

#### 10.1 Current Issues

1. **Empty Store Directory**
   - Redux Toolkit is installed but not implemented
   - `src/store/` is empty
   - **Impact:** None (optional feature)

2. **Empty Hooks Directory**
   - `src/hooks/` is empty
   - Custom hooks could be extracted from components
   - **Suggestion:** Add `useDebounce`, `useOnClickOutside`, `useScrollPosition`

3. **Missing .env.example**
   - No template for environment variables
   - **Fix:** Create `.env.example` with:
     ```env
     VITE_TMDB_API_KEY=your_api_key_here
     VITE_TMDB_BASE_URL=https://api.themoviedb.org/3
     VITE_TMDB_IMAGE_BASE_URL=https://image.tmdb.org/t/p
     ```

4. **Fallback API Key**
   - Hardcoded API key in source files
   - **Security Risk:** Should use environment variables only
   - **Fix:** Remove fallback and require `.env` file

5. **Test Coverage**
   - Only 1 example Playwright test
   - No component tests
   - **Suggestion:** Add Vitest tests for critical components

#### 10.2 Console Warnings

Potential warnings to watch for:

1. **React Keys:**
   ```
   Warning: Each child in a list should have a unique "key" prop
   ```
   - Ensure all mapped arrays have unique keys

2. **Missing Alt Text:**
   ```
   Warning: img elements must have alt prop
   ```
   - All images include alt text via OptimizedImage

3. **useEffect Dependencies:**
   ```
   Warning: React Hook useEffect has missing dependencies
   ```
   - ESLint catches these during development

#### 10.3 Performance Considerations

1. **Large Bundle Size:**
   - Swiper.js adds ~100KB
   - **Suggestion:** Consider Embla Carousel (10KB)

2. **Image Loading:**
   - Multiple images per page (20-50)
   - **Mitigation:** Lazy loading, proper sizes

3. **Re-renders:**
   - Card components re-render on hover
   - **Mitigation:** Memoization implemented

4. **API Rate Limits:**
   - TMDB has rate limits (~40 requests/10s)
   - **Mitigation:** React Query caching

#### 10.4 Accessibility Alerts

1. **Color Contrast:**
   - Some gray text may fail WCAG AA
   - **Check:** Use contrast checker tools

2. **Focus Indicators:**
   - Custom focus rings implemented
   - **Verify:** Test keyboard navigation

3. **Screen Reader Testing:**
   - ARIA labels added
   - **Verify:** Test with NVDA/JAWS

---

### 11. Getting Started

#### 11.1 Prerequisites

- **Node.js:** 18+ (recommended: 20+)
- **npm/yarn/pnpm:** Latest version
- **Git:** For version control

#### 11.2 Installation Steps

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd Netflix
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create environment file:**
   ```bash
   # Create .env file
   echo "VITE_TMDB_API_KEY=your_key_here" > .env
   ```

4. **Get TMDB API Key:**
   - Visit [TMDB](https://www.themoviedb.org/)
   - Create account → Settings → API → Create Key
   - Copy key to `.env`

5. **Start development server:**
   ```bash
   npm run dev
   ```

6. **Open in browser:**
   ```
   http://localhost:5173
   ```

#### 11.3 Build for Production

```bash
# Build
npm run build

# Preview production build
npm run preview
```

**Build Output:**
- Directory: `dist/`
- Optimized assets in `dist/assets/`
- Bundle stats in `dist/stats.html`

#### 11.4 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server (Vite) |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |
| `npm run test` | Run Vitest tests |
| `npm run test:ui` | Run tests with UI |
| `npm run test:e2e` | Run Playwright E2E |
| `npm run sitemap` | Generate sitemap |

#### 11.5 Deployment

**Vercel:**
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

**Manual Deploy:**
```bash
npm run build
# Upload dist/ folder to hosting
```

**Environment Variables (Production):**
- Set `VITE_TMDB_API_KEY` in hosting platform
- Configure rewrite rules for SPA routing

---

### 12. Contributing Guidelines

#### 12.1 Development Workflow

1. **Fork the repository**
2. **Create a feature branch:**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make your changes**
4. **Test locally:**
   ```bash
   npm run dev
   npm run lint
   npm run test
   ```

5. **Commit with conventional commits:**
   ```bash
   git commit -m "feat: add new feature"
   git commit -m "fix: resolve bug"
   git commit -m "docs: update README"
   ```

6. **Push and create PR:**
   ```bash
   git push origin feature/your-feature-name
   ```

#### 12.2 Commit Convention

Follow [Conventional Commits](https://www.conventionalcommits.org/):

| Type | Description |
|------|-------------|
| `feat:` | New feature |
| `fix:` | Bug fix |
| `docs:` | Documentation |
| `style:` | Formatting |
| `refactor:` | Code refactoring |
| `test:` | Tests |
| `chore:` | Maintenance |

#### 12.3 Code Style

- **TypeScript:** All new code must be typed
- **Prettier:** Auto-format on save
- **ESLint:** No errors or warnings
- **Naming:** PascalCase for components, camelCase for functions

#### 12.4 Component Guidelines

1. **Use TypeScript interfaces** for props
2. **Memoize** heavy components
3. **Lazy load** below-fold content
4. **Add ARIA labels** for accessibility
5. **Test responsive** at all breakpoints
6. **Follow Netflix design** (colors, spacing)

**Example:**
```tsx
interface CardProps {
  movie: Movie;
  variant?: CardVariant;
  showBadge?: boolean;
}

const Card = memo(({ movie, variant = "standard" }: CardProps) => {
  // Component logic
});
```

#### 12.5 Testing Requirements

- **Unit Tests:** Vitest for utilities
- **Component Tests:** React Testing Library
- **E2E Tests:** Playwright for critical flows

**Example:**
```typescript
// Component test
describe("Card", () => {
  it("renders movie title", () => {
    render(<Card movie={mockMovie} />);
    expect(screen.getByText("Movie Title")).toBeInTheDocument();
  });
});
```

#### 12.6 Documentation

- Update README for new features
- Add JSDoc comments for complex functions
- Document API endpoints in `API_ENDPOINTS.md`
- Include usage examples

#### 12.7 Pull Request Checklist

- [ ] Code follows style guidelines
- [ ] TypeScript compiles without errors
- [ ] ESLint passes
- [ ] Tests pass
- [ ] Responsive on all devices
- [ ] Accessibility checked
- [ ] Documentation updated
- [ ] No console errors/warnings

---

### 13. Additional Resources

- **[TMDB API Documentation](https://developers.themoviedb.org/3)**
- **[React Documentation](https://react.dev/)**
- **[TanStack Query Docs](https://tanstack.com/query/latest)**
- **[Tailwind CSS Docs](https://tailwindcss.com/docs)**
- **[Framer Motion Docs](https://www.framer.com/motion/)**
- **[ShadCN UI](https://ui.shadcn.com/)**
- **[Swiper JS Docs](https://swiperjs.com/swiper-api)**

---

### 14. Project Statistics

| Metric | Count |
|--------|-------|
| **Total Components** | 100+ |
| **Pages** | 35+ |
| **API Endpoints** | 40+ |
| **React Query Hooks** | 41 |
| **Card Variants** | 15 |
| **Section Components** | 36 |
| **TypeScript Files** | 150+ |
| **Dependencies** | 25+ |
| **Dev Dependencies** | 20+ |

---

**Last Updated:** March 13, 2026  
**Maintained By:** Development Team  
**License:** Educational Use Only
