import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import DetailPageNav from './DetailPageNav';

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    button: ({ children, className, ...props }: any) => (
      <button className={className} {...props}>
        {children}
      </button>
    ),
    div: ({ children, className, ...props }: any) => (
      <div className={className} {...props}>
        {children}
      </div>
    ),
  },
}));

describe('DetailPageNav', () => {
  const renderWithRouter = (initialPath: string, type: string, slugWithId: string) => {
    return render(
      <MemoryRouter initialEntries={[initialPath]}>
        <DetailPageNav type={type as 'movie' | 'tv' | 'person'} slugWithId={slugWithId} />
        <Routes>
          <Route path={`/${type}/:slug`} element={<div>Overview</div>} />
          <Route path={`/${type}/:slug/reviews`} element={<div>Reviews</div>} />
          <Route path={`/${type}/:slug/videos`} element={<div>Videos</div>} />
          <Route path={`/${type}/:slug/images`} element={<div>Images</div>} />
          <Route path={`/${type}/:slug/watch`} element={<div>Watch</div>} />
          <Route path={`/${type}/:slug/credits`} element={<div>Credits</div>} />
          <Route path={`/${type}/:slug/recommendations`} element={<div>More</div>} />
        </Routes>
      </MemoryRouter>
    );
  };

  describe('Movie Navigation', () => {
    it('should render all movie navigation items', () => {
      renderWithRouter('/movie/inception-123', 'movie', 'inception-123');

      expect(screen.getByLabelText('Navigate to Overview page')).toBeInTheDocument();
      expect(screen.getByLabelText('Navigate to Reviews page')).toBeInTheDocument();
      expect(screen.getByLabelText('Navigate to Videos page')).toBeInTheDocument();
      expect(screen.getByLabelText('Navigate to Images page')).toBeInTheDocument();
      expect(screen.getByLabelText('Navigate to Watch page')).toBeInTheDocument();
      expect(screen.getByLabelText('Navigate to Credits page')).toBeInTheDocument();
      expect(screen.getByLabelText('Navigate to More page')).toBeInTheDocument();
    });

    it('should highlight active navigation item', () => {
      renderWithRouter('/movie/inception-123/reviews', 'movie', 'inception-123');

      const reviewsButton = screen.getByLabelText('Navigate to Reviews page');
      expect(reviewsButton).toHaveClass('bg-red-600');
    });
  });

  describe('TV Show Navigation', () => {
    it('should render all TV show navigation items', () => {
      renderWithRouter('/tv/breaking-bad-456', 'tv', 'breaking-bad-456');

      expect(screen.getByLabelText('Navigate to Overview page')).toBeInTheDocument();
      expect(screen.getByLabelText('Navigate to Reviews page')).toBeInTheDocument();
      expect(screen.getByLabelText('Navigate to Videos page')).toBeInTheDocument();
      expect(screen.getByLabelText('Navigate to Images page')).toBeInTheDocument();
      expect(screen.getByLabelText('Navigate to Watch page')).toBeInTheDocument();
      expect(screen.getByLabelText('Navigate to Credits page')).toBeInTheDocument();
      expect(screen.getByLabelText('Navigate to More page')).toBeInTheDocument();
    });

    it('should use clapperboard icon for TV overview', () => {
      renderWithRouter('/tv/breaking-bad-456', 'tv', 'breaking-bad-456');

      const overviewButton = screen.getByLabelText('Navigate to Overview page');
      // The clapperboard icon should be present
      expect(overviewButton.innerHTML).toContain('svg');
    });
  });

  describe('Person Navigation', () => {
    it('should render person-specific navigation items', () => {
      renderWithRouter('/person/tom-hanks-789', 'person', 'tom-hanks-789');

      expect(screen.getByLabelText('Navigate to Overview page')).toBeInTheDocument();
      expect(screen.getByLabelText('Navigate to Movies page')).toBeInTheDocument();
      expect(screen.getByLabelText('Navigate to TV Shows page')).toBeInTheDocument();
      expect(screen.getByLabelText('Navigate to Photos page')).toBeInTheDocument();
    });

    it('should not show movie/TV-specific items for person', () => {
      renderWithRouter('/person/tom-hanks-789', 'person', 'tom-hanks-789');

      expect(screen.queryByLabelText('Navigate to Reviews page')).not.toBeInTheDocument();
      expect(screen.queryByLabelText('Navigate to Watch page')).not.toBeInTheDocument();
      expect(screen.queryByLabelText('Navigate to Credits page')).not.toBeInTheDocument();
      expect(screen.queryByLabelText('Navigate to More page')).not.toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('should have proper navigation role', () => {
      renderWithRouter('/movie/inception-123', 'movie', 'inception-123');

      const nav = screen.getByRole('navigation');
      expect(nav).toHaveAttribute('aria-label', 'Detail page navigation');
    });

    it('should set aria-current on active page', () => {
      renderWithRouter('/movie/inception-123/videos', 'movie', 'inception-123');

      const activeButton = screen.getByLabelText('Navigate to Videos page');
      expect(activeButton).toHaveAttribute('aria-current', 'page');
    });
  });

  describe('Responsive Design', () => {
    it('should render mobile navigation', () => {
      renderWithRouter('/movie/inception-123', 'movie', 'inception-123');

      // Mobile navigation should be present
      const mobileNav = document.querySelector('.md\\:hidden');
      expect(mobileNav).toBeInTheDocument();
    });
  });
});
