"use client";

interface Movie {
  id: number;
  title?: string;
  name?: string;
  poster_path?: string;
  backdrop_path?: string;
}

interface TopPicksSectionProps {
  movies: Movie[];
  title?: string;
  mediaType: "movie" | "tv";
}

export default function TopPicksSection({ movies, title = "Top 10 in Egypt Today", mediaType }: TopPicksSectionProps) {
  const topMovies = movies.slice(0, 10);

  return (
    <div className="py-6 md:py-8">
      <div className="container">
        <h2 className="text-xl md:text-2xl font-bold text-white mb-4 md:mb-6">
          {title}
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 md:gap-3">
          {topMovies.map((movie, index) => {
            const imageUrl = movie.poster_path
              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
              : "/Netflix_Symbol_RGB.png";
            const detailsUrl = mediaType === "movie" 
              ? `/movie/${movie.id}` 
              : `/tv/${movie.id}`;

            return (
              <a href={detailsUrl} key={movie.id}>
                <div className="relative group cursor-pointer">
                  {/* Number Badge */}
                  <div className="absolute -left-2 md:-left-4 -bottom-2 md:-bottom-3 z-10">
                    <div className="relative">
                      <span className="text-6xl md:text-8xl lg:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-b from-gray-800 to-black" style={{ WebkitTextStroke: "2px #ddd" }}>
                        {index + 1}
                      </span>
                    </div>
                  </div>
                  
                  {/* Image */}
                  <div className="relative aspect-[2/3] overflow-hidden rounded">
                    <img
                      src={imageUrl}
                      alt={movie.title || movie.name || ""}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300"></div>
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}
