import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import BackgroundVideo from './BackgroundVideo';
import type { Video } from '@/types';

// Mock the utility function
vi.mock('@/utils', () => ({
  getTrailerEmbedUrl: vi.fn(),
}));

const mockGetTrailerEmbedUrl = vi.mocked(getTrailerEmbedUrl);

describe('BackgroundVideo', () => {
  const mockVideo: Video = {
    id: 'video-1',
    key: 'abc123',
    name: 'Test Trailer',
    site: 'YouTube',
    type: 'Trailer',
    published_at: '2023-01-01',
    official: true,
  };

  const mockVideos = { results: [mockVideo] };
  const mockMediaId = 123;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render iframe when video URL is available', async () => {
    const embedUrl = 'https://www.youtube.com/embed/abc123?autoplay=1&mute=1';
    mockGetTrailerEmbedUrl.mockReturnValue(embedUrl);

    render(<BackgroundVideo videos={mockVideos} mediaId={mockMediaId} />);

    const iframe = screen.getByTitle('Background Video');
    expect(iframe).toBeInTheDocument();
    expect(iframe).toHaveAttribute('src', embedUrl);
  });

  it('should not render when video URL is null', () => {
    mockGetTrailerEmbedUrl.mockReturnValue(null);

    const { container } = render(
      <BackgroundVideo videos={mockVideos} mediaId={mockMediaId} />
    );

    expect(container.firstChild).toBeNull();
  });

  it('should not render when videos is undefined', () => {
    mockGetTrailerEmbedUrl.mockReturnValue(null);

    const { container } = render(
      <BackgroundVideo videos={undefined} mediaId={mockMediaId} />
    );

    expect(container.firstChild).toBeNull();
  });

  it('should not render when videos is null', () => {
    mockGetTrailerEmbedUrl.mockReturnValue(null);

    const { container } = render(
      <BackgroundVideo videos={null} mediaId={mockMediaId} />
    );

    expect(container.firstChild).toBeNull();
  });

  it('should not render when videos results is empty', () => {
    mockGetTrailerEmbedUrl.mockReturnValue(null);

    const { container } = render(
      <BackgroundVideo videos={{ results: [] }} mediaId={mockMediaId} />
    );

    expect(container.firstChild).toBeNull();
  });

  it('should have aria-hidden attribute', async () => {
    const embedUrl = 'https://www.youtube.com/embed/abc123';
    mockGetTrailerEmbedUrl.mockReturnValue(embedUrl);

    render(<BackgroundVideo videos={mockVideos} mediaId={mockMediaId} />);

    const iframe = screen.getByTitle('Background Video');
    expect(iframe).toHaveAttribute('aria-hidden', 'true');
  });

  it('should have allow attributes for autoplay and fullscreen', async () => {
    const embedUrl = 'https://www.youtube.com/embed/abc123';
    mockGetTrailerEmbedUrl.mockReturnValue(embedUrl);

    render(<BackgroundVideo videos={mockVideos} mediaId={mockMediaId} />);

    const iframe = screen.getByTitle('Background Video');
    expect(iframe).toHaveAttribute('allow', 'autoplay; encrypted-media; picture-in-picture');
    expect(iframe).toHaveAttribute('allowFullScreen');
  });

  it('should have loading="eager" for priority loading', async () => {
    const embedUrl = 'https://www.youtube.com/embed/abc123';
    mockGetTrailerEmbedUrl.mockReturnValue(embedUrl);

    render(<BackgroundVideo videos={mockVideos} mediaId={mockMediaId} />);

    const iframe = screen.getByTitle('Background Video');
    expect(iframe).toHaveAttribute('loading', 'eager');
  });

  it('should apply custom className when provided', async () => {
    const embedUrl = 'https://www.youtube.com/embed/abc123';
    mockGetTrailerEmbedUrl.mockReturnValue(embedUrl);
    const customClass = 'custom-video-class';

    render(
      <BackgroundVideo
        videos={mockVideos}
        mediaId={mockMediaId}
        className={customClass}
      />
    );

    await waitFor(() => {
      const container = screen.getByTitle('Background Video').parentElement;
      expect(container).toHaveClass(customClass);
    });
  });

  it('should reset video state when mediaId changes', async () => {
    const embedUrl = 'https://www.youtube.com/embed/abc123';
    mockGetTrailerEmbedUrl.mockReturnValue(embedUrl);

    const { rerender } = render(
      <BackgroundVideo videos={mockVideos} mediaId={mockMediaId} />
    );

    // Change mediaId
    rerender(<BackgroundVideo videos={mockVideos} mediaId={456} />);

    // Component should re-render with new mediaId
    const iframe = screen.getByTitle('Background Video');
    expect(iframe).toBeInTheDocument();
  });
});

// Import the mocked function
import { getTrailerEmbedUrl } from '@/utils';
