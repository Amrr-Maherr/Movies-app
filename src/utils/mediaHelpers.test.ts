import { describe, it, expect } from 'vitest';
import { getTitle } from './getTitle';
import { getReleaseDate } from './getReleaseDate';
import { getRuntime } from './getRuntime';
import { getReleaseYear } from './getReleaseYear';

describe('Media Helpers', () => {
  describe('getTitle', () => {
    it('should return title for movie objects', () => {
      const movie = { title: 'Inception', id: 1 };
      expect(getTitle(movie as any)).toBe('Inception');
    });

    it('should return name for TV show objects', () => {
      const tvShow = { name: 'Breaking Bad', id: 1 };
      expect(getTitle(tvShow as any)).toBe('Breaking Bad');
    });

    it('should handle empty strings', () => {
      const movie = { title: '', id: 1 };
      expect(getTitle(movie as any)).toBe('');
    });
  });

  describe('getReleaseDate', () => {
    it('should return release_date for movies', () => {
      const movie = { release_date: '2023-01-15', id: 1 };
      expect(getReleaseDate(movie as any)).toBe('2023-01-15');
    });

    it('should return first_air_date for TV shows', () => {
      const tvShow = { first_air_date: '2022-06-01', id: 1 };
      expect(getReleaseDate(tvShow as any)).toBe('2022-06-01');
    });
  });

  describe('getRuntime', () => {
    it('should return runtime for movies', () => {
      const movie = { runtime: 120, id: 1 };
      expect(getRuntime(movie as any)).toBe(120);
    });

    it('should return runtime from last_episode_to_air for TV shows', () => {
      const tvShow = {
        runtime: null,
        last_episode_to_air: { runtime: 45 },
        id: 1,
      };
      expect(getRuntime(tvShow as any)).toBe(45);
    });

    it('should return null when runtime is not available', () => {
      const movie = { runtime: null, id: 1 };
      expect(getRuntime(movie as any)).toBe(null);
    });

    it('should return null for TV show without episode runtime', () => {
      const tvShow = {
        runtime: null,
        last_episode_to_air: null,
        id: 1,
      };
      expect(getRuntime(tvShow as any)).toBe(null);
    });
  });

  describe('getReleaseYear', () => {
    it('should extract year from movie release_date', () => {
      const movie = { release_date: '2023-01-15', id: 1, vote_average: 7 };
      expect(getReleaseYear(movie as any)).toBe('2023');
    });

    it('should extract year from TV show first_air_date', () => {
      const tvShow = { first_air_date: '2022-06-01', id: 1, vote_average: 7 };
      expect(getReleaseYear(tvShow as any)).toBe('2022');
    });

    it('should return undefined for missing date', () => {
      const media = { release_date: '', id: 1, vote_average: 7 };
      expect(getReleaseYear(media as any)).toBe('');
    });
  });
});
