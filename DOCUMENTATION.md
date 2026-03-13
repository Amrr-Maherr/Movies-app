# 📚 Complete Application Documentation

## 1. Project Overview

**Netflix Clone** is a comprehensive streaming platform interface that allows users to browse, search, and explore movies and TV shows. Built with modern React 19 and TypeScript, it provides a production-ready example of a large-scale single-page application (SPA).

**Purpose:**
- Demonstrate advanced React patterns and best practices
- Provide a Netflix-like user experience for content discovery
- Showcase TypeScript, Tailwind CSS, and modern tooling integration
- Serve as a learning resource for building complex web applications

**Main Features:**
- 🎥 Browse trending, popular, and top-rated content
- 🔍 Search movies and TV shows with real-time results
- 📺 View detailed information including cast, reviews, trailers
- 🎬 Explore TV show seasons and episodes
- 📱 Responsive design for all device sizes
- ✨ Smooth page transitions and animations
- 🌙 Dark theme optimized for media consumption

---

## 2. Folder & File Structure

```
netflix/
├── public/                          # Static assets served directly
│   └── favicon.ico
│
├── src/
│   ├── api/                         # TMDB API service functions (40 files)
│   │   ├── MovieDetails.ts          # Fetch movie details with appendices
│   │   ├── TvShowDetails.ts         # Fetch TV series details
│   │   ├── Search.ts                # Search movies and TV shows
│   │   ├── PopularMovies.ts         # Popular movies endpoint
│   │   ├── TrendingMoviesWeek.ts    # Weekly trending movies
│   │   ├── StreamingPlatforms.ts    # Available streaming services
│   │   └── ... (40 total API modules)
│   │
│   ├── components/                  # React components
│   │   ├── sections/                # Page section components (36 files)
│   │   │   ├── TopPicksSection.tsx        # Top 10 grid layout
│   │   │   ├── MoviePromo.tsx             # Featured content showcase
│   │   │   ├── NewReleasesSection.tsx     # New content with dates
│   │   │   ├── OnlyOnNetflixSection.tsx   # Original content
│   │   │   ├── AwardWinnersSection.tsx    # Award-winning titles
│   │   │   ├── PlatformsSection.tsx       # Streaming platforms slider
│   │   │   ├── PricingSection.tsx         # Subscription tiers
│   │   │   ├── AskedQuestions.tsx         # FAQ accordion
│   │   │   ├── EpisodesSection.tsx        # TV episode browser
│   │   │   ├── FullCreditsSection.tsx     # Cast and crew display
│   │   │   ├── TrailersSection.tsx        # Video gallery
│   │   │   ├── ReviewsSection.tsx         # User reviews
│   │   │   ├── MoreLikeThisSection.tsx    # Similar content
│   │   │   ├── MediaInfoSection.tsx       # Media metadata
│   │   │   └── ... (28 total sections)
│   │   │
│   │   ├── shared/                  # Reusable components
│   │   │   ├── Card/
│   │   │   │   ├── Card.tsx               # Main card with 15 variants
│   │   │   │   ├── CardPoster.tsx         # Poster image wrapper
│   │   │   │   ├── CardHoverOverlay.tsx   # Hover state overlay
│   │   │   │   ├── CardBadges.tsx         # Trending/award badges
│   │   │   │   ├── CardMetadata.tsx       # Metadata display
│   │   │   │   └── CardVariantLayouts.tsx # Special layouts (10 types)
│   │   │   │
│   │   │   ├── heroSection/
│   │   │   │   ├── HeroSection.tsx        # Auto-rotating carousel
│   │   │   │   ├── HeroSlide.tsx          # Individual hero slide
│   │   │   │   ├── HeroBackground.tsx     # Backdrop with gradients
│   │   │   │   ├── HeroContent.tsx        # Title and buttons
│   │   │   │   └── ActionButtons.tsx      # Play/More Info buttons
│   │   │   │
│   │   │   ├── Slider/
│   │   │   │   └── slider.tsx             # Swiper-based carousel
│   │   │   │
│   │   │   ├── MediaSection.tsx           # Generic media carousel
│   │   │   ├── MediaHero.tsx              # Detail page hero
│   │   │   ├── PersonHero.tsx             # Person detail hero
│   │   │   ├── MovieModal.tsx             # Movie info modal
│   │   │   ├── SharedMovieModal.tsx       # Global modal instance
│   │   │   ├── TrailerModal.tsx           # YouTube trailer modal
│   │   │   ├── SectionHeader.tsx          # Section title with icon
│   │   │   ├── DetailPageNav.tsx          # Detail page tabs
│   │   │   ├── PageTransition.tsx         # Framer Motion wrapper
│   │   │   ├── HelmetMeta.tsx             # SEO meta tags
│   │   │   └── logo/
│   │   │       └── Logo.tsx               # Netflix logo component
│   │   │
│   │   └── ui/                    # Base UI components (ShadCN/Radix)
│   │       ├── button.tsx               # Button with variants
│   │       ├── dialog.tsx               # Modal dialog (Radix)
│   │       ├── drawer.tsx               # Slide-out drawer (Vaul)
│   │       ├── input.tsx                # Text input field
│   │       ├── select.tsx               # Dropdown select
│   │       ├── loader.tsx               # Loading spinner
│   │       ├── error.tsx                # Error state with retry
│   │       ├── SectionSkeleton.tsx      # Skeleton loader
│   │       ├── lazy-wrapper.tsx         # IntersectionObserver wrapper
│   │       ├── OptimizedImage.tsx       # Image with lazy loading
│   │       └── index.ts                 # Barrel exports
│   │
│   ├── contexts/                    # React Context providers
│   │   └── MovieModalContext.tsx    # Modal state management
│   │
│   ├── data/                        # Static data files
│   │   ├── header.ts                # Navigation links
│   │   └── footer.tsx               # Footer links and social
│   │
│   ├── layout/                      # Layout components
│   │   ├── header/
│   │   │   ├── Header.tsx                   # Main header bar
│   │   │   └── components/
│   │   │       ├── NavLinks.tsx             # Desktop navigation
│   │   │       ├── ProfileMenu.tsx          # User dropdown
│   │   │       ├── BrowseDropdown.tsx       # Mobile browse menu
│   │   │       ├── MobileSidebar.tsx        # Mobile drawer
│   │   │       └── search/
│   │   │           ├── SearchButton.tsx     # Search trigger
│   │   │           ├── SearchPopup.tsx      # Search modal
│   │   │           ├── SearchResultCard.tsx # Search result item
│   │   │           └── index.ts
│   │   │
│   │   ├── footer/
│   │   │   ├── Footer.tsx           # Main footer
│   │   │   ├── FooterLink.tsx       # Footer link item
│   │   │   └── index.ts
│   │   │
│   │   └── mainLayout/
│   │       └── MainLayout.tsx       # App wrapper layout
│   │
│   ├── pages/                       # Page components (35 files)
│   │   ├── Home.tsx                 # Main landing page
│   │   ├── Movie.tsx                # Movies browse
│   │   ├── TVShow.tsx               # TV shows browse
│   │   ├── MovieDetails.tsx         # Movie detail page
│   │   ├── TVShowDetails.tsx        # TV series detail
│   │   ├── SeasonDetailsPage.tsx    # Season episodes
│   │   ├── EpisodeDetailsPage.tsx   # Episode detail
│   │   ├── PersonDetails.tsx        # Actor/director profile
│   │   ├── Kids.tsx                 # Kids content
│   │   ├── NewPopular.tsx           # Trending content
│   │   ├── MyList.tsx               # User watchlist
│   │   ├── BrowseByLanguages.tsx    # Language filter
│   │   ├── Actor.tsx                # Actors browse
│   │   ├── NotFound.tsx             # 404 page
│   │   ├── auth/
│   │   │   ├── Login.tsx            # Login form
│   │   │   └── Signup.tsx           # Signup form
│   │   └── movie/                   # Movie sub-pages (7 files)
│   │       ├── MovieReviewsPage.tsx
│   │       ├── MovieVideosPage.tsx
│   │       ├── MovieImagesPage.tsx
│   │       ├── MovieWatchProvidersPage.tsx
│   │       ├── MovieCreditsPage.tsx
│   │       └── MovieRecommendationsPage.tsx
│   │
│   ├── providers/                   # App providers
│   │   └── Providers.tsx            # React Query + Router + Modal
│   │
│   ├── queries/                     # React Query hooks (20 files)
│   │   ├── FetchPopularMovies.tsx
│   │   ├── FetchTopRatedMovies.tsx
│   │   ├── FetchTrendingMoviesWeek.tsx
│   │   ├── FetchSearch.ts           # Combined search hook
│   │   └── index.ts                 # Barrel exports
│   │
│   ├── routes/                      # Routing configuration
│   │   └── Routes.tsx               # React Router setup
│   │
│   ├── store/                       # Redux store (optional, empty)
│   │
│   ├── types/                       # TypeScript type definitions
│   │   ├── movies.ts                # Movie & TV Show types
│   │   ├── movieDetails.ts          # Detailed movie types
│   │   ├── mediaDetails.ts          # Media union types
│   │   ├── person.ts                # Person/actor types
│   │   ├── hero.ts                  # Hero section types
│   │   ├── header.ts                # Header link types
│   │   ├── footer.ts                # Footer link types
│   │   ├── logo.ts                  # Logo props
│   │   └── index.ts                 # Barrel exports
│   │
│   ├── utils/                       # Utility functions (19 files)
│   │   ├── tmdb.ts                  # TMDB image URL helpers
│   │   ├── movieHelpers.ts          # Match score, age rating, year
│   │   ├── slugify.ts               # URL slug generation
│   │   ├── useDebounce.ts           # Debounce hook
│   │   ├── formatRuntime.ts         # Runtime formatter
│   │   ├── extractKeywords.ts       # Keyword extraction
│   │   └── index.ts                 # Barrel exports
│   │
│   ├── hooks/                       # Custom React hooks (extendable)
│   ├── assets/                      # Static assets (images, fonts)
│   ├── styles/                      # Additional CSS files
│   │   └── animations.css           # Custom animations
│   │
│   ├── App.tsx                      # Root component
│   ├── App.css                      # App-specific styles
│   ├── main.tsx                     # Entry point
│   ├── index.css                    # Global styles & CSS variables
│   └── vite-env.d.ts                # Vite type declarations
│
├── tests/                           # Test files
│   └── example.spec.ts              # Playwright E2E example
│
├── scripts/                         # Build scripts
│   └── generate-sitemap.js          # Sitemap generator
│
├── .env.example                     # Environment variables template
├── .gitignore
├── package.json                     # Dependencies and scripts
├── tsconfig.json                    # TypeScript configuration
├── vite.config.ts                   # Vite build configuration
├── vitest.config.ts                 # Vitest test configuration
├── eslint.config.js                 # ESLint configuration
├── playwright.config.ts             # Playwright E2E configuration
├── components.json                  # ShadCN UI configuration
├── vercel.json                      # Vercel deployment config
├── API_ENDPOINTS.md                 # Complete API documentation
└── README.md                        # Main documentation
```

---

## 3. Components

### Core Component Architecture

All components follow these patterns:
- **Memoization**: Components wrapped with `React.memo()` to prevent unnecessary re-renders
- **TypeScript**: Full type safety with interfaces and type guards
- **Tailwind CSS**: Utility-first styling with custom properties
- **Framer Motion**: Page and micro-animations

### Main Component Categories

#### A. Card Component System (`src/components/shared/Card/`)

The Card component is the core building block with 15 variants:

| Variant | Usage | Description |
|---------|-------|-------------|
| `standard` | Default grids | Full card with hover overlay |
| `compact` | Dense carousels | Simplified card for sliders |
| `top10` | Top 10 rankings | Large gradient number badge |
| `newRelease` | New content | NEW badge with release date |
| `awardWinner` | Award content | Gold border and award badge |
| `recommendation` | Because You Watched | Match percentage display |
| `episode` | TV episodes | Still image with episode info |
| `person` | Cast & crew | Profile image with role |
| `review` | User reviews | Author, rating, content preview |
| `season` | TV seasons | Poster with episode count |
| `trailer` | Video gallery | YouTube thumbnail with play |
| `promo` | Featured content | Full-width showcase |
| `continueWatching` | User progress | Progress bar overlay |
| `showcase` | Highlighted content | Large featured card |
| `horizontal` | List layouts | Side-by-side image and text |

**Example Usage:**
```tsx
// Standard card
<Card movie={movie} variant="standard" showBadge />

// Top 10 with rank
<Card movie={movie} variant="top10" rank={1} />

// Episode card
<Card episode={episode} variant="episode" tvShowId={123} seasonNumber={1} />

// Person card
<Card person={person} variant="person" />
```

#### B. Section Components (`src/components/sections/`)

| Component | Purpose | Data Source |
|-----------|---------|-------------|
| `TopPicksSection` | Top 10 grid | Trending movies (top 5) |
| `MoviePromo` | Featured showcase | Single upcoming movie |
| `NewReleasesSection` | New content grid | Upcoming movies (top 4) |
| `OnlyOnNetflixSection` | Originals list | Popular TV shows (top 5) |
| `AwardWinnersSection` | Award winners | Top rated movies (top 6) |
| `PlatformsSection` | Streaming slider | All platforms (paginated) |
| `PricingSection` | Subscription plans | Static data (3 tiers) |
| `AskedQuestions` | FAQ accordion | Static data (6 questions) |
| `MediaSection` | Generic carousel | Any media array |
| `EpisodesSection` | Episode browser | Season episodes |
| `FullCreditsSection` | Cast & crew | Movie/TV credits |
| `TrailersSection` | Video gallery | Movie/TV videos |
| `ReviewsSection` | User reviews | Movie/TV reviews |
| `MoreLikeThisSection` | Similar content | Recommendations |
| `WatchProvidersSection` | Streaming info | Watch providers |
| `KeywordsSection` | Tags/genres | Movie keywords |
| `BiographySection` | Person bio | Person details |
| `KnownForSection` | Person highlights | Person credits |
| `MediaInfoSection` | Media metadata | Movie/TV details |

#### C. Shared Components

| Component | File | Purpose |
|-----------|------|---------|
| `HeroSection` | `heroSection/HeroSection.tsx` | Auto-rotating carousel (5 slides, 8s interval) |
| `HeroSlide` | `heroSection/HeroSlide.tsx` | Individual slide with backdrop |
| `Slider` | `Slider/slider.tsx` | Swiper-based horizontal carousel |
| `MovieModal` | `MovieModal.tsx` | Quick info modal |
| `TrailerModal` | `TrailerModal.tsx` | YouTube trailer player |
| `SectionHeader` | `SectionHeader.tsx` | Title with optional icon and badge |
| `DetailPageNav` | `DetailPageNav.tsx` | Sticky navigation tabs |
| `PageTransition` | `PageTransition.tsx` | Framer Motion page transitions |
| `HelmetMeta` | `HelmetMeta.tsx` | SEO meta tags with react-helmet |
| `MediaHero` | `MediaHero.tsx` | Detail page hero section |
| `PersonHero` | `PersonHero.tsx` | Person detail hero |

#### D. UI Components (`src/components/ui/`)

Built on ShadCN UI and Radix UI primitives:

| Component | Source | Variants |
|-----------|--------|----------|
| `Button` | `button.tsx` | default, destructive, outline, ghost, link |
| `Dialog` | `dialog.tsx` | Modal dialogs with Radix |
| `Drawer` | `drawer.tsx` | Mobile slide-out panels (Vaul) |
| `Input` | `input.tsx` | Text inputs with validation |
| `Select` | `select.tsx` | Dropdown selects |
| `Loader` | `loader.tsx` | Loading spinner |
| `Error` | `error.tsx` | Error state with retry button |
| `SectionSkeleton` | `SectionSkeleton.tsx` | Skeleton loaders (grid, list, hero) |
| `LazyWrapper` | `lazy-wrapper.tsx` | IntersectionObserver lazy loading |
| `OptimizedImage` | `OptimizedImage.tsx` | Image with lazy loading and fallback |

---

## 4. Pages & Routing

### Route Configuration (`src/routes/Routes.tsx`)

All routes use React Router DOM v7 with lazy loading and Framer Motion transitions.

### Main Routes

| Path | Component | Description |
|------|-----------|-------------|
| `/` | `Home.tsx` | Main landing page with all sections |
| `/movies` | `Movie.tsx` | Movies browse page |
| `/tv-shows` | `TVShow.tsx` | TV shows browse page |
| `/kids` | `Kids.tsx` | Kids-friendly content |
| `/new-popular` | `NewPopular.tsx` | Trending content |
| `/my-list` | `MyList.tsx` | User's watchlist |
| `/browse/languages` | `BrowseByLanguages.tsx` | Filter by language |
| `/actors` | `Actor.tsx` | Browse actors |
| `/now-playing` | `NowPlayingMoviesPage.tsx` | Movies in theaters |

### Detail Routes

| Path | Component | Parameters |
|------|-----------|------------|
| `/movie/:slugWithId` | `MovieDetails.tsx` | Movie ID and slug |
| `/movie/:slugWithId/reviews` | `MovieReviewsPage.tsx` | Movie reviews |
| `/movie/:slugWithId/videos` | `MovieVideosPage.tsx` | Movie trailers |
| `/movie/:slugWithId/images` | `MovieImagesPage.tsx` | Movie images |
| `/movie/:slugWithId/watch` | `MovieWatchProvidersPage.tsx` | Streaming providers |
| `/movie/:slugWithId/credits` | `MovieCreditsPage.tsx` | Cast and crew |
| `/movie/:slugWithId/recommendations` | `MovieRecommendationsPage.tsx` | Similar movies |
| `/tv/:slugWithId` | `TVShowDetails.tsx` | TV show details |
| `/tv/:slugWithId/reviews` | `TVReviewsPage.tsx` | TV reviews |
| `/tv/:slugWithId/videos` | `TVVideosPage.tsx` | TV trailers |
| `/tv/:slugWithId/images` | `TVImagesPage.tsx` | TV images |
| `/tv/:slugWithId/watch` | `TVWatchProvidersPage.tsx` | TV streaming providers |
| `/tv/:slugWithId/credits` | `TVCreditsPage.tsx` | TV cast and crew |
| `/tv/:slugWithId/recommendations` | `TVRecommendationsPage.tsx` | Similar TV shows |
| `/tv/:slugWithId/season/:seasonNumber` | `SeasonDetailsPage.tsx` | Season episodes |
| `/tv/:slugWithId/season/:seasonNumber/episode/:episodeNumber` | `EpisodeDetailsPage.tsx` | Episode details |
| `/person/:slugWithId` | `PersonDetails.tsx` | Person profile |
| `/person/:slugWithId/movies` | `PersonMovieCreditsPage.tsx` | Person movie credits |
| `/person/:slugWithId/tv` | `PersonTVCreditsPage.tsx` | Person TV credits |
| `/person/:slugWithId/images` | `PersonImagesPage.tsx` | Person photos |

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

### Fallback Route

| Path | Component |
|------|-----------|
| `*` | `NotFound.tsx` |

### Dynamic Routing Pattern

All detail pages use a slug + ID pattern for SEO-friendly URLs:

```typescript
// URL: /movie/123456-the-matrix
// Extract ID from slug
const id = extractIdFromSlug(slugWithId); // Returns: 123456

// Generate slug with ID
const slug = generateSlug(title); // "the-matrix"
const slugWithId = formatSlugWithId(slug, id); // "the-matrix-123456"
```

### Page Transitions

All pages are wrapped with Framer Motion for smooth transitions:

```tsx
<AnimatePresence mode="wait">
  <Routes location={location} key={location.pathname}>
    <Route
      path="/"
      element={
        <PageTransition>
          <Home />
        </PageTransition>
      }
    />
  </Routes>
</AnimatePresence>
```

---

## 5. State Management

### Server State: TanStack React Query

**Configuration** (`src/providers/Providers.tsx`):

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
export default function usePopularMovies(page: number = 1) {
  const { data, error, refetch, isLoading } = useQuery<Movie[]>({
    queryKey: ["PopularMovies", page],
    queryFn: () => GetPopularMovies(page) as Promise<Movie[]>,
    staleTime: 5 * 60 * 1000,
    retry: 2,
  });

  return { data, error, refetch, isLoading };
}
```

### Local State: React Hooks

**Component State:**

```typescript
// Modal state
const [isOpen, setIsOpen] = useState(false);

// Hover state
const [isHovered, setIsHovered] = useState(false);

// Search query
const [query, setQuery] = useState("");

// Accordion state
const [openIndex, setOpenIndex] = useState<number | null>(null);

// Menu state
const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
```

### Custom Hook: useDebounce

```typescript
// src/utils/useDebounce.ts
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
```

### Context: MovieModalContext

**Global Modal State** (`src/contexts/MovieModalContext.tsx`):

```typescript
interface MovieModalContextType {
  selectedMovie: HeroMedia | null;
  isOpen: boolean;
  openModal: (movie: HeroMedia) => void;
  closeModal: () => void;
}

// Usage
const { openModal } = useMovieModal();
<Card onClick={() => openModal(movie)} />
```

### Redux (Optional)

Redux Toolkit is installed but not currently used. The `src/store/` directory is available for implementing:
- User authentication state
- Viewing history
- My List functionality
- User preferences

---

## 6. API Integration

### Base Configuration

```typescript
const apiBaseUrl = "https://api.themoviedb.org/3";
const apiKey = import.meta.env.VITE_TMDB_API_KEY || "aa9d055a1e5bce0d2c4d627c24422d51";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p";
```

### Image URL Helpers (`src/utils/tmdb.ts`)

```typescript
export const getPosterUrl = (path: string, size: string = "w500"): string => {
  if (!path) return "/placeholder.jpg";
  return `${IMAGE_BASE_URL}/${size}${path}`;
};

export const getBackdropUrl = (path: string, size: string = "w780"): string => {
  if (!path) return "/placeholder.jpg";
  return `${IMAGE_BASE_URL}/${size}${path}`;
};

export const getProfileUrl = (path: string, size: string = "w185"): string => {
  if (!path) return "/placeholder.jpg";
  return `${IMAGE_BASE_URL}/${size}${path}`;
};
```

### Complete API Endpoints

See `API_ENDPOINTS.md` for full documentation. Key categories:

| Category | Endpoints |
|----------|-----------|
| Movies | Popular, Top Rated, Now Playing, Upcoming, Trending |
| TV Shows | Popular, Top Rated, Airing Today, On The Air, Trending |
| Details | Movie Details, TV Details, Season, Episode |
| Person | Details, Movie Credits, TV Credits, Images |
| Search | Movies, TV Shows, People, Multi |
| Additional | Genres, Watch Providers, Reviews, Videos, Images |

### Caching Strategy

| Query Type | Stale Time | Retry |
|------------|------------|-------|
| Movies/TV Lists | 5 minutes | 2 |
| Details | 10 minutes | 2 |
| Search | 5 minutes | 1 |
| Platforms | 10 minutes | 2 |
| Person | 15 minutes | 2 |

---

## 7. Performance Optimization

### Code Splitting

**Route-based Splitting:**

```typescript
const MovieDetails = lazy(() => import("@/pages/MovieDetails"));
<Suspense fallback={<PageSkeleton />}>
  <MovieDetails />
</Suspense>
```

### Lazy Loading

**IntersectionObserver Wrapper:**

```typescript
const LazyWrapper = memo(({ children, placeholder, height }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
      }
    }, { threshold: 0, rootMargin: "500px" });

    observer.observe(element);
    return () => observer.unobserve(element);
  }, []);

  return isVisible ? children : placeholder;
});
```

### Memoization

```typescript
// Component
const Card = memo(({ movie, variant }) => { ... });

// Values
const posterUrl = useMemo(() => ..., [movie.poster_path]);

// Callbacks
const handleRetry = useCallback(() => refetch(), [refetch]);
```

### Image Optimization

```typescript
const OptimizedImage = memo(({ src, alt, priority = false }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  
  return (
    <div className="relative overflow-hidden">
      {!isLoaded && <div className="absolute inset-0 bg-zinc-800 animate-pulse" />}
      <img
        src={src}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        className={cn(isLoaded ? "opacity-100" : "opacity-0")}
        onLoad={() => setIsLoaded(true)}
      />
    </div>
  );
});
```

### Build Optimization (vite.config.ts)

**Manual Chunks:**
- `react-vendor`: React core libraries
- `animation-vendor`: Framer Motion
- `ui-vendor`: Radix UI + Lucide
- `data-vendor`: React Query + Axios
- `swiper-vendor`: Swiper library
- `page-home`: Home page code splitting

**Image Compression:**
- mozjpeg: quality 75, progressive
- pngquant: quality 0.65-0.8
- svgo: preset-default

---

## 8. UI/UX Notes

### Accessibility Features

**ARIA Labels:**
```tsx
<button aria-label="Notifications">
  <Bell className="w-5 h-5" />
</button>
```

**Keyboard Navigation:**
```tsx
useEffect(() => {
  const handleEsc = (event: KeyboardEvent) => {
    if (event.key === "Escape" && isOpen) {
      onClose();
    }
  };
  document.addEventListener("keydown", handleEsc);
  return () => document.removeEventListener("keydown", handleEsc);
}, [isOpen, onClose]);
```

**Focus Management:**
```tsx
className="focus-visible:ring-2 focus-visible:ring-[var(--netflix-red)]"
```

### Animations

**Page Transitions:**
```tsx
<motion.div
  animate={{ opacity: 1, y: 0 }}
  exit={{ opacity: 0, y: -20 }}
  transition={{ duration: 0.4, ease: "easeOut" }}
>
```

**Card Hover Effects:**
```tsx
<motion.div
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
>
```

### Responsive Design

**Container System:**
```tsx
.container {
  @apply mx-auto px-4 sm:px-6 md:px-12 lg:px-16 max-w-7xl;
}
```

**Grid Breakpoints:**
```tsx
className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
```

---

## 9. Libraries & Dependencies

### Production Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| `react` | 19.2.0 | UI framework |
| `react-router-dom` | 7.13.1 | Client-side routing |
| `@tanstack/react-query` | 5.90.21 | Server state management |
| `framer-motion` | 12.34.3 | Animation library |
| `axios` | 1.13.6 | HTTP client |
| `swiper` | 12.1.2 | Carousel/slider |
| `tailwindcss` | 4.2.1 | Utility-first CSS |
| `radix-ui` | 1.4.3 | Accessible UI primitives |
| `lucide-react` | 0.575.0 | Icon library |

### Development Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| `vite` | 7.3.1 | Build tool & dev server |
| `typescript` | 5.9.3 | Type safety |
| `eslint` | 9.39.1 | Code linting |
| `vitest` | 4.0.18 | Unit testing |
| `@playwright/test` | 1.58.2 | E2E testing |

---

## 10. Known Issues & Warnings

### Console Warnings

- Some images may fail to load on slow connections (mitigated with fallback)
- Navigation buttons may appear briefly before Swiper initializes

### Accessibility Alerts

- All images have dynamic alt text from movie/TV titles
- Dark theme maintains WCAG AA compliance
- All interactive elements are keyboard accessible

### Performance Issues

- **Large Image Payloads:** Hero section loads 5 large backdrop images
  - Mitigation: Lazy loading, smaller image variants (w500 vs w780)
- **Multiple Swiper Instances:** Home page has 4+ carousel instances
  - Mitigation: Memoization, lazy loading with LazyWrapper
- **Framer Motion Overhead:** Every card uses motion.div
  - Mitigation: Consider CSS transitions for simple animations

---

## 11. Getting Started

### Prerequisites

- **Node.js:** 18+ (recommended: 20+)
- **npm/yarn/pnpm:** Latest version
- **Git:** For version control

### Installation Steps

**1. Clone the Repository**
```bash
git clone https://github.com/your-username/netflix-clone.git
cd netflix-clone
```

**2. Install Dependencies**
```bash
npm install
```

**3. Create Environment File**
```bash
cp .env.example .env
```

**4. Configure Environment Variables**
```env
VITE_TMDB_API_KEY=your_api_key_here
VITE_TMDB_BASE_URL=https://api.themoviedb.org/3
VITE_TMDB_IMAGE_BASE_URL=https://image.tmdb.org/t/p
```

**5. Start Development Server**
```bash
npm run dev
```

**6. Open in Browser**
```
http://localhost:5173
```

### Build for Production

```bash
npm run build
npm run preview
```

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server (Vite) on port 5173 |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |
| `npm run test` | Run Vitest tests |
| `npm run test:e2e` | Run Playwright E2E tests |

---

## 12. Contributing Guidelines

### Code Style

**TypeScript:**
- Use TypeScript for all new code
- Define interfaces for all props and data structures
- Avoid `any` type; use proper type guards

**Naming Conventions:**
- Components: PascalCase (`MovieCard`)
- Files: PascalCase for components, camelCase for utilities
- Variables: camelCase
- Constants: UPPER_SNAKE_CASE

### Git Workflow

**Branch Naming:**
```
feature/add-new-section
fix/hero-image-loading
docs/update-readme
```

**Commit Messages (Conventional Commits):**
```
feat: add new Awards section to homepage
fix: resolve image loading issue in hero carousel
docs: update API documentation
refactor: simplify card variant logic
```

### Testing Requirements

**Unit Tests:**
```typescript
describe("getMatchScore", () => {
  it("should return correct percentage", () => {
    expect(getMatchScore(8.5)).toBe(85);
  });
});
```

### Performance Guidelines

**Do:**
- Use `React.memo()` for pure components
- Memoize expensive calculations with `useMemo`
- Lazy load below-fold content
- Use skeleton loaders for loading states

**Don't:**
- Create objects/arrays in JSX without memoization
- Load all data on initial page load
- Use heavy animations on scroll

### Accessibility Checklist

- [ ] All images have alt text
- [ ] Interactive elements are keyboard accessible
- [ ] Focus indicators are visible
- [ ] Color contrast meets WCAG AA
- [ ] Form inputs have labels

---

## 🎓 Learning Resources

- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [TanStack Query Guide](https://tanstack.com/query/latest/docs/react/overview)
- [TMDB API Documentation](https://developers.themoviedb.org/3)

---

*Last Updated: March 2026*
