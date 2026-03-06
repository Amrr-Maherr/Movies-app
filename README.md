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

---

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
- 🎪 **Hero Carousel** - Auto-rotating featured content
- 🃏 **Card Variants** - 6 different card layouts (Standard, Compact, Top 10, New Release, Award Winner, Recommendation)
- 📱 **Fully Responsive** - Mobile-first design (320px - 1920px+)
- ⌨️ **Keyboard Navigation** - Full accessibility support
- 🔄 **Loading States** - Skeleton loaders and spinners
- ❌ **Error Handling** - Retry mechanisms with user-friendly messages
- 🎯 **Hover Effects** - Interactive card overlays with quick actions
- 📲 **Mobile Sidebar** - Drawer navigation for mobile devices
- 🔔 **Profile Menu** - User account dropdown
- 🎬 **Modal Dialogs** - Movie info and trailer modals

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

## 📁 Project Structure

```
netflix/
├── public/                     # Static assets
│   └── favicon.ico
├── src/
│   ├── api/                    # TMDB API service functions (21 files)
│   │   ├── PopularMovies.ts
│   │   ├── PopularTvShows.ts
│   │   ├── TrendingMoviesDay.ts
│   │   ├── TrendingMoviesWeek.ts
│   │   ├── MovieDetails.ts
│   │   ├── TvShowDetails.ts
│   │   ├── TvSeasonDetails.ts
│   │   ├── GetEpisodeDetails.ts
│   │   ├── PersonDetails.ts
│   │   ├── PersonCredits.ts
│   │   ├── Search.ts           # Search movies & TV shows
│   │   └── ...
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
- Full-width backdrop
- Gradient overlays
- Play & More Info buttons
- Responsive content

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
