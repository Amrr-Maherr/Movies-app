import type { HeaderLink } from "@/layout/types";

/**
 * Header navigation links
 * Displayed in the main navigation bar
 */
export const HeaderLinks: HeaderLink[] = [
  { title: "nav.home", link: "/" },
  { title: "nav.tvShows", link: "tv-shows" },
  { title: "nav.movies", link: "movies" },
  { title: "movies.nowPlaying", link: "/now-playing" },
  { title: "discover.kids", link: "kids" },
  { title: "discover.newPopular", link: "new-popular" },
  { title: "nav.myList", link: "my-list" },
  { title: "discover.genres", link: "genres" },
  { title: "discover.languages", link: "browse/languages" },
  { title: "people.cast", link: "/actors" },
];
