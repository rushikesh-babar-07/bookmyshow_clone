import { motion } from "framer-motion";
import MovieCard from "./MovieCard";
import type { Movie } from "@/data/movies";

interface MovieSectionProps {
  title: string;
  subtitle?: string;
  movies: Movie[];
}

const MovieSection = ({ title, subtitle, movies }: MovieSectionProps) => {
  if (movies.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-muted-foreground text-lg">No movies match your filters.</p>
      </div>
    );
  }

  return (
    <section className="mb-20">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="mb-8 flex items-end gap-4"
      >
        <div>
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground leading-tight">
            {title}
          </h2>
          {subtitle && (
            <p className="text-muted-foreground mt-1.5 text-sm tracking-wide">{subtitle}</p>
          )}
        </div>
        <div className="hidden md:block flex-1 h-px bg-gradient-to-r from-border to-transparent" />
      </motion.div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 md:gap-5">
        {movies.map((movie, i) => (
          <MovieCard key={movie.id} movie={movie} index={i} />
        ))}
      </div>
    </section>
  );
};

export default MovieSection;
