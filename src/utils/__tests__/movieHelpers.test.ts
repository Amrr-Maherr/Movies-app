import { describe, it, expect } from 'vitest';
import { getMatchScore, getYear, getAgeRating, getGenres, getTrailerEmbedUrl, getTrailerWatchUrl } from '../movieHelpers';
import type { Video } from '@/types';

describe('Movie Helpers', () => {
  describe('getMatchScore', () => {
    it('should calculate match score from vote average', () => {
      expect(getMatchScore(8.5)).toBe(85);
      expect(getMatchScore(7.0)).toBe(70);
      expect(getMatchScore(9.2)).toBe(92);
    });

    it('should handle zero vote average', () => {
      expect(getMatchScore(0)).toBe(0);
    });

    it('should handle perfect score', () => {
      expect(getMatchScore(10)).toBe(100);
    });

    it('should round to nearest integer', () => {
      expect(getMatchScore(7.3)).toBe(73);
      expect(getMatchScore(7.6)).toBe(76);
    });
  });

  describe('getYear', () => {
    it('should extract year from date string', () => {
      expect(getYear('2023-01-15')).toBe('2023');
      expect(getYear('2022-06-01')).toBe('2022');
      expect(getYear('1999-12-31')).toBe('1999');
    });

    it('should return empty string for empty input', () => {
      expect(getYear('')).toBe('');
    });

    it('should return empty string for invalid date format', () => {
      expect(getYear('invalid')).toBe('invalid');
    });
  });

  describe('getAgeRating', () => {
    it('should return 16+ for high vote average (>= 7)', () => {
      expect(getAgeRating(7)).toBe('16+');
      expect(getAgeRating(8.5)).toBe('16+');
      expect(getAgeRating(10)).toBe('16+');
    });

    it('should return 13+ for medium vote average (>= 5 and < 7)', () => {
      expect(getAgeRating(5)).toBe('13+');
      expect(getAgeRating(6.9)).toBe('13+');
      expect(getAgeRating(5.5)).toBe('13+');
    });

    it('should return PG for low vote average (< 5)', () => {
      expect(getAgeRating(4.9)).toBe('PG');
      expect(getAgeRating(3)).toBe('PG');
      expect(getAgeRating(0)).toBe('PG');
    });
  });

  describe('getGenres', () => {
    it('should convert genre IDs to names', () => {
      expect(getGenres([28, 12, 16])).toEqual(['Action', 'Adventure', 'Animation']);
      expect(getGenres([35, 80, 18])).toEqual(['Comedy', 'Crime', 'Drama']);
    });

    it('should limit to first 3 genres', () => {
      const manyGenres = [28, 12, 16, 35, 80, 18, 27];
      expect(getGenres(manyGenres)).toEqual(['Action', 'Adventure', 'Animation']);
    });

    it('should handle unknown genre IDs', () => {
      expect(getGenres([99999])).toEqual(['Unknown']);
    });

    it('should handle empty array', () => {
      expect(getGenres([])).toEqual([]);
    });

    it('should handle mixed known and unknown IDs', () => {
      expect(getGenres([28, 99999, 12])).toEqual(['Action', 'Unknown', 'Adventure']);
    });
  });

  describe('getTrailerEmbedUrl', () => {
    const createVideo = (key: string, type: string = 'Trailer', site: string = 'YouTube'): Video => ({
      id: 'video-1',
      key,
      name: 'Test Trailer',
      site,
      type,
      published_at: '2023-01-01',
      official: true,
    });

    it('should return embed URL for YouTube trailer', () => {
      const videos = { results: [createVideo('abc123')] };
      const result = getTrailerEmbedUrl(videos);
      expect(result).toContain('https://www.youtube.com/embed/abc123');
      expect(result).toContain('autoplay=1');
      expect(result).toContain('mute=1');
      expect(result).toContain('loop=1');
      expect(result).toContain('playlist=abc123');
    });

    it('should return null for undefined videos', () => {
      expect(getTrailerEmbedUrl(undefined)).toBeNull();
      expect(getTrailerEmbedUrl(null)).toBeNull();
    });

    it('should return null for empty results', () => {
      expect(getTrailerEmbedUrl({ results: [] })).toBeNull();
    });

    it('should return null if no YouTube trailer found', () => {
      const videos = {
        results: [
          createVideo('xyz789', 'Trailer', 'Vimeo'),
          createVideo('def456', 'Teaser', 'YouTube'),
        ],
      };
      expect(getTrailerEmbedUrl(videos)).toBeNull();
    });

    it('should find trailer among other video types', () => {
      const videos = {
        results: [
          createVideo('clip1', 'Clip'),
          createVideo('teaser1', 'Teaser'),
          createVideo('trailer1', 'Trailer'),
          createVideo('behind1', 'Behind the Scenes'),
        ],
      };
      expect(getTrailerEmbedUrl(videos)).toContain('https://www.youtube.com/embed/trailer1');
    });

    it('should return first YouTube trailer when multiple exist', () => {
      const videos = {
        results: [
          createVideo('trailer1'),
          createVideo('trailer2'),
          createVideo('trailer3'),
        ],
      };
      expect(getTrailerEmbedUrl(videos)).toContain('https://www.youtube.com/embed/trailer1');
    });

    it('should include all required URL parameters', () => {
      const videos = { results: [createVideo('test123')] };
      const result = getTrailerEmbedUrl(videos)!;

      expect(result).toContain('controls=0');
      expect(result).toContain('showinfo=0');
      expect(result).toContain('rel=0');
      expect(result).toContain('modestbranding=1');
      expect(result).toContain('enablejsapi=1');
      expect(result).toContain('playsinline=1');
    });
  });

  describe('getTrailerWatchUrl', () => {
    const createVideo = (key: string, type: string = 'Trailer', site: string = 'YouTube'): Video => ({
      id: 'video-1',
      key,
      name: 'Test Trailer',
      site,
      type,
      published_at: '2023-01-01',
      official: true,
    });

    it('should return watch URL for YouTube trailer', () => {
      const videos = { results: [createVideo('abc123')] };
      const result = getTrailerWatchUrl(videos);
      expect(result).toBe('https://www.youtube.com/watch?v=abc123');
    });

    it('should return null for undefined videos', () => {
      expect(getTrailerWatchUrl(undefined)).toBeNull();
      expect(getTrailerWatchUrl(null)).toBeNull();
    });

    it('should return null for empty results', () => {
      expect(getTrailerWatchUrl({ results: [] })).toBeNull();
    });

    it('should return null if no YouTube trailer found', () => {
      const videos = {
        results: [
          createVideo('xyz789', 'Trailer', 'Vimeo'),
          createVideo('def456', 'Teaser', 'YouTube'),
        ],
      };
      expect(getTrailerWatchUrl(videos)).toBeNull();
    });

    it('should return first YouTube trailer when multiple exist', () => {
      const videos = {
        results: [
          createVideo('trailer1'),
          createVideo('trailer2'),
        ],
      };
      expect(getTrailerWatchUrl(videos)).toBe('https://www.youtube.com/watch?v=trailer1');
    });
  });
});
