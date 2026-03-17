import { describe, it, expect } from 'vitest';
import { filterKeyCrew } from '../filterKeyCrew';
import { extractKeywords } from '../extractKeywords';
import { extractWatchProviders } from '../extractWatchProviders';
import { getKnownForItems } from '../getKnownForItems';

describe('Data Processing', () => {
  describe('filterKeyCrew', () => {
    it('should filter crew to only key jobs', () => {
      const crew = [
        { id: 1, name: 'Director', job: 'Director', department: 'Directing', profile_path: null },
        { id: 2, name: 'Gaffer', job: 'Gaffer', department: 'Lighting', profile_path: null },
        { id: 3, name: 'Producer', job: 'Producer', department: 'Production', profile_path: null },
      ];
      const result = filterKeyCrew(crew);
      expect(result).toHaveLength(2);
      expect(result.map(m => m.job)).toEqual(['Director', 'Producer']);
    });

    it('should remove duplicates by job keeping first occurrence', () => {
      const crew = [
        { id: 1, name: 'Director 1', job: 'Director', department: 'Directing', profile_path: null },
        { id: 2, name: 'Director 2', job: 'Director', department: 'Directing', profile_path: null },
        { id: 3, name: 'Producer', job: 'Producer', department: 'Production', profile_path: null },
      ];
      const result = filterKeyCrew(crew);
      expect(result).toHaveLength(2);
      expect(result[0].name).toBe('Director 1');
    });

    it('should return empty array for empty input', () => {
      expect(filterKeyCrew([])).toEqual([]);
    });

    it('should include all key crew jobs', () => {
      const crew = [
        { id: 1, name: 'Director', job: 'Director', department: 'Directing', profile_path: null },
        { id: 2, name: 'Writer', job: 'Writer', department: 'Writing', profile_path: null },
        { id: 3, name: 'Editor', job: 'Editor', department: 'Editing', profile_path: null },
        { id: 4, name: 'Composer', job: 'Original Music Composer', department: 'Sound', profile_path: null },
      ];
      const result = filterKeyCrew(crew);
      expect(result).toHaveLength(4);
    });
  });

  describe('extractKeywords', () => {
    it('should extract keyword names from TV show keywords', () => {
      const keywordsData = {
        results: [
          { name: 'action', id: 1 },
          { name: 'adventure', id: 2 },
          { name: 'sci-fi', id: 3 },
        ],
      };
      expect(extractKeywords(keywordsData as any)).toEqual(['action', 'adventure', 'sci-fi']);
    });

    it('should return empty array for null results', () => {
      expect(extractKeywords({ results: null } as any)).toEqual([]);
    });

    it('should return empty array for undefined results', () => {
      expect(extractKeywords({ results: undefined } as any)).toEqual([]);
    });

    it('should return empty array for empty results', () => {
      expect(extractKeywords({ results: [] } as any)).toEqual([]);
    });

    it('should return empty array for null input', () => {
      expect(extractKeywords(null as any)).toEqual([]);
    });
  });

  describe('extractWatchProviders', () => {
    it('should extract US watch providers', () => {
      const tvShow = {
        watch_providers: {
          US: {
            flatrate: [
              { provider_id: 8, logo_path: '/path1.png', provider_name: 'Netflix' },
            ],
            rent: [
              { provider_id: 2, logo_path: '/path2.png', provider_name: 'Apple TV' },
            ],
          },
        },
      };
      const result = extractWatchProviders(tvShow as any);
      expect(result).toHaveLength(2);
      expect(result[0]).toEqual({
        id: 8,
        name: 'Netflix',
        logo_path: '/path1.png',
        provider_type: 'Subscription',
      });
      expect(result[1]).toEqual({
        id: 2,
        name: 'Apple TV',
        logo_path: '/path2.png',
        provider_type: 'Rent',
      });
    });

    it('should handle all provider types', () => {
      const tvShow = {
        watch_providers: {
          US: {
            flatrate: [{ provider_id: 8, logo_path: '/n.png', provider_name: 'Netflix' }],
            rent: [{ provider_id: 2, logo_path: '/a.png', provider_name: 'Apple TV' }],
            buy: [{ provider_id: 10, logo_path: '/g.png', provider_name: 'Google Play' }],
            free: [{ provider_id: 200, logo_path: '/t.png', provider_name: 'Tubi' }],
          },
        },
      };
      const result = extractWatchProviders(tvShow as any);
      expect(result).toHaveLength(4);
      expect(result.map(p => p.provider_type)).toEqual(['Subscription', 'Rent', 'Buy', 'Free']);
    });

    it('should return empty array when no US providers', () => {
      const tvShow = { watch_providers: {} };
      expect(extractWatchProviders(tvShow as any)).toEqual([]);
    });

    it('should return empty array when watch_providers is undefined', () => {
      const tvShow = {};
      expect(extractWatchProviders(tvShow as any)).toEqual([]);
    });
  });

  describe('getKnownForItems', () => {
    it('should combine and sort cast and crew by popularity', () => {
      const cast = [
        { id: 1, name: 'Movie 1', poster_path: '/p1.jpg', popularity: 100, vote_average: 7 },
        { id: 2, name: 'Movie 2', poster_path: '/p2.jpg', popularity: 50, vote_average: 8 },
      ];
      const crew = [
        { id: 3, name: 'Movie 3', poster_path: '/p3.jpg', popularity: 75, vote_average: 6 },
      ];
      const result = getKnownForItems(cast as any, crew as any);
      expect(result).toHaveLength(3);
      expect(result[0].name).toBe('Movie 1');
      expect(result[1].name).toBe('Movie 3');
      expect(result[2].name).toBe('Movie 2');
    });

    it('should filter out items without posters', () => {
      const cast = [
        { id: 1, name: 'Movie 1', poster_path: '/p1.jpg', popularity: 100, vote_average: 7 },
        { id: 2, name: 'Movie 2', poster_path: null, popularity: 50, vote_average: 8 },
      ];
      const result = getKnownForItems(cast as any, []);
      expect(result).toHaveLength(1);
      expect(result[0].name).toBe('Movie 1');
    });

    it('should return top 12 items', () => {
      const cast = Array.from({ length: 20 }, (_, i) => ({
        id: i,
        name: `Movie ${i}`,
        poster_path: '/p.jpg',
        popularity: 100 - i,
        vote_average: 7,
      }));
      const result = getKnownForItems(cast as any, []);
      expect(result).toHaveLength(12);
    });

    it('should sort by vote average when popularity is equal', () => {
      const cast = [
        { id: 1, name: 'Movie 1', poster_path: '/p1.jpg', popularity: 100, vote_average: 6 },
        { id: 2, name: 'Movie 2', poster_path: '/p2.jpg', popularity: 100, vote_average: 8 },
        { id: 3, name: 'Movie 3', poster_path: '/p3.jpg', popularity: 100, vote_average: 7 },
      ];
      const result = getKnownForItems(cast as any, []);
      expect(result[0].name).toBe('Movie 2');
      expect(result[1].name).toBe('Movie 3');
      expect(result[2].name).toBe('Movie 1');
    });

    it('should return empty array for empty input', () => {
      expect(getKnownForItems([], [])).toEqual([]);
    });
  });
});
