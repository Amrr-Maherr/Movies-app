import { TourConfig } from "../types";

export const HOME_TOUR: TourConfig = {
  id: "home",
  steps: [
    {
      element: ".hero-title",
      popover: {
        title: "Featured Today",
        description: "Discover the most popular movies and shows tailored just for you.",
        side: "bottom",
        align: "start",
      },
    },
    {
      element: ".hero-buttons",
      popover: {
        title: "Quick Actions",
        description: "Start watching instantly or save to your list for later.",
        side: "bottom",
        align: "start",
      },
    },
    {
      element: "[data-search-button]",
      popover: {
        title: "Find Your Favorites",
        description: "Looking for something specific? Search across our entire library.",
        side: "bottom",
        align: "end",
      },
    },
  ],
};

export const SUBSCRIPTION_WARNING_TOUR: TourConfig = {
  id: "home",
  steps: [
    {
      element: ".hero-content-wrapper",
      popover: {
        title: "Unlock Full Access",
        description: "You're currently in preview mode. To watch movies, TV shows, and access your list, you'll need to sign in and complete your subscription.",
        side: "bottom",
        align: "center",
      },
    },
    {
      element: "[data-auth-button]",
      popover: {
        title: "Get Started",
        description: "Click here to sign up or log in and choose your plan to unlock all features.",
        side: "bottom",
        align: "end",
      },
    },
  ],
};

export const MOVIE_DETAILS_TOUR: TourConfig = {
  id: "movie-details",
  steps: [
    {
      element: ".media-hero-content",
      popover: {
        title: "Movie Overview",
        description: "Get all the details, ratings, and runtime info at a glance.",
        side: "bottom",
        align: "start",
      },
    },
    {
      element: ".detail-nav-tabs",
      popover: {
        title: "More Content",
        description: "Explore episodes, trailers, and behind-the-scenes gallery.",
        side: "bottom",
        align: "center",
      },
    },
  ],
};

export const SEARCH_TOUR: TourConfig = {
  id: "search",
  steps: [
    {
      element: "input[type='text']",
      popover: {
        title: "Smart Search",
        description: "Search by title, actor, or genre. We'll find it for you.",
        side: "bottom",
        align: "start",
      },
    },
    {
      element: ".search-filters",
      popover: {
        title: "Refine Results",
        description: "Filter by movies, TV shows, or people to find exactly what you want.",
        side: "bottom",
        align: "center",
      },
    },
  ],
};

export const MOVIES_TOUR: TourConfig = {
  id: "movies",
  steps: [
    {
      element: ".movie-filters",
      popover: {
        title: "Browse by Genre",
        description: "Filter movies by your favorite genres like Action, Comedy, or Horror.",
        side: "bottom",
        align: "start",
      },
    },
    {
      element: ".media-grid",
      popover: {
        title: "Explore Library",
        description: "Hundreds of titles waiting for you. Hover over any card to see details.",
        side: "top",
        align: "center",
      },
    },
  ],
};

export const MY_LIST_TOUR: TourConfig = {
  id: "my-list",
  steps: [
    {
      element: ".my-list-container",
      popover: {
        title: "Your Personal Library",
        description: "Everything you've saved to watch later is right here.",
        side: "bottom",
        align: "start",
      },
    },
  ],
};

export const TOURS: Record<string, TourConfig> = {
  home: HOME_TOUR,
  "subscription-warning": SUBSCRIPTION_WARNING_TOUR,
  "movie-details": MOVIE_DETAILS_TOUR,
  "tv-details": MOVIE_DETAILS_TOUR,
  search: SEARCH_TOUR,
  movies: MOVIES_TOUR,
  "tv-shows": MOVIES_TOUR,
  "my-list": MY_LIST_TOUR,
};
