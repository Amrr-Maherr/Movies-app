import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { formatDate } from './formatDate';
import { calculateAge } from './calculateAge';
import { formatRuntime } from './formatRuntime';
import { formatNumber } from './formatNumber';
import { getLanguageName } from './getLanguageName';

describe('Date Helpers', () => {
  describe('formatDate', () => {
    it('should format a valid date string to "Month Day, Year" format', () => {
      expect(formatDate('2023-01-15')).toBe('January 15, 2023');
      expect(formatDate('2022-06-01')).toBe('June 1, 2022');
      expect(formatDate('2021-12-31')).toBe('December 31, 2021');
    });

    it('should return empty string for null input', () => {
      expect(formatDate(null)).toBe('');
    });

    it('should return empty string for undefined input', () => {
      expect(formatDate(undefined as any)).toBe('');
    });

    it('should return empty string for empty string input', () => {
      expect(formatDate('')).toBe('');
    });

    it('should return "Invalid Date" for invalid date', () => {
      expect(formatDate('invalid-date')).toBe('Invalid Date');
    });
  });

  describe('calculateAge', () => {
    const originalDate = Date.now;

    beforeEach(() => {
      // Mock current date to 2026-03-14
      Date.now = vi.fn(() => new Date('2026-03-14').getTime());
    });

    afterEach(() => {
      Date.now = originalDate;
    });

    it('should calculate age from birthday when deathday is null', () => {
      expect(calculateAge('1990-01-15', null)).toBe(36);
      expect(calculateAge('2000-06-20', null)).toBe(25);
    });

    it('should calculate age at death when deathday is provided', () => {
      expect(calculateAge('1990-01-15', '2020-06-01')).toBe(30);
      expect(calculateAge('1950-03-20', '2020-01-15')).toBe(69);
    });

    it('should return null when birthday is null', () => {
      expect(calculateAge(null, null)).toBe(null);
    });

    it('should handle birthday not yet occurred this year', () => {
      expect(calculateAge('1990-06-15', null)).toBe(35);
    });

    it('should handle birthday already occurred this year', () => {
      expect(calculateAge('1990-01-15', null)).toBe(36);
    });

    it('should handle birthday on current date', () => {
      expect(calculateAge('1990-03-14', null)).toBe(36);
    });
  });
});

describe('Format Helpers', () => {
  describe('formatRuntime', () => {
    it('should format minutes to hours and minutes', () => {
      expect(formatRuntime(135)).toBe('2h 15m');
      expect(formatRuntime(90)).toBe('1h 30m');
      expect(formatRuntime(180)).toBe('3h 0m');
    });

    it('should handle less than an hour', () => {
      expect(formatRuntime(45)).toBe('0h 45m');
      expect(formatRuntime(30)).toBe('0h 30m');
    });

    it('should return empty string for null input', () => {
      expect(formatRuntime(null)).toBe('');
    });

    it('should return empty string for 0', () => {
      expect(formatRuntime(0)).toBe('');
    });
  });

  describe('formatNumber', () => {
    it('should format billions with B suffix', () => {
      expect(formatNumber(2_300_000_000)).toBe('2.3B');
      expect(formatNumber(1_000_000_000)).toBe('1.0B');
    });

    it('should format millions with M suffix', () => {
      expect(formatNumber(2_300_000)).toBe('2M');
      expect(formatNumber(500_000)).toBe('500K');
    });

    it('should format thousands with K suffix', () => {
      expect(formatNumber(2_000)).toBe('2K');
      expect(formatNumber(1_000)).toBe('1K');
    });

    it('should return number as string for values less than 1000', () => {
      expect(formatNumber(999)).toBe('999');
      expect(formatNumber(500)).toBe('500');
      expect(formatNumber(0)).toBe('0');
    });
  });

  describe('getLanguageName', () => {
    it('should return language name for valid ISO codes', () => {
      expect(getLanguageName('en')).toBe('English');
      expect(getLanguageName('es')).toBe('Spanish');
      expect(getLanguageName('fr')).toBe('French');
      expect(getLanguageName('de')).toBe('German');
      expect(getLanguageName('ja')).toBe('Japanese');
      expect(getLanguageName('ko')).toBe('Korean');
    });

    it('should return empty string for empty input', () => {
      expect(getLanguageName('')).toBe('');
    });

    it('should return the code back for invalid codes', () => {
      // Intl.DisplayNames returns the input code if it's not recognized
      expect(getLanguageName('invalid')).toBe('invalid');
    });
  });
});
