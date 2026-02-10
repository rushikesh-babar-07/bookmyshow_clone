import { useState, useMemo } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FilterBar from "@/components/FilterBar";
import MovieSection from "@/components/MovieSection";
import Footer from "@/components/Footer";
import { trendingMovies, recommendedMovies } from "@/data/movies";
import type { Movie } from "@/data/movies";

const filterMovies = (movies: Movie[], genres: string[], languages: string[]) => {
  return movies.filter((m) => {
    const genreMatch = genres.length === 0 || m.genre.some((g) => genres.includes(g));
    const langMatch = languages.length === 0 || languages.includes(m.language);
    return genreMatch && langMatch;
  });
};

const Index = () => {
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);

  const toggleGenre = (genre: string) =>
    setSelectedGenres((prev) =>
      prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre]
    );

  const toggleLanguage = (lang: string) =>
    setSelectedLanguages((prev) =>
      prev.includes(lang) ? prev.filter((l) => l !== lang) : [...prev, lang]
    );

  const clearAll = () => {
    setSelectedGenres([]);
    setSelectedLanguages([]);
  };

  const filteredTrending = useMemo(
    () => filterMovies(trendingMovies, selectedGenres, selectedLanguages),
    [selectedGenres, selectedLanguages]
  );

  const filteredRecommended = useMemo(
    () => filterMovies(recommendedMovies, selectedGenres, selectedLanguages),
    [selectedGenres, selectedLanguages]
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />

      <main className="container mx-auto px-4 sm:px-6 -mt-16 relative z-10 pb-8">
        <FilterBar
          selectedGenres={selectedGenres}
          selectedLanguages={selectedLanguages}
          onToggleGenre={toggleGenre}
          onToggleLanguage={toggleLanguage}
          onClearAll={clearAll}
        />

        <MovieSection
          title="🔥 Now Trending"
          subtitle="The hottest movies everyone's watching right now"
          movies={filteredTrending}
        />

        <MovieSection
          title="✨ Recommended for You"
          subtitle="Handpicked based on your taste"
          movies={filteredRecommended}
        />
      </main>

      <Footer />
    </div>
  );
};

export default Index;
