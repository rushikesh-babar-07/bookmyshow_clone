import { motion, AnimatePresence } from "framer-motion";
import { SlidersHorizontal, X } from "lucide-react";
import { allGenres, allLanguages } from "@/data/movies";

interface FilterBarProps {
  selectedGenres: string[];
  selectedLanguages: string[];
  onToggleGenre: (genre: string) => void;
  onToggleLanguage: (language: string) => void;
  onClearAll: () => void;
}

const FilterBar = ({
  selectedGenres,
  selectedLanguages,
  onToggleGenre,
  onToggleLanguage,
  onClearAll,
}: FilterBarProps) => {
  const hasFilters = selectedGenres.length > 0 || selectedLanguages.length > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="glass-card p-5 sm:p-6 mb-12"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2 text-foreground">
          <SlidersHorizontal className="w-4 h-4 text-primary" />
          <span className="font-display font-semibold text-sm">Filters</span>
        </div>
        <AnimatePresence>
          {hasFilters && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={onClearAll}
              className="text-xs text-primary hover:text-primary/80 transition-colors flex items-center gap-1"
            >
              <X className="w-3 h-3" /> Clear All
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      <div className="mb-4">
        <p className="text-xs text-muted-foreground mb-2 uppercase tracking-wider">Genre</p>
        <div className="flex flex-wrap gap-2">
          {allGenres.map((genre) => (
            <button
              key={genre}
              onClick={() => onToggleGenre(genre)}
              className={`filter-chip ${
                selectedGenres.includes(genre) ? "filter-chip-active" : "filter-chip-inactive"
              }`}
            >
              {genre}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="text-xs text-muted-foreground mb-2 uppercase tracking-wider">Language</p>
        <div className="flex flex-wrap gap-2">
          {allLanguages.map((lang) => (
            <button
              key={lang}
              onClick={() => onToggleLanguage(lang)}
              className={`filter-chip ${
                selectedLanguages.includes(lang) ? "filter-chip-active" : "filter-chip-inactive"
              }`}
            >
              {lang}
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default FilterBar;
