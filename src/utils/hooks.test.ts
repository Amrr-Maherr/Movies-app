import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useDebounce } from './useDebounce';

describe('Hooks', () => {
  describe('useDebounce', () => {
    beforeEach(() => {
      vi.useFakeTimers();
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    it('should return initial value immediately', () => {
      const { result } = renderHook(({ value }) => useDebounce(value, 300), {
        initialProps: { value: 'initial' },
      });

      expect(result.current).toBe('initial');
    });

    it('should debounce the value update', () => {
      const { result, rerender } = renderHook(({ value }) => useDebounce(value, 300), {
        initialProps: { value: 'initial' },
      });

      rerender({ value: 'updated' });

      // Value should not change immediately
      expect(result.current).toBe('initial');

      // Fast-forward timer
      act(() => {
        vi.advanceTimersByTime(300);
      });

      expect(result.current).toBe('updated');
    });

    it('should cancel previous timer on new value', () => {
      const { result, rerender } = renderHook(({ value }) => useDebounce(value, 300), {
        initialProps: { value: 'first' },
      });

      rerender({ value: 'second' });
      act(() => {
        vi.advanceTimersByTime(200);
      });

      rerender({ value: 'third' });
      act(() => {
        vi.advanceTimersByTime(200);
      });

      // Should still be 'first' because timers were cancelled
      expect(result.current).toBe('first');

      // Fast-forward remaining time
      act(() => {
        vi.advanceTimersByTime(100);
      });

      expect(result.current).toBe('third');
    });

    it('should handle different delay values', () => {
      const { result, rerender } = renderHook(({ value, delay }) => useDebounce(value, delay), {
        initialProps: { value: 'initial', delay: 500 },
      });

      rerender({ value: 'updated', delay: 500 });

      act(() => {
        vi.advanceTimersByTime(400);
      });

      expect(result.current).toBe('initial');

      act(() => {
        vi.advanceTimersByTime(100);
      });

      expect(result.current).toBe('updated');
    });

    it('should handle numeric values', () => {
      const { result, rerender } = renderHook(({ value }) => useDebounce(value, 300), {
        initialProps: { value: 1 },
      });

      rerender({ value: 2 });
      expect(result.current).toBe(1);

      act(() => {
        vi.advanceTimersByTime(300);
      });

      expect(result.current).toBe(2);
    });

    it('should handle object values', () => {
      const obj1 = { query: 'test1' };
      const obj2 = { query: 'test2' };

      const { result, rerender } = renderHook(({ value }) => useDebounce(value, 300), {
        initialProps: { value: obj1 },
      });

      rerender({ value: obj2 });
      expect(result.current).toBe(obj1);

      act(() => {
        vi.advanceTimersByTime(300);
      });

      expect(result.current).toBe(obj2);
    });
  });
});
