# Home Page Sections

This directory contains all UI sections used in the Home page.

## Components:

### Content Sections
- **TopPicksSection** - Top 10 grid with large numbered badges
- **NewReleasesSection** - New releases with "NEW" badges and dates
- **ContinueWatchingSection** - Continue watching with progress bars
- **GenreShowcaseSection** - Featured showcase with side grid
- **OnlyOnNetflixSection** - Netflix Originals horizontal cards
- **BecauseYouWatchedSection** - Recommendations with match percentages
- **WeekendWatchSection** - Featured weekend pick with side list
- **BingeWorthySection** - Binge-worthy content with flame badges
- **AwardWinnersSection** - Award-winning content with trophy badges

### Promo & Info
- **MoviePromo** - Full-width hero promo (left/right/center variants)
- **PricingSection** - Three-tier pricing cards
- **AskedQuestions** - FAQ accordion section

## Usage:

```tsx
import TopPicksSection from "@/components/sections/TopPicksSection";

<TopPicksSection 
  movies={data} 
  title="Top 10 Movies" 
  mediaType="movie" 
/>
```

All components follow the same pattern with:
- Responsive design (mobile/tablet/desktop)
- Hover effects and transitions
- Netflix color scheme
- TypeScript typing
