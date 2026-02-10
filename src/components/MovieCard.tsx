import { motion } from "framer-motion";
import { Star, Ticket } from "lucide-react";
import type { Movie } from "@/data/movies";

const getRatingClass = (rating: number) => {
  if (rating >= 8) return "rating-high";
  if (rating >= 7) return "rating-medium";
  return "rating-low";
};

interface MovieCardProps {
  movie: Movie;
  index: number;
}

const MovieCard = ({ movie, index }: MovieCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="group relative"
    >
      <div className="glass-card overflow-hidden transition-all duration-500 hover:glow-gold hover:border-primary/30 hover:-translate-y-2">
        {/* Poster */}
        <div className="relative aspect-[2/3] overflow-hidden">
          <img
            src={movie.poster}
            alt={movie.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Rating Badge */}
          <div className="absolute top-3 right-3">
            <span className={`rating-badge ${getRatingClass(movie.rating)}`}>
              <Star className="w-3 h-3 fill-current" />
              {movie.rating}
            </span>
          </div>

          {/* Book Button on hover */}
          <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
            <button className="w-full gold-gradient text-primary-foreground py-2.5 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
              <Ticket className="w-4 h-4" />
              Book Tickets
            </button>
          </div>
        </div>

        {/* Info */}
        <div className="p-4">
          <h3 className="font-display font-semibold text-foreground text-base mb-2 truncate">
            {movie.title}
          </h3>
          <div className="flex flex-wrap gap-1.5 mb-3">
            {movie.genre.map((g) => (
              <span
                key={g}
                className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground"
              >
                {g}
              </span>
            ))}
          </div>
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>{movie.language}</span>
            <span>{movie.duration}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default MovieCard;
