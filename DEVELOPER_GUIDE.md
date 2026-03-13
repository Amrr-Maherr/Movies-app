# 📖 Comprehensive Developer Documentation

This section provides in-depth documentation for developers who are new to the project or need detailed information about the application architecture.

---

## 1. Project Overview

### Purpose
This Netflix Clone is a **full-featured streaming platform interface** that allows users to browse, search, and explore movies and TV shows. It serves as both a portfolio project demonstrating modern React development practices and a functional template for building streaming media applications.

### Main Features & Functionality

| Feature | Description |
|---------|-------------|
| **Homepage** | Hero carousel, trending sections, top picks, new releases, TV shows, platforms, pricing, FAQ |
| **Browse Pages** | Dedicated pages for Movies, TV Shows, Kids content, New & Popular |
| **Detail Pages** | Comprehensive movie/TV show details with cast, trailers, reviews, recommendations |
| **Season/Episode Pages** | Deep linking to specific seasons and episodes for TV shows |
| **Person Profiles** | Actor/director biographies with filmography |
| **Live Search** | Real-time search with debounced API calls |
| **My List** | Personal watchlist (requires authentication implementation) |
| **Responsive Design** | Mobile-first design supporting 320px to 1920px+ screens |
| **Dark Theme** | Netflix-inspired dark mode with CSS custom properties |

---

## 2. Folder & File Structure

### Complete Directory Tree

```
netflix/
├── public/                          # Static assets served at root
│   └── favicon.ico
│
├── src/
│   ├── api/                         # TMDB API service functions (40 files)
│   │   ├── MovieDetails.ts          # Fetch movie details with append_to_response
│   │   ├── TvShowDetails.ts         # Fetch TV series details
│   │   ├── TvSeasonDetails.ts       # Fetch season information
│   │   ├── GetEpisodeDetails.ts     # Fetch episode details
│   │   ├── PersonDetails.ts         # Fetch person biography
│   │   ├── PersonCredits.ts         # Fetch person filmography
│   │   ├── Search.ts                # Search movies and TV shows
│   │   ├── PopularMovies.ts         # Popular movies endpoint
│   │   ├── TopRatedMovies.ts        # Top rated movies endpoint
│   │   ├── TrendingMoviesDay.ts     # Daily trending movies
│   │   ├── TrendingMoviesWeek.ts    # Weekly trending movies
│   │   ├── NowPlayingMovies.ts      # Currently in theaters
│   │   ├── UpcomingMovies.ts        # Upcoming releases
│   │   ├── PopularTvShows.ts        # Popular TV shows
│   │   ├── TrendingTvDay.ts         # Daily trending TV
│   │   ├── TrendingTvWeek.ts        # Weekly trending TV
│   │   ├── TopRatedTvShows.ts       # Top rated TV shows
│   │   ├── AiringTodayTv.ts         # TV shows airing today
│   │   ├── OnTheAirTv.ts            # Currently airing TV
│   │   ├── MovieCredits.ts          # Movie cast and crew
│   │   ├── MovieVideos.ts           # Movie trailers
│   │   ├── MovieReviews.ts          # Movie reviews
│   │   ├── MovieSimilar.ts          # Similar movies
│   │   ├── MovieRecommendations.ts  # Movie recommendations
│   │   ├── MovieImages.ts           # Movie posters/backdrops
│   │   ├── MovieWatchProviders.ts   # Streaming availability
│   │   ├── TVCredits.ts             # TV cast and crew
│   │   ├── TVVideos.ts              # TV trailers
│   │   ├── TVReviews.ts             # TV reviews
│   │   ├── TVSimilar.ts             # Similar TV shows
│   │   ├── TVRecommendations.ts     # TV recommendations
│   │   ├── TVImages.ts              # TV posters/backdrops
│   │   ├── TVWatchProviders.ts      # TV streaming availability
│   │   ├── PersonCreditsExtended.ts # Extended person credits with hooks
│   │   ├── PersonImages.ts          # Person profile images
│   │   ├── StreamingPlatforms.ts    # Available streaming platforms
│   │   ├── KidsMovies.ts            # Kids category movies
│   │   ├── MediaByLanguage.ts       # Movies by language
│   │   └── index.ts                 # API exports
│   │
│   ├── components/
│   │   ├── sections/                # Page section components (36 files)
│   │   │   ├── TopPicksSection.tsx           # Top 10 grid layout
│   │   │   ├── MoviePromo.tsx                # Featured content promo
│   │   │   ├── NewReleasesSection.tsx        # New releases grid
│   │   │   ├── OnlyOnNetflixSection.tsx      # Netflix originals
│   │   │   ├── AwardWinnersSection.tsx       # Award-winning content
│   │   │   ├── PlatformsSection.tsx          # Streaming platforms slider
│   │   │   ├── PricingSection.tsx            # Subscription pricing
│   │   │   ├── AskedQuestions.tsx            # FAQ accordion
│   │   │   ├── MediaInfoSection.tsx          # Media metadata display
│   │   │   ├── TrailersSection.tsx           # Video trailers section
│   │   │   ├── FullCreditsSection.tsx        # Cast and crew display
│   │   │   ├── MoreLikeThisSection.tsx       # Similar content
│   │   │   ├── EpisodesSection.tsx           # TV episode browser
│   │   │   ├── ReviewsSection.tsx            # User reviews
│   │   │   ├── WatchProvidersSection.tsx     # Where to watch
│   │   │   ├── KeywordsSection.tsx           # Genre tags
│   │   │   ├── BiographySection.tsx          # Person biography
│   │   │   ├── KnownForSection.tsx           # Person highlights
│   │   │   ├── SocialLinksSection.tsx        # External social links
│   │   │   ├── ProductionSection.tsx         # Studios/networks
│   │   │   ├── GenreShowcaseSection.tsx      # Genre browsing
│   │   │   ├── BingeWorthySection.tsx        # TV recommendations
│   │   │   ├── WeekendWatchSection.tsx       # Weekend picks
│   │   │   ├── BecauseYouWatchedSection.tsx  # Personalized recs
│   │   │   ├── ContinueWatchingSection.tsx   # Progress tracking
│   │   │   ├── BehindTheScenesSection.tsx    # Behind scenes content
│   │   │   ├── ImagesGallery.tsx             # Image gallery
│   │   │   ├── RecommendationsSection.tsx    # Recommendations
│   │   │   ├── PlatformCard.tsx              # Platform card display
│   │   │   ├── PlatformSkeleton.tsx          # Platform loading state
│   │   │   ├── FullCreditsDetail.tsx         # Detailed credits
│   │   │   ├── WatchProvidersDetail.tsx      # Provider details
│   │   │   └── index.ts                      # Section exports
│   │   │
│   │   ├── shared/                  # Reusable shared components
│   │   │   ├── Card/
│   │   │   │   ├── Card.tsx                    # Main card component (15 variants)
│   │   │   │   ├── CardPoster.tsx              # Poster image wrapper
│   │   │   │   ├── CardHoverOverlay.tsx        # Hover interaction overlay
│   │   │   │   ├── CardBadges.tsx              # Trending/award badges
│   │   │   │   ├── CardMetadata.tsx            # Rating/year metadata
│   │   │   │   └── CardVariantLayouts.tsx      # Layout components for variants
│   │   │   │
│   │   │   ├── heroSection/
│   │   │   │   ├── HeroSection.tsx             # Main hero carousel
│   │   │   │   ├── HeroSlide.tsx               # Individual hero slide
│   │   │   │   ├── HeroBackground.tsx          # Backdrop image layer
│   │   │   │   ├── HeroContent.tsx             # Text content layer
│   │   │   │   └── ActionButtons.tsx           # Play/More Info buttons
│   │   │   │
│   │   │   ├── Slider/
│   │   │   │   └── slider.tsx                  # Swiper-based carousel
│   │   │   │
│   │   │   ├── MediaSection.tsx                # Generic media carousel
│   │   │   ├── MediaHero.tsx                   # Detail page hero
│   │   │   ├── PersonHero.tsx                  # Person page hero
│   │   │   ├── MovieModal.tsx                  # Quick info modal
│   │   │   ├── SharedMovieModal.tsx            # Global modal instance
│   │   │   ├── TrailerModal.tsx                # YouTube trailer modal
│   │   │   ├── SectionHeader.tsx               # Section title component
│   │   │   ├── DetailPageNav.tsx               # Detail page tabs
│   │   │   ├── PageTransition.tsx              # Framer Motion transitions
│   │   │   ├── HelmetMeta.tsx                  # SEO meta tags
│   │   │   ├── MovieFilters.tsx                # Movie filter controls
│   │   │   ├── TVShowFilters.tsx               # TV filter controls
│   │   │   ├── NewPopularFilters.tsx           # New/Popular filters
│   │   │   ├── MediaGrid.tsx                   # Grid layout component
│   │   │   ├── MediaGridSkeleton.tsx           # Grid loading state
│   │   │   ├── CircularGallery.tsx             # Circular image gallery
│   │   │   └── logo/
│   │   │       └── Logo.tsx                    # Netflix logo component
│   │   │
│   │   ├── ui/                      # Base UI components (ShadCN)
│   │   │   ├── button.tsx           # Button with variants
│   │   │   ├── dialog.tsx           # Modal dialog (Radix)
│   │   │   ├── drawer.tsx           # Slide-out drawer (Vaul)
│   │   │   ├── input.tsx            # Text input field
│   │   │   ├── select.tsx           # Dropdown select
│   │   │   ├── checkbox.tsx         # Checkbox input
│   │   │   ├── label.tsx            # Form label
│   │   │   ├── separator.tsx        # Visual divider
│   │   │   ├── loader.tsx           # Loading spinner
│   │   │   ├── error.tsx            # Error state with retry
│   │   │   ├── card.tsx             # Card container
│   │   │   ├── lazy-wrapper.tsx     # Intersection Observer wrapper
│   │   │   ├── LoadingFallback.tsx  # Generic loading state
│   │   │   ├── OptimizedImage.tsx   # Image with lazy loading
│   │   │   ├── SectionSkeleton.tsx  # Section loading skeleton
│   │   │   └── index.ts             # UI exports
│   │   │
│   │   ├── Actors/                  # Actor-related components
│   │   └── BrowseByLanguages/       # Language browse components
│   │
│   ├── data/                        # Static data files
│   │   ├── header.ts                # Navigation links configuration
│   │   └── footer.tsx               # Footer links and social media
│   │
│   ├── layout/                      # Layout components
│   │   ├── header/
│   │   │   ├── Header.tsx                      # Main header component
│   │   │   └── components/
│   │   │       ├── NavLinks.tsx                # Desktop navigation
│   │   │       ├── ProfileMenu.tsx             # User profile dropdown
│   │   │       ├── BrowseDropdown.tsx          # Mobile browse menu
│   │   │       ├── MobileSidebar.tsx           # Mobile navigation drawer
│   │   │       └── search/
│   │   │           ├── SearchButton.tsx        # Search trigger button
│   │   │           ├── SearchPopup.tsx         # Search modal dialog
│   │   │           ├── SearchResultCard.tsx    # Search result item
│   │   │           └── index.ts
│   │   │
│   │   ├── footer/
│   │   │   ├── Footer.tsx           # Main footer component
│   │   │   ├── FooterLink.tsx       # Footer link item
│   │   │   └── index.ts
│   │   │
│   │   └── mainLayout/
│   │       └── MainLayout.tsx       # App wrapper layout
│   │
│   ├── pages/                       # Page components (35 files)
│   │   ├── Home.tsx                 # Main landing page
│   │   ├── Movie.tsx                # Movies browse page
│   │   ├── TVShow.tsx               # TV shows browse page
│   │   ├── Kids.tsx                 # Kids content page
│   │   ├── NewPopular.tsx           # Trending content page
│   │   ├── MyList.tsx               # User watchlist
│   │   ├── Actor.tsx                # Actors browse page
│   │   ├── BrowseByLanguages.tsx    # Language browse page
│   │   ├── Session.tsx              # Session management
│   │   │
│   │   ├── MovieDetails.tsx         # Movie detail page
│   │   ├── TVShowDetails.tsx        # TV series detail page
│   │   ├── SeasonDetailsPage.tsx    # Season detail page
│   │   ├── EpisodeDetailsPage.tsx   # Episode detail page
│   │   ├── PersonDetails.tsx        # Person profile page
│   │   │
│   │   ├── movie/                   # Movie sub-pages
│   │   │   ├── MovieReviewsPage.tsx
│   │   │   ├── MovieVideosPage.tsx
│   │   │   ├── MovieImagesPage.tsx
│   │   │   ├── MovieWatchProvidersPage.tsx
│   │   │   ├── MovieCreditsPage.tsx
│   │   │   └── MovieRecommendationsPage.tsx
│   │   │
│   │   ├── tv/                      # TV sub-pages
│   │   │   ├── TVReviewsPage.tsx
│   │   │   ├── TVVideosPage.tsx
│   │   │   ├── TVImagesPage.tsx
│   │   │   ├── TVWatchProvidersPage.tsx
│   │   │   ├── TVCreditsPage.tsx
│   │   │   └── TVRecommendationsPage.tsx
│   │   │
│   │   ├── person/                  # Person sub-pages
│   │   │   ├── PersonMovieCreditsPage.tsx
│   │   │   ├── PersonTVCreditsPage.tsx
│   │   │   └── PersonImagesPage.tsx
│   │   │
│   │   ├── auth/                    # Authentication pages
│   │   │   ├── Login.tsx
│   │   │   └── Signup.tsx
│   │   │
│   │   └── [Footer Pages]           # Static informational pages
│   │       ├── FAQ.tsx
│   │       ├── HelpCenter.tsx
│   │       ├── Account.tsx
│   │       ├── MediaCenter.tsx
│   │       ├── InvestorRelations.tsx
│   │       ├── Jobs.tsx
│   │       ├── WaysToWatch.tsx
│   │       ├── TermsOfUse.tsx
│   │       ├── Privacy.tsx
│   │       ├── CookiePreferences.tsx
│   │       ├── CorporateInformation.tsx
│   │       ├── ContactUs.tsx
│   │       ├── SpeedTest.tsx
│   │       ├── LegalNotices.tsx
│   │       ├── OnlyOnNetflix.tsx
│   │       └── NotFound.tsx         # 404 page
│   │
│   ├── queries/                     # React Query hooks (20 files)
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
│   │   ├── FetchStreamingPlatforms.tsx
│   │   └── index.ts                 # Query exports
│   │
│   ├── routes/
│   │   └── Routes.tsx               # React Router configuration
│   │
│   ├── contexts/
│   │   └── MovieModalContext.tsx    # Modal state context
│   │
│   ├── providers/
│   │   └── Providers.tsx            # App-level providers wrapper
│   │
│   ├── types/                       # TypeScript type definitions
│   │   ├── movies.ts                # Movie and TV Show types
│   │   ├── movieDetails.ts          # Detailed movie types
│   │   ├── mediaDetails.ts          # Media union types
│   │   ├── person.ts                # Person/actor types
│   │   ├── hero.ts                  # Hero section types
│   │   ├── header.ts                # Header link types
│   │   ├── footer.ts                # Footer link types
│   │   ├── logo.ts                  # Logo props types
│   │   └── index.ts                 # Type exports
│   │
│   ├── utils/                       # Utility functions (19 files)
│   │   ├── tmdb.ts                  # TMDB image URL helpers
│   │   ├── movieHelpers.ts          # Movie data utilities
│   │   ├── slugify.ts               # URL slug generation
│   │   ├── useDebounce.ts           # Debounce hook
│   │   ├── formatDate.ts            # Date formatting
│   │   ├── formatNumber.ts          # Number formatting
│   │   ├── formatRuntime.ts         # Runtime formatting
│   │   ├── getTitle.ts              # Title extraction
│   │   ├── getReleaseDate.ts        # Release date extraction
│   │   ├── getReleaseYear.ts        # Year extraction
│   │   ├── getRuntime.ts            # Runtime extraction
│   │   ├── getLanguageName.ts       # Language name lookup
│   │   ├── extractKeywords.ts       # Keyword extraction
│   │   ├── extractWatchProviders.ts # Provider extraction
│   │   ├── filterKeyCrew.ts         # Key crew filtering
│   │   ├── getKnownForItems.ts      # Known-for extraction
│   │   ├── calculateAge.ts          # Age calculation
│   │   ├── handelUrl.ts             # URL handling
│   │   └── index.ts                 # Utility exports
│   │
│   ├── hooks/                       # Custom React hooks (extendable)
│   ├── store/                       # Redux store (optional, empty)
│   ├── assets/                      # Static assets (images, fonts)
│   ├── styles/                      # Additional CSS files
│   │   └── animations.css           # Custom animations
│   │
│   ├── App.tsx                      # Root application component
│   ├── App.css                      # App-specific styles
│   ├── main.tsx                     # Application entry point
│   ├── index.css                    # Global styles and CSS variables
│   ├── vite.config.ts               # Vite build configuration
│   ├── tsconfig.json                # TypeScript configuration
│   ├── package.json                 # Dependencies and scripts
│   └── README.md                    # Project documentation
│
├── tests/
│   └── example.spec.ts              # Playwright E2E test example
│
├── build/                           # Production build output
├── dist/                            # Distribution files
├── node_modules/                    # Dependencies
├── .env                             # Environment variables (not in repo)
├── .env.example                     # Environment template
├── .gitignore                       # Git ignore rules
├── eslint.config.js                 # ESLint configuration
├── playwright.config.ts             # Playwright E2E config
├── vitest.config.ts                 # Vitest testing config
└── vercel.json                      # Vercel deployment config
```

---

## 3. Components Deep Dive

### Component Categories

#### A. Card Component Variants

The `Card.tsx` component is the **most complex component** with 15 different variants:

| Variant | Usage | Layout | Features |
|---------|-------|--------|----------|
| `standard` | General browsing | Vertical poster | Hover overlay, match score, age rating |
| `compact` | Dense grids | Vertical poster | Simplified hover, smaller metadata |
| `top10` | Top 10 rankings | Vertical with number | Large gradient number badge |
| `newRelease` | New content | Vertical poster | NEW badge, release date |
| `awardWinner` | Award content | Vertical poster | Gold border, award badge |
| `recommendation` | "Because You Watched" | Vertical poster | Match percentage badge |
| `episode` | TV episodes | Horizontal still | Runtime, air date |
| `season` | TV seasons | Vertical poster | Episode count, air date |
| `person` | Cast/crew | Circular/vertical | Role description |
| `review` | User reviews | Horizontal card | Star rating, author, date |
| `trailer` | Video trailers | Thumbnail + play | YouTube embed |
| `promo` | Featured content | Full-width backdrop | Play button, metadata |
| `continueWatching` | Progress tracking | Backdrop + progress | Progress bar |
| `horizontal` | List layouts | Horizontal card | Overview text, rating |
| `landscape` | Wide cards | Landscape poster | Hot badge, match score |

**Example Usage:**
```tsx
// Standard card
<Card movie={movie} variant="standard" showBadge />

// Top 10 with rank
<Card movie={movie} variant="top10" rank={1} />

// Episode card
<Card episode={episode} variant="episode" tvShowId={123} seasonNumber={1} />

// Promo card
<Card movie={movie} variant="promo" promoVariant="left" mediaType="movie" />
```

#### B. Section Components

Section components are **page-level building blocks** that group related content:

| Section | Purpose | Data Source | Layout |
|---------|---------|-------------|--------|
| `HeroSection` | Featured content carousel | Trending Movies + TV | Full-width slider |
| `TopPicksSection` | Top 10 trending | Trending Movies API | 5-column grid |
| `MediaSection` | Generic media carousel | Any media array | Horizontal slider |
| `NewReleasesSection` | Latest content | Upcoming Movies API | 4-column grid |
| `OnlyOnNetflixSection` | Netflix originals | Popular TV API | Horizontal list |
| `AwardWinnersSection` | Award-winning titles | Top Rated API | 6-column grid |
| `PlatformsSection` | Streaming platforms | Streaming Providers API | Horizontal slider |
| `PricingSection` | Subscription plans | Static data | 3-column pricing |
| `AskedQuestions` | FAQ accordion | Static data | Expandable list |
| `TrailersSection` | Video gallery | Movie/TV videos | Grid/slider |
| `FullCreditsSection` | Cast and crew | Movie/TV credits | Grid with sections |
| `EpisodesSection` | TV episode browser | Season episodes | List/grid |
| `ReviewsSection` | User reviews | Movie/TV reviews | List layout |
| `MoreLikeThisSection` | Similar content | Recommendations API | Horizontal slider |

#### C. UI Components (ShadCN/Radix)

Base components built on **Radix UI primitives**:

| Component | Source | Purpose |
|-----------|--------|---------|
| `Button` | ShadCN | Multiple variants (default, destructive, outline, ghost, link) |
| `Dialog` | Radix UI | Modal dialogs with overlay |
| `Drawer` | Vaul | Mobile slide-out panels |
| `Input` | ShadCN | Text input with validation states |
| `Select` | Radix UI | Dropdown selection |
| `Checkbox` | Radix UI | Checkbox with label |
| `Separator` | Radix UI | Visual divider |

---

## 4. Pages & Routing

### Route Configuration

All routes are defined in `src/routes/Routes.tsx` using **React Router DOM v7**:

### Main Routes Table

| Path | Component | Description |
|------|-----------|-------------|
| `/` | `Home.tsx` | Landing page with all sections |
| `/movies` | `Movie.tsx` | Movies browse page |
| `/tv-shows` | `TVShow.tsx` | TV shows browse page |
| `/kids` | `Kids.tsx` | Kids content |
| `/new-popular` | `NewPopular.tsx` | Trending content |
| `/my-list` | `MyList.tsx` | User watchlist |
| `/browse/languages` | `BrowseByLanguages.tsx` | Browse by language |
| `/actors` | `Actor.tsx` | Popular actors browse |
| `/session` | `Session.tsx` | Session management |

### Detail Routes (Dynamic)

| Path Pattern | Component | Parameters |
|--------------|-----------|------------|
| `/movie/:slugWithId` | `MovieDetails.tsx` | `slugWithId` (string) |
| `/movie/:slugWithId/reviews` | `MovieReviewsPage.tsx` | `slugWithId` |
| `/movie/:slugWithId/videos` | `MovieVideosPage.tsx` | `slugWithId` |
| `/movie/:slugWithId/images` | `MovieImagesPage.tsx` | `slugWithId` |
| `/movie/:slugWithId/watch` | `MovieWatchProvidersPage.tsx` | `slugWithId` |
| `/movie/:slugWithId/credits` | `MovieCreditsPage.tsx` | `slugWithId` |
| `/movie/:slugWithId/recommendations` | `MovieRecommendationsPage.tsx` | `slugWithId` |
| `/tv/:slugWithId` | `TVShowDetails.tsx` | `slugWithId` |
| `/tv/:slugWithId/reviews` | `TVReviewsPage.tsx` | `slugWithId` |
| `/tv/:slugWithId/videos` | `TVVideosPage.tsx` | `slugWithId` |
| `/tv/:slugWithId/images` | `TVImagesPage.tsx` | `slugWithId` |
| `/tv/:slugWithId/watch` | `TVWatchProvidersPage.tsx` | `slugWithId` |
| `/tv/:slugWithId/credits` | `TVCreditsPage.tsx` | `slugWithId` |
| `/tv/:slugWithId/recommendations` | `TVRecommendationsPage.tsx` | `slugWithId` |
| `/tv/:slugWithId/season/:seasonNumber` | `SeasonDetailsPage.tsx` | `slugWithId`, `seasonNumber` |
| `/tv/:slugWithId/season/:seasonNumber/episode/:episodeNumber` | `EpisodeDetailsPage.tsx` | `slugWithId`, `seasonNumber`, `episodeNumber` |
| `/person/:slugWithId` | `PersonDetails.tsx` | `slugWithId` |
| `/person/:slugWithId/movies` | `PersonMovieCreditsPage.tsx` | `slugWithId` |
| `/person/:slugWithId/tv` | `PersonTVCreditsPage.tsx` | `slugWithId` |
| `/person/:slugWithId/images` | `PersonImagesPage.tsx` | `slugWithId` |

### Slug Format

Routes use **SEO-friendly slugs** with embedded IDs:
```
Format: {title-slug}-{id}
Example: "the-matrix-603"
Extraction: extractIdFromSlug("the-matrix-603") → 603
```

### Auth Routes

| Path | Component |
|------|-----------|
| `/login` | `Login.tsx` |
| `/signup` | `Signup.tsx` |

### Footer Routes

| Path | Component |
|------|-----------|
| `/faq` | `FAQ.tsx` |
| `/help-center` | `HelpCenter.tsx` |
| `/account` | `Account.tsx` |
| `/media-center` | `MediaCenter.tsx` |
| `/investor-relations` | `InvestorRelations.tsx` |
| `/jobs` | `Jobs.tsx` |
| `/ways-to-watch` | `WaysToWatch.tsx` |
| `/terms-of-use` | `TermsOfUse.tsx` |
| `/privacy` | `Privacy.tsx` |
| `/cookie-preferences` | `CookiePreferences.tsx` |
| `/corporate-information` | `CorporateInformation.tsx` |
| `/contact-us` | `ContactUs.tsx` |
| `/speed-test` | `SpeedTest.tsx` |
| `/legal-notices` | `LegalNotices.tsx` |
| `/only-on-netflix` | `OnlyOnNetflix.tsx` |

### 404 Route

| Path | Component |
|------|-----------|
| `*` | `NotFound.tsx` |

---

## 5. State Management

### State Architecture

The application uses a **hybrid approach**:

```
┌─────────────────────────────────────────────────────────┐
│                    Application State                     │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  ┌─────────────────┐    ┌──────────────────────────┐   │
│  │  Server State   │    │      Client State        │   │
│  │  (React Query)  │    │   (React Context + State)│   │
│  │                 │    │                          │   │
│  │  - Movies       │    │  - Modal Open/Close      │   │
│  │  - TV Shows     │    │  - Search Query          │   │
│  │  - Details      │    │  - UI Toggles            │   │
│  │  - Search       │    │  - Form Data             │   │
│  │  - Credits      │    │                          │   │
│  └─────────────────┘    └──────────────────────────┘   │
│                                                          │
│  ┌──────────────────────────────────────────────────┐   │
│  │         Optional: Redux Toolkit (src/store/)     │   │
│  │         (Available but not currently used)       │   │
│  └──────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
```

### React Query Configuration

```typescript
// src/providers/Providers.tsx
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

**Query Keys Structure:**
```typescript
["PopularMovies", page]
["TrendingMoviesWeek", page]
["TvShowDetails", id]
["search", "movies", query]
["search", "tv", query]
["StreamingPlatforms"]
```

### Context API Usage

**MovieModalContext** - Global modal state:
```typescript
// src/contexts/MovieModalContext.tsx
interface MovieModalContextType {
  selectedMovie: HeroMedia | null;
  isOpen: boolean;
  openModal: (movie: HeroMedia) => void;
  closeModal: () => void;
}

// Usage in components
const { openModal, closeModal, selectedMovie, isOpen } = useMovieModal();
```

### Local Component State

Common patterns:
```typescript
// Loading states
const [isLoading, setIsLoading] = useState(false);

// UI toggles
const [isHovered, setIsHovered] = useState(false);
const [isMenuOpen, setIsMenuOpen] = useState(false);

// Form data
const [query, setQuery] = useState("");

// Derived state with debouncing
const debouncedQuery = useDebounce(query, 300);
```

---

## 6. API Integration

### API Service Layer

All API calls are made through **axios** with a consistent pattern:

```typescript
// Example: src/api/MovieDetails.ts
const apiBaseUrl = "https://api.themoviedb.org/3";
const apiKey = import.meta.env.VITE_TMDB_API_KEY || "fallback-key";

export const GetMovieDetails = async (id: number): Promise<MovieDetails | null> => {
  const response = await axios.get(`${apiBaseUrl}/movie/${id}`, {
    params: {
      api_key: apiKey,
      language: "en-US",
      append_to_response: "credits,videos,images,reviews,similar,external_ids,keywords"
    },
  });
  return response.data;
};
```

### Complete API Endpoints Reference

#### Movie Endpoints

| Endpoint | Function | Query Hook |
|----------|----------|------------|
| `/movie/popular` | `GetPopularMovies(page)` | `usePopularMovies()` |
| `/movie/top_rated` | `GetTopRatedMovies(page)` | `useTopRatedMovies()` |
| `/movie/now_playing` | `GetNowPlayingMovies(page)` | `useNowPlayingMovies()` |
| `/movie/upcoming` | `GetUpcomingMovies(page)` | `useUpcomingMovies()` |
| `/trending/movie/week` | `GetTrendingMoviesWeek(page)` | `useTrendingMoviesWeek()` |
| `/trending/movie/day` | `GetTrendingMoviesDay(page)` | `useTrendingMoviesDay()` |
| `/movie/{id}` | `GetMovieDetails(id)` | `FetchMovieDetails()` |
| `/movie/{id}/credits` | (appended) | - |
| `/movie/{id}/videos` | (appended) | - |
| `/movie/{id}/reviews` | `GetMovieReviews(id)` | `useMovieReviews()` |
| `/movie/{id}/similar` | `GetMovieSimilar(id)` | `useMovieSimilar()` |
| `/movie/{id}/recommendations` | `GetMovieRecommendations(id)` | `useMovieRecommendations()` |
| `/movie/{id}/images` | `GetMovieImages(id)` | `useMovieImages()` |
| `/movie/{id}/watch/providers` | `GetMovieWatchProviders(id)` | `useMovieWatchProviders()` |

#### TV Show Endpoints

| Endpoint | Function | Query Hook |
|----------|----------|------------|
| `/tv/popular` | `GetPopularTvShows(page)` | `usePopularTvShows()` |
| `/tv/top_rated` | `GetTopRatedTvShows(page)` | `useTopRatedTvShows()` |
| `/tv/airing_today` | `GetAiringTodayTv(page)` | `useAiringTodayTv()` |
| `/tv/on_the_air` | `GetOnTheAirTv(page)` | `useOnTheAirTv()` |
| `/trending/tv/week` | `GetTrendingTvWeek(page)` | `useTrendingTvWeek()` |
| `/trending/tv/day` | `GetTrendingTvDay(page)` | `useTrendingTvDay()` |
| `/tv/{id}` | `GetTvShowDetails(id)` | `FetchTvShowDetails()` |
| `/tv/{id}/season/{season}` | `GetTvSeasonDetails(id, season)` | `FetchTvSeasonDetails()` |
| `/tv/{id}/season/{season}/episode/{episode}` | `GetEpisodeDetails(id, season, episode)` | `FetchEpisodeDetails()` |

#### Person Endpoints

| Endpoint | Function | Query Hook |
|----------|----------|------------|
| `/person/{id}` | `GetPersonDetails(id)` | `FetchPersonDetails()` |
| `/person/{id}/movie_credits` | `GetPersonMovieCredits(id)` | `usePersonMovieCredits()` |
| `/person/{id}/tv_credits` | `GetPersonTVCredits(id)` | `usePersonTVCredits()` |
| `/person/{id}/images` | `GetPersonImages(id)` | `usePersonImages()` |

#### Search Endpoints

| Endpoint | Function | Query Hook |
|----------|----------|------------|
| `/search/movie` | `SearchMovies(query, page)` | `useSearch()` |
| `/search/tv` | `SearchTvShows(query, page)` | `useSearch()` |

### Data Flow Example

```
User clicks on movie card
        ↓
Navigation to /movie/slug-id
        ↓
MovieDetails component mounts
        ↓
FetchMovieDetails query triggered
        ↓
React Query checks cache
        ↓
Cache miss → API call via GetMovieDetails()
        ↓
Axios GET /movie/{id}?append_to_response=...
        ↓
TMDB API responds with data
        ↓
Data cached in React Query (5 min stale time)
        ↓
Component re-renders with data
        ↓
Sections render: MediaHero, MediaInfoSection, TrailersSection, etc.
```

### Error Handling

```typescript
// API level
try {
  const response = await axios.get(...);
  return response.data;
} catch (error) {
  console.error("Error fetching data:", error);
  return null;
}

// Component level
if (error || !data) {
  return <Error onRetry={refetch} />;
}
```

### Caching Strategy

| Data Type | Stale Time | Retry | Notes |
|-----------|------------|-------|-------|
| Movies/TV Lists | 5 minutes | 1 | Paginated |
| Details | 5 minutes | 1 | Large payload |
| Search | 5 minutes | 1 | Query-dependent |
| Platforms | 10 minutes | 2 | Rarely changes |
| Images | Session | 0 | Cached by browser |

---

## 7. Performance Optimization

### Implemented Optimizations

#### 1. Code Splitting (Route-based)

```typescript
// src/routes/Routes.tsx
const MovieDetails = lazy(() => import("@/pages/MovieDetails"));

<Suspense fallback={<PageSkeleton />}>
  <Routes>
    <Route path="/movie/:slugWithId" element={<MovieDetails />} />
  </Routes>
</Suspense>
```

**Manual Chunks in vite.config.ts:**
```typescript
manualChunks: {
  'react-vendor': ['react', 'react-dom', 'react-router-dom'],
  'animation-vendor': ['framer-motion'],
  'ui-vendor': ['radix-ui', 'lucide-react'],
  'data-vendor': ['@tanstack/react-query', 'axios'],
  'swiper-vendor': ['swiper'],
  'page-home': ['./src/pages/Home.tsx'],
}
```

#### 2. Image Optimization

**OptimizedImage Component:**
```typescript
// Features:
// - Lazy loading (loading="lazy")
// - Async decoding (decoding="async")
// - Global cache to prevent re-loading
// - Skeleton placeholder during load
// - Fallback on error

const loadedImageCache = new Set<string>();

<OptimizedImage
  src={imageUrl}
  alt={title}
  loading={priority ? "eager" : "lazy"}
  decoding="async"
/>
```

**Vite Image Minification:**
```typescript
viteImagemin({
  mozjpeg: { quality: 75, progressive: true },
  pngquant: { quality: [0.65, 0.8], speed: 4 },
  svgo: { plugins: [...] },
})
```

#### 3. Lazy Loading (Intersection Observer)

**LazyWrapper Component:**
```typescript
const LazyWrapper = memo(({ children, placeholder, height }) => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setIsVisible(true),
      { threshold: 0, rootMargin: "500px" }
    );
    observer.observe(element);
    return () => observer.unobserve(element);
  }, []);

  return isVisible ? children : placeholder;
});
```

**Usage in Home.tsx:**
```typescript
<LazyWrapper height={300}>
  <TopPicksSection movies={trendingMoviesWeek} />
</LazyWrapper>
```

#### 4. Memoization

**Component Memoization:**
```typescript
const Card = memo(({ movie, variant }) => {
  // Component logic
});

const Home = memo(function Home() {
  // Component logic
});
```

**UseMemo for Expensive Calculations:**
```typescript
const posterUrl = useMemo(() => {
  return movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "https://via.placeholder.com/500x750";
}, [movie.poster_path]);

const heroData = useMemo(
  () => [
    ...(trendingMoviesWeek?.slice(0, 5) || []),
    ...(trendingTvWeek?.slice(0, 5) || []),
  ],
  [trendingMoviesWeek, trendingTvWeek],
);
```

**UseCallback for Event Handlers:**
```typescript
const handleRetry = useCallback(() => {
  trendingWeekRefetch();
  upcomingRefetch();
  trendingTvWeekRefetch();
}, [trendingWeekRefetch, upcomingRefetch, trendingTvWeekRefetch]);
```

#### 5. Virtualization (react-window)

Currently **not implemented** but recommended for:
- Long credit lists
- Episode lists (seasons with 20+ episodes)
- Search results (100+ items)

**Recommended Implementation:**
```typescript
import { FixedSizeList } from 'react-window';

<FixedSizeList
  height={400}
  itemCount={episodes.length}
  itemSize={100}
>
  {({ index, style }) => (
    <div style={style}>
      <Card episode={episodes[index]} variant="episode" />
    </div>
  )}
</FixedSizeList>
```

#### 6. Debounced Search

```typescript
// useDebounce.ts
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  
  return debouncedValue;
}

// Usage in SearchPopup
const debouncedQuery = useDebounce(query, 300);
const { results } = useSearch(debouncedQuery);
```

#### 7. Throttled Scroll Events

```typescript
// Header.tsx - Scroll state with RAF
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
  return () => window.removeEventListener("scroll", handleScroll);
}, []);
```

### Build Output Analysis

```
Production Build (npm run build):
├── Total Size: ~650 KB (gzipped: ~180 KB)
├── Main chunk: 540 KB (gzipped: 176 KB)
├── Slider chunk: 103 KB (gzipped: 32 KB)
├── CSS: 103 KB (gzipped: 15 KB)
└── Assets: ~50 KB

Bundle Visualization:
- Run: npm run build
- Open: dist/stats.html (treemap view)
```

---

## 8. UI/UX Notes

### Accessibility Features

#### ARIA Labels & Roles
```tsx
<button aria-label="Notifications">
  <Bell className="w-5 h-5" />
</button>

<nav role="navigation" aria-label="Detail page navigation">
  <button aria-current={isActive ? "page" : undefined}>
    Reviews
  </button>
</nav>

<img alt={movieTitle} />
```

#### Keyboard Navigation
- **Tab/Shift+Tab**: Navigate through interactive elements
- **Enter/Space**: Activate buttons
- **Escape**: Close modals, search popup, dropdowns
- **Arrow Keys**: Navigate sliders (via Swiper)

#### Focus Management
```tsx
// Focus visible styles
focus-visible:ring-2 focus-visible:ring-[var(--netflix-red)]

// Skip to main content (recommended addition)
<a href="#main" className="sr-only focus:not-sr-only">
  Skip to main content
</a>
```

### Animations & Hover Effects

#### Framer Motion Page Transitions
```tsx
// PageTransition.tsx
<motion.div
  animate={{ opacity: 1, y: 0 }}
  exit={{ opacity: 0, y: -20 }}
  transition={{ duration: 0.4, ease: "easeOut" }}
>
  {children}
</motion.div>
```

#### Card Hover Effects (CSS-based - Recommended)
```tsx
// CSS-based hover (performance-friendly)
<div className="group relative">
  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 
                  to-transparent opacity-0 group-hover:opacity-100 
                  transition-opacity duration-300" />
  
  <button className="opacity-0 group-hover:opacity-100 
                     transition-opacity duration-300" />
</div>
```

#### Framer Motion Hover (use sparingly)
```tsx
<motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  transition={{ duration: 0.2 }}
>
  Play
</motion.button>
```

#### CSS Animations
```css
/* image-zoom-hover class */
@keyframes slowZoom {
  from { transform: scale(1); }
  to { transform: scale(1.1); }
}

.image-zoom-hover {
  animation: slowZoom 8s ease-out forwards;
}
```

### Responsive Design Approach

#### Mobile-First Breakpoints

```typescript
// Tailwind CSS v4 breakpoints (mobile-first)
sm: 640px   // Large phones
md: 768px   // Tablets
lg: 1024px  // Laptops
xl: 1280px  // Desktops
2xl: 1536px // Large screens
```

#### Responsive Patterns

**Grid Columns:**
```tsx
className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6"
```

**Text Sizing:**
```tsx
className="text-sm md:text-base lg:text-lg"
```

**Spacing:**
```tsx
className="py-6 md:py-8 container px-4 md:px-12 lg:px-16"
```

**Conditional Rendering:**
```tsx
className="hidden md:block"  {/* Desktop only */}
className="md:hidden"        {/* Mobile only */}
```

**Slider Responsive Config:**
```tsx
<Slider
  slidesPerViewMobile={1.5}
  slidesPerView={5}
  swiperOptions={{
    breakpoints: {
      320: { slidesPerView: 1.5 },
      640: { slidesPerView: 2 },
      768: { slidesPerView: 3 },
      1024: { slidesPerView: 4 },
      1280: { slidesPerView: 5 },
    }
  }}
/>
```

---

## 9. Libraries & Dependencies

### Production Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| `react` | 19.2.0 | UI framework |
| `react-dom` | 19.2.0 | React DOM renderer |
| `react-router-dom` | 7.13.1 | Client-side routing |
| `@tanstack/react-query` | 5.90.21 | Server state management |
| `@tanstack/react-query-devtools` | 5.91.3 | Query debugging |
| `axios` | 1.13.6 | HTTP client |
| `framer-motion` | 12.34.3 | Animations |
| `swiper` | 12.1.2 | Carousel/slider |
| `@reduxjs/toolkit` | 2.11.2 | Redux state (optional) |
| `react-redux` | 9.2.0 | React Redux bindings |
| `react-hook-form` | 7.71.2 | Form handling |
| `radix-ui` | 1.4.3 | Accessible components |
| `lucide-react` | 0.575.0 | Icon library |
| `tailwind-merge` | 3.5.0 | className utilities |
| `class-variance-authority` | 0.7.1 | Component variants |
| `clsx` | 2.1.1 | className conditional |
| `vaul` | 1.1.2 | Drawer component |
| `react-loading-skeleton` | 3.5.0 | Skeleton loaders |
| `react-window` | 2.2.7 | List virtualization |
| `react-infinite-scroll-component` | 6.1.1 | Infinite scroll |
| `react-helmet` | 6.1.0 | SEO meta tags |
| `ogl` | 1.0.11 | WebGL utilities |

### Development Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| `vite` | 7.3.1 | Build tool & dev server |
| `@vitejs/plugin-react` | 5.1.1 | React HMR |
| `@tailwindcss/vite` | 4.2.1 | Tailwind CSS plugin |
| `tailwindcss` | 4.2.1 | CSS framework |
| `typescript` | 5.9.3 | Type checking |
| `typescript-eslint` | 8.48.0 | TS linting |
| `eslint` | 9.39.1 | Code linting |
| `eslint-plugin-react-hooks` | 7.0.1 | Hooks linting |
| `vitest` | 4.0.18 | Unit testing |
| `@testing-library/react` | 16.3.2 | Component testing |
| `@playwright/test` | 1.58.2 | E2E testing |
| `vite-plugin-imagemin` | 0.6.1 | Image optimization |
| `rollup-plugin-visualizer` | 7.0.1 | Bundle analysis |
| `terser` | 5.46.0 | JS minification |

---

## 10. Known Issues & Warnings

### Console Warnings

1. **React Keys in Lists**
   ```
   Warning: Each child in a list should have a unique "key" prop
   ```
   **Status:** Resolved - All mapped arrays use unique IDs

2. **Missing Alt Text**
   ```
   Warning: Images must have an alt attribute
   ```
   **Status:** Resolved - All images have descriptive alt text

3. **Autofocus in Dialogs**
   ```
   Warning: autoFocus is deprecated
   ```
   **Status:** Resolved - Using camelCase autoFocus

### Accessibility Alerts

1. **Color Contrast**
   - Some text on gradient backgrounds may have insufficient contrast
   - **Recommendation:** Add text shadows or increase opacity overlays

2. **Focus Indicators**
   - Custom focus rings may not be visible on dark backgrounds
   - **Recommendation:** Use higher contrast focus colors

3. **Screen Reader Announcements**
   - Dynamic content updates (search results) need ARIA live regions
   - **Recommendation:** Add `aria-live="polite"` to results container

### Performance Issues

1. **Initial Load Time**
   - Hero section loads 5 large backdrop images simultaneously
   - **Impact:** Slow LCP (Largest Contentful Paint)
   - **Fix:** Reduce to 3 slides, use smaller image variants

2. **Framer Motion Overhead**
   - Every card uses `motion.div` wrapper
   - **Impact:** Increased JS bundle, memory usage
   - **Fix:** Replace with CSS transitions for simple animations

3. **Swiper Bundle Size**
   - Swiper adds ~100KB to bundle
   - **Impact:** Larger initial load
   - **Fix:** Consider CSS scroll-snap for simple carousels

4. **Long Lists**
   - Credit sections with 50+ cast members
   - **Impact:** Slow rendering, high DOM count
   - **Fix:** Implement virtualization with react-window

---

## 11. Getting Started

### Prerequisites

Ensure you have the following installed:

```bash
# Check versions
node --version    # v18+ required (v20+ recommended)
npm --version     # v9+ recommended
git --version     # v2.0+
```

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/netflix-clone.git
   cd netflix-clone
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create environment file**
   ```bash
   # Copy the example file
   cp .env.example .env
   
   # Or create manually
   echo "VITE_TMDB_API_KEY=your_key_here" > .env
   ```

4. **Configure environment variables**
   ```env
   # .env
   VITE_TMDB_API_KEY=your_api_key_here
   VITE_TMDB_BASE_URL=https://api.themoviedb.org/3
   VITE_TMDB_IMAGE_BASE_URL=https://image.tmdb.org/t/p
   ```

5. **Start development server**
   ```bash
   npm run dev
   ```

6. **Open in browser**
   ```
   http://localhost:5173
   ```

### Build for Production

```bash
# Build command
npm run build

# Preview production build
npm run preview

# Analyze bundle
npm run build
# Open dist/stats.html in browser
```

### Run Tests

```bash
# Unit tests
npm run test

# Unit tests with UI
npm run test:ui

# E2E tests
npm run test:e2e

# Linting
npm run lint
```

### Type Checking

```bash
# Run TypeScript compiler
npx tsc --noEmit
```

---

## 12. Contributing Guidelines

### Code Style

1. **TypeScript First**
   - All new code must be TypeScript
   - No `any` types without justification
   - Use proper interfaces for props and data

2. **Component Structure**
   ```tsx
   // Imports
   import { memo, useMemo, useCallback } from "react";
   
   // Interfaces
   interface ComponentProps {
     prop1: string;
     prop2: () => void;
   }
   
   // Memoized component
   const Component = memo(function Component({ prop1, prop2 }: ComponentProps) {
     // Hooks
     const memoizedValue = useMemo(() => ..., [dependencies]);
     const handler = useCallback(() => ..., [dependencies]);
     
     // JSX
     return <div>{prop1}</div>;
   });
   
   export default Component;
   ```

3. **Naming Conventions**
   - Components: PascalCase (`MovieCard`)
   - Functions/Variables: camelCase (`handleClick`)
   - Constants: UPPER_SNAKE_CASE (`SLIDE_INTERVAL`)
   - Files: Match component name (`MovieCard.tsx`)

4. **Comments**
   - Explain **why**, not **what**
   - Use JSDoc for complex functions
   - Keep comments up-to-date

### Git Workflow

1. **Branch Naming**
   ```
   feature/add-search-filters
   fix/hero-image-loading
   docs/update-readme
   refactor/card-component
   test/add-unit-tests
   ```

2. **Commit Messages** (Conventional Commits)
   ```
   feat: add new search filter component
   fix: resolve hero image loading issue
   docs: update README with installation steps
   refactor: extract card variants to separate files
   test: add unit tests for search functionality
   chore: update dependencies
   ```

3. **Pull Request Template**
   ```markdown
   ## Description
   Brief description of changes
   
   ## Type of Change
   - [ ] Bug fix
   - [ ] New feature
   - [ ] Breaking change
   - [ ] Documentation update
   
   ## Testing
   - [ ] Unit tests pass
   - [ ] E2E tests pass
   - [ ] Manually tested on Chrome
   - [ ] Manually tested on Mobile
   
   ## Screenshots (if applicable)
   Before: ...
   After: ...
   ```

### Development Best Practices

1. **Responsive Design**
   - Design mobile-first
   - Test on multiple screen sizes
   - Use Tailwind breakpoints

2. **Accessibility**
   - Add ARIA labels where needed
   - Ensure keyboard navigation works
   - Maintain color contrast ratios

3. **Performance**
   - Use `memo()` for pure components
   - Wrap expensive calculations in `useMemo`
   - Wrap event handlers in `useCallback`
   - Lazy load below-fold content

4. **Error Handling**
   - Always handle API errors
   - Provide user-friendly error messages
   - Include retry mechanisms

5. **Testing**
   - Write tests for new features
   - Maintain >80% code coverage
   - Test edge cases

### Review Process

1. **Self-Review**
   - Run linter: `npm run lint`
   - Run tests: `npm run test`
   - Check types: `npx tsc --noEmit`
   - Test locally

2. **Code Review**
   - At least 1 approval required
   - Address all comments
   - Update documentation if needed

3. **Merge**
   - Squash and merge for feature branches
   - Delete branch after merge
   - Verify deployment

---

## Quick Reference

### Common Commands

```bash
npm run dev          # Start dev server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run test         # Run tests
npm run test:ui      # Run tests with UI
npm run test:e2e     # Run E2E tests
```

### Important File Paths

```
src/pages/Home.tsx              # Homepage
src/components/shared/Card/     # Card components
src/routes/Routes.tsx           # Route configuration
src/providers/Providers.tsx     # App providers
src/queries/                    # React Query hooks
src/api/                        # API functions
```

### Useful Links

- [React Docs](https://react.dev/)
- [TypeScript Docs](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [React Query](https://tanstack.com/query/latest)
- [TMDB API](https://developer.themoviedb.org/docs)
- [Framer Motion](https://www.framer.com/motion/)
- [Swiper](https://swiperjs.com/swiper-api)

---

**Last Updated:** March 2026  
**Maintained By:** Development Team
