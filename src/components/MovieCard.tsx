import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Star, Ticket, Film, Play } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import type { Movie } from "@/data/movies";

const getRatingClass = (rating: number) => {
  if (rating >= 8) return "rating-high";
  if (rating >= 7) return "rating-medium";
  return "rating-low";
};

const fallbackGradients = [
  "from-primary/30 via-card to-card",
  "from-accent/20 via-card to-card",
  "from-secondary via-card/90 to-card",
  "from-primary/20 via-accent/10 to-card",
];

interface MovieCardProps {
  movie: Movie;
  index: number;
}

const MovieCard = ({ movie, index }: MovieCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const navigate = useNavigate();
  const gradient = fallbackGradients[movie.id % fallbackGradients.length];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      whileHover={{ y: -8 }}
      className="group relative"
    >
      <div className="glass-card overflow-hidden transition-all duration-500 hover:glow-gold hover:border-gold-glow/30 hover:shadow-xl">
        {/* Poster */}
        <div className="relative aspect-[2/3] overflow-hidden">
          {/* Loading skeleton */}
          {!imageLoaded && !imageError && (
            <div className="absolute inset-0 z-10">
              <Skeleton className="w-full h-full rounded-none bg-muted/60" />
              <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent" />
            </div>
          )}

          {/* Fallback poster */}
          {imageError && (
            <div className={`absolute inset-0 z-10 bg-gradient-to-b ${gradient} flex flex-col items-center justify-center p-4 text-center gap-3`}>
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Film className="w-6 h-6 text-primary" />
              </div>
              <h4 className="font-display font-semibold text-foreground text-sm leading-snug line-clamp-2">
                {movie.title}
              </h4>
              <div className="flex flex-wrap justify-center gap-1">
                {movie.genre.map((g) => (
                  <span key={g} className="text-[9px] font-medium px-1.5 py-0.5 rounded-full bg-secondary/80 text-secondary-foreground uppercase tracking-wide">
                    {g}
                  </span>
                ))}
              </div>
            </div>
          )}

          {!imageError && (
            <img
              src={movie.poster}
              alt={movie.title}
              className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 ${
                imageLoaded ? "opacity-100" : "opacity-0"
              }`}
              loading="lazy"
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageError(true)}
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

          {/* Rating Badge */}
          <motion.div
            className="absolute top-3 right-3 z-20"
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
          >
            <span className={`rating-badge ${getRatingClass(movie.rating)} backdrop-blur-sm`}>
              <Star className="w-3 h-3 fill-current" />
              {movie.rating}
            </span>
          </motion.div>

          {/* Book Button on hover */}
          <div className="absolute bottom-4 left-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0 flex flex-col gap-2">
            <button
              onClick={() => navigate(`/book/${movie.id}`)}
              className="w-full gold-gradient text-primary-foreground py-2.5 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 hover:opacity-90 hover:scale-105 transition-all duration-300 shadow-lg"
            >
              <Ticket className="w-4 h-4" />
              Book Tickets
            </button>
            <a
              href={movie.trailerUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="w-full glass-card py-2 rounded-lg text-xs font-medium flex items-center justify-center gap-1.5 text-foreground hover:bg-card/80 hover:scale-105 transition-all duration-300"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              Watch Trailer
            </a>
          </div>
        </div>

        {/* Info */}
        <div className="p-4 space-y-2.5">
          <h3 className="font-display font-semibold text-foreground text-[15px] leading-snug truncate group-hover:text-primary transition-colors duration-300">
            {movie.title}
          </h3>
          <div className="flex flex-wrap gap-1.5">
            {movie.genre.map((g) => (
              <span
                key={g}
                className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-secondary/80 text-secondary-foreground tracking-wide uppercase"
              >
                {g}
              </span>
            ))}
          </div>
          <div className="flex items-center justify-between text-[11px] text-muted-foreground pt-0.5">
            <span className="font-medium">{movie.language}</span>
            <span>{movie.duration}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default MovieCard;
