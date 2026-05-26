import type { HeaderLink } from "@/layout/types";

/**
 * Header navigation links
 * Displayed in the main navigation bar
 */
export const HeaderLinks: HeaderLink[] = [
  { title: "nav.home", link: "/en" },
  { title: "nav.tvShows", link: "/en/tv-shows" },
  { title: "nav.movies", link: "/en/movies" },
  { title: "movies.nowPlaying", link: "/en/now-playing" },
  { title: "discover.kids", link: "/en/kids" },
  { title: "discover.newPopular", link: "/en/new-popular" },
  { title: "nav.myList", link: "/en/my-list" },
  { title: "discover.genres", link: "/en/genres" },
  { title: "discover.languages", link: "/en/browse/languages" },
  { title: "people.cast", link: "/en/actors" },
];
