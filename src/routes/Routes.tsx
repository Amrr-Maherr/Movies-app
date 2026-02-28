import Home from "@/pages/Home";
import Actor from "@/pages/Actor";
import Movie from "@/pages/Movie";
import TVShow from "@/pages/TVShow";
import Session from "@/pages/Session";
import Kids from "@/pages/Kids";
import NewPopular from "@/pages/NewPopular";
import MyList from "@/pages/MyList";
import NotFound from "@/pages/NotFound";
import { Routes, Route } from "react-router-dom";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="/tv-shows" element={<TVShow />} />
      <Route path="/movies" element={<Movie />} />
      <Route path="/kids" element={<Kids />} />
      <Route path="/new-popular" element={<NewPopular />} />
      <Route path="/my-list" element={<MyList />} />
      <Route path="/actor" element={<Actor />} />
      <Route path="/session" element={<Session />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
