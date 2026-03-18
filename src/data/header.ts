import type { HeaderLink } from "@/types/header";

/**
 * Header navigation links
 * Displayed in the main navigation bar
 */
export const HeaderLinks: HeaderLink[] = [
  { title: "Home", link: "/" },
  { title: "TV Shows", link: "tv-shows" },
  { title: "Movies", link: "movies" },
  { title: "Now Playing", link: "/now-playing" },
  { title: "Kids", link: "kids" },
  { title: "New & Popular", link: "new-popular" },
  { title: "My List", link: "my-list" },
  { title: "Genres", link: "genres" },
  { title: "Browse by Languages", link: "browse/languages" },
  { title: "Actors", link: "/actors" },
];
