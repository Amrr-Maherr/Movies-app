# Adult Content Blur & +18 Badge - Implementation Status

## ✅ Completed

### Core Components (100% Complete)

1. **CardBadges.tsx** ✅
   - Added `isAdult` prop
   - +18 badge with red background and backdrop blur
   - Hides match score and rating for adult content

2. **CardPoster.tsx** ✅
   - Added `isAdult` prop
   - Blur effect (`blur-md scale-105`)
   - Dark overlay (`bg-black/60 backdrop-blur-sm`)

3. **Card.tsx** ✅
   - Standard variant: Full adult content support
   - Compact variant: Full adult content support
   - Automatically detects `movie.adult === true`

### Variant Layouts (1/10 Complete)

4. **NewReleaseLayout.tsx** ✅
   - Blur effect on poster
   - +18 badge
   - Hides NEW and rating badges for adult content

---

## ⚠️ Needs Update (9 variants remaining)

The following variant layouts need adult content support added:

### Priority: High (Commonly Used)

1. **RecommendationLayout.tsx**
   - Needs: Blur, +18 badge, hide match %
2. **HorizontalLayout.tsx**
   - Needs: Blur, +18 badge, hide rating
3. **LandscapeLayout.tsx**
   - Needs: Blur, +18 badge, hide HOT/match %

4. **ShowcaseLayout.tsx**
   - Needs: Blur, +18 badge, hide badges

### Priority: Medium

5. **AwardWinnerLayout.tsx**
   - Needs: Blur, +18 badge, hide award badge
6. **PromoLayout.tsx**
   - Needs: Blur, +18 badge, hide rating
7. **TrailerLayout.tsx**
   - Needs: Blur, +18 badge

### Priority: Low (Specific Use Cases)

8. **SeasonLayout.tsx**
   - Needs: Blur, +18 badge
9. **EpisodeLayout.tsx**
   - Needs: Blur, +18 badge

10. **Top10Badge.tsx**
    - Needs: Blur on background, +18 badge

---

## Implementation Pattern

For each variant, follow this pattern:

```typescript
// 1. Add movie prop to interface
export interface VariantLayoutProps {
  movie: HeroMedia;  // Add this
  title: string;
  posterUrl: string;
  // ... other props
}

// 2. Check for adult content
const VariantLayout = memo(({ movie, ... }: Props) => {
  const isAdult = movie.adult === true;

  return (
    <>
      {/* 3. Apply blur to image */}
      <OptimizedImage
        src={posterUrl}
        alt={title}
        className={`w-full h-full transition-all duration-300 ${
          isAdult ? "blur-md" : ""
        }`}
        objectFit="cover"
      />

      {/* 4. Add dark overlay */}
      {isAdult && (
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      )}

      {/* 5. Add +18 badge */}
      {isAdult && (
        <div className="absolute top-2 right-2 z-30 bg-red-700/95 backdrop-blur-sm text-white text-xs font-bold px-2 py-1 rounded shadow-lg border border-red-500/50">
          +18
        </div>
      )}

      {/* 6. Hide other badges for adult content */}
      {!isAdult && (
        // ... existing badges
      )}
    </>
  );
});
```

---

## Visual Effects

When `movie.adult === true`:

| Effect      | CSS Class                      | Description                    |
| ----------- | ------------------------------ | ------------------------------ |
| **Blur**    | `blur-md`                      | Medium blur on poster image    |
| **Scale**   | `scale-105`                    | Slight zoom to hide blur edges |
| **Overlay** | `bg-black/60 backdrop-blur-sm` | Dark semi-transparent overlay  |
| **Badge**   | Custom +18                     | Red badge with backdrop blur   |

---

## Testing

To test adult content display:

1. Find media with `adult: true` in TMDB
2. Or manually set `adult: true` in API response for testing
3. Verify all card variants show:
   - ✅ Blurred image
   - ✅ Dark overlay
   - ✅ +18 badge visible
   - ✅ Match score/rating hidden

---

## Git Commits

```
feat: add adult content blur and +18 badge to cards
feat: add adult content support to NewReleaseLayout
```

---

## Next Steps

1. Update remaining 9 variant layouts
2. Test with actual adult content from TMDB
3. Verify responsive design on mobile
4. Check accessibility (screen readers should announce "+18")

---

**Status: 20% Complete (2/10 variants + core components)**

_Last updated: March 19, 2026_
