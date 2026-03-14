import { describe, it, expect } from 'vitest';
import { getMatchScore, getYear, getAgeRating, getGenres } from './movieHelpers';

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
});
