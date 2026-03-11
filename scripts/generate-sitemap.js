/**
 * Sitemap Generator Script
 * 
 * This script generates a sitemap.xml file by fetching data from the TMDB API
 * and creating URLs for all movies, series, actors, seasons, and episodes.
 * 
 * Usage: npm run sitemap
 */

import { writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

// Get __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Configuration
const BASE_URL = 'https://www.myapp.com';
const TMDB_API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

// Sitemap settings
const CHANGE_FREQ = 'daily';
const PRIORITY = '0.7';

/**
 * Fetch data from TMDB API
 */
async function fetchFromTMDB(endpoint, page = 1) {
  const url = new URL(`${TMDB_BASE_URL}${endpoint}`);
  url.searchParams.append('api_key', TMDB_API_KEY);
  url.searchParams.append('language', 'en-US');
  url.searchParams.append('page', page.toString());

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching ${endpoint}:`, error.message);
    return null;
  }
}

/**
 * Generate URL entry for sitemap
 */
function generateUrlEntry(loc, lastmod = new Date().toISOString().split('T')[0]) {
  return `  <url>
    <loc>${loc}</loc>
    <changefreq>${CHANGE_FREQ}</changefreq>
    <priority>${PRIORITY}</priority>
    <lastmod>${lastmod}</lastmod>
  </url>`;
}

/**
 * Fetch all pages of results from TMDB
 */
async function fetchAllPages(endpoint, maxPages = 5) {
  const allResults = [];
  let page = 1;
  let totalPages = 1;

  while (page <= totalPages && page <= maxPages) {
    console.log(`  Fetching page ${page}...`);
    const data = await fetchFromTMDB(endpoint, page);
    
    if (data) {
      allResults.push(...(data.results || []));
      totalPages = data.total_pages || 1;
      page++;
      
      // Rate limiting - wait between requests
      if (page <= totalPages && page <= maxPages) {
        await new Promise(resolve => setTimeout(resolve, 100));
      }
    } else {
      break;
    }
  }

  return allResults;
}

/**
 * Generate sitemap for movies
 */
async function generateMovieSitemap() {
  console.log('Fetching movies...');
  const movies = await fetchAllPages('/movie/popular', 3);
  
  return movies.map(movie => 
    generateUrlEntry(`${BASE_URL}/movies/${movie.id}`)
  );
}

/**
 * Generate sitemap for TV shows (series)
 */
async function generateSeriesSitemap() {
  console.log('Fetching TV shows...');
  const series = await fetchAllPages('/tv/popular', 3);
  
  return series.map(show => 
    generateUrlEntry(`${BASE_URL}/series/${show.id}`)
  );
}

/**
 * Generate sitemap for actors (people)
 */
async function generateActorsSitemap() {
  console.log('Fetching actors...');
  const people = await fetchAllPages('/person/popular', 3);
  
  return people.map(person => 
    generateUrlEntry(`${BASE_URL}/actors/${person.id}`)
  );
}

/**
 * Generate sitemap for seasons
 * Note: Seasons are fetched per TV show
 */
async function generateSeasonsSitemap() {
  console.log('Fetching TV shows for seasons...');
  const series = await fetchAllPages('/tv/popular', 2);
  const seasonUrls = [];

  for (const show of series.slice(0, 20)) { // Limit to 20 shows to avoid too many requests
    const showDetails = await fetchFromTMDB(`/tv/${show.id}`);
    
    if (showDetails && showDetails.seasons) {
      for (const season of showDetails.seasons) {
        if (season.season_number > 0) { // Skip season 0 (specials)
          seasonUrls.push(
            generateUrlEntry(`${BASE_URL}/seasons/${show.id}/${season.season_number}`)
          );
        }
      }
    }
    
    // Rate limiting
    await new Promise(resolve => setTimeout(resolve, 100));
  }

  return seasonUrls;
}

/**
 * Generate sitemap for episodes
 * Note: Episodes are fetched per season
 */
async function generateEpisodesSitemap() {
  console.log('Fetching TV shows for episodes...');
  const series = await fetchAllPages('/tv/popular', 2);
  const episodeUrls = [];

  for (const show of series.slice(0, 10)) { // Limit to 10 shows to avoid too many requests
    const showDetails = await fetchFromTMDB(`/tv/${show.id}`);
    
    if (showDetails && showDetails.seasons) {
      for (const season of showDetails.seasons.slice(0, 2)) { // Limit seasons per show
        if (season.season_number > 0) {
          const seasonDetails = await fetchFromTMDB(
            `/tv/${show.id}/season/${season.season_number}`
          );
          
          if (seasonDetails && seasonDetails.episodes) {
            for (const episode of seasonDetails.episodes.slice(0, 5)) { // Limit episodes per season
              episodeUrls.push(
                generateUrlEntry(
                  `${BASE_URL}/episodes/${show.id}/${season.season_number}/${episode.episode_number}`
                )
              );
            }
          }
          
          // Rate limiting
          await new Promise(resolve => setTimeout(resolve, 100));
        }
      }
    }
    
    // Rate limiting
    await new Promise(resolve => setTimeout(resolve, 100));
  }

  return episodeUrls;
}

/**
 * Generate static pages sitemap
 */
function generateStaticSitemap() {
  const today = new Date().toISOString().split('T')[0];
  
  return [
    generateUrlEntry(`${BASE_URL}/`, today),
    generateUrlEntry(`${BASE_URL}/movies`),
    generateUrlEntry(`${BASE_URL}/tv-shows`),
    generateUrlEntry(`${BASE_URL}/actors`),
    generateUrlEntry(`${BASE_URL}/new-popular`),
    generateUrlEntry(`${BASE_URL}/kids`),
    generateUrlEntry(`${BASE_URL}/browse/languages`),
  ];
}

/**
 * Main function to generate complete sitemap
 */
async function generateSitemap() {
  console.log('🚀 Starting sitemap generation...\n');

  if (!TMDB_API_KEY) {
    console.error('❌ Error: REACT_APP_TMDB_API_KEY environment variable is not set');
    console.log('Please set it in your .env file or run:');
    console.log('  set REACT_APP_TMDB_API_KEY=your_api_key (Windows)');
    console.log('  export REACT_APP_TMDB_API_KEY=your_api_key (Unix)\n');
    process.exit(1);
  }

  const urlEntries = [];

  // Add static pages
  console.log('Adding static pages...');
  urlEntries.push(...generateStaticSitemap());

  // Add dynamic pages
  console.log('\nFetching dynamic content...');
  
  try {
    const [movies, series, actors, seasons, episodes] = await Promise.all([
      generateMovieSitemap(),
      generateSeriesSitemap(),
      generateActorsSitemap(),
      generateSeasonsSitemap(),
      generateEpisodesSitemap(),
    ]);

    urlEntries.push(...movies);
    console.log(`  ✓ Added ${movies.length} movies`);

    urlEntries.push(...series);
    console.log(`  ✓ Added ${series.length} series`);

    urlEntries.push(...actors);
    console.log(`  ✓ Added ${actors.length} actors`);

    urlEntries.push(...seasons);
    console.log(`  ✓ Added ${seasons.length} seasons`);

    urlEntries.push(...episodes);
    console.log(`  ✓ Added ${episodes.length} episodes`);
  } catch (error) {
    console.error('Error generating dynamic content:', error.message);
  }

  // Build final sitemap XML
  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries.join('\n')}
</urlset>
`;

  // Write to file
  const outputPath = join(__dirname, '..', 'public', 'sitemap.xml');
  writeFileSync(outputPath, sitemapXml, 'utf-8');

  console.log(`\n✅ Sitemap generated successfully!`);
  console.log(`📁 Output: ${outputPath}`);
  console.log(`📊 Total URLs: ${urlEntries.length}`);
}

// Run the generator
generateSitemap().catch(console.error);
