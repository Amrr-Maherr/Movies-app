import { Helmet } from "react-helmet";

interface HelmetMetaProps {
  /** The name of the Movie, Series, Season, Actor, or Episode */
  name: string;
  /** A brief description of the item */
  description: string;
  /** Full URL to an image for social sharing (OG/Twitter) */
  image?: string;
  /** Canonical URL of the page */
  url?: string;
  /** Open Graph type (e.g., 'video.movie', 'video.tv_show', 'profile', 'video.episode') */
  type?: string;
  /** Additional keywords for SEO */
  keywords?: string;
  /** Content rating (e.g., 'PG-13', 'TV-MA') */
  rating?: string;
  /** Release or air date */
  date?: string;
}

/**
 * HelmetMeta Component
 *
 * A reusable component to set dynamic HTML head content for each page.
 * Sets the page title, meta description, Open Graph, and Twitter Card tags for SEO.
 *
 * @example
 * // For a movie page
 * <HelmetMeta
 *   name="Avengers: Endgame"
 *   description="Avengers: Endgame is an epic conclusion to the Marvel superhero saga..."
 *   image="https://image.tmdb.org/t/p/original/poster.jpg"
 *   url="https://www.myapp.com/movies/123456"
 *   type="video.movie"
 *   keywords="action, adventure, sci-fi, marvel"
 *   rating="PG-13"
 *   date="2019-04-26"
 * />
 *
 * @example
 * // For a series page
 * <HelmetMeta
 *   name="Breaking Bad"
 *   description="A high school chemistry teacher turned methamphetamine producer..."
 *   image="https://image.tmdb.org/t/p/original/poster.jpg"
 *   url="https://www.myapp.com/series/123456"
 *   type="video.tv_show"
 * />
 *
 * @example
 * // For an actor page
 * <HelmetMeta
 *   name="Robert Downey Jr."
 *   description="Robert Downey Jr. is an American actor known for Iron Man, Sherlock Holmes..."
 *   image="https://image.tmdb.org/t/p/original/profile.jpg"
 *   url="https://www.myapp.com/actors/123456"
 *   type="profile"
 * />
 */
const HelmetMeta = ({
  name,
  description,
  image,
  url,
  type = 'website',
  keywords,
  rating,
  date,
}: HelmetMetaProps) => {
  const siteName = 'Netflix';
  const fullTitle = `${name} | ${siteName}`;
  const imageUrl = image || 'https://www.myapp.com/og-default.jpg';
  const pageUrl = url || (typeof window !== 'undefined' ? window.location.href : 'https://www.myapp.com');

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      {rating && <meta name="rating" content={rating} />}
      {date && <meta name="date" content={date} />}

      {/* Canonical URL */}
      <link rel="canonical" href={pageUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:site_name" content={siteName} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />

      {/* Robots */}
      <meta name="robots" content="index, follow" />
    </Helmet>
  );
};

export default HelmetMeta;
