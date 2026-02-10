export interface Movie {
  id: number;
  title: string;
  poster: string;
  genre: string[];
  language: string;
  rating: number;
  releaseDate: string;
  duration: string;
}

export const trendingMovies: Movie[] = [
  {
    id: 1,
    title: "Dune: Part Three",
    poster: "https://images.unsplash.com/photo-1534809027769-b00d750a6bac?w=400&h=600&fit=crop",
    genre: ["Sci-Fi", "Adventure"],
    language: "English",
    rating: 9.1,
    releaseDate: "2026-02-14",
    duration: "2h 45m",
  },
  {
    id: 2,
    title: "The Last Horizon",
    poster: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&h=600&fit=crop",
    genre: ["Drama", "Thriller"],
    language: "English",
    rating: 8.4,
    releaseDate: "2026-01-28",
    duration: "2h 12m",
  },
  {
    id: 3,
    title: "Neon Streets",
    poster: "https://images.unsplash.com/photo-1515634928627-2a4e0dae3ddf?w=400&h=600&fit=crop",
    genre: ["Action", "Sci-Fi"],
    language: "English",
    rating: 7.8,
    releaseDate: "2026-02-07",
    duration: "1h 58m",
  },
  {
    id: 4,
    title: "Midnight Bloom",
    poster: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400&h=600&fit=crop",
    genre: ["Romance", "Drama"],
    language: "Hindi",
    rating: 8.7,
    releaseDate: "2026-02-01",
    duration: "2h 20m",
  },
  {
    id: 5,
    title: "Shadow Protocol",
    poster: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=400&h=600&fit=crop",
    genre: ["Action", "Thriller"],
    language: "English",
    rating: 7.2,
    releaseDate: "2026-01-20",
    duration: "2h 05m",
  },
  {
    id: 6,
    title: "Echoes of Time",
    poster: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=400&h=600&fit=crop",
    genre: ["Sci-Fi", "Mystery"],
    language: "Korean",
    rating: 9.0,
    releaseDate: "2026-02-10",
    duration: "2h 30m",
  },
];

export const recommendedMovies: Movie[] = [
  {
    id: 7,
    title: "Crimson Valley",
    poster: "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?w=400&h=600&fit=crop",
    genre: ["Horror", "Mystery"],
    language: "English",
    rating: 7.6,
    releaseDate: "2026-01-15",
    duration: "1h 52m",
  },
  {
    id: 8,
    title: "Golden Hour",
    poster: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=400&h=600&fit=crop",
    genre: ["Comedy", "Romance"],
    language: "Tamil",
    rating: 8.1,
    releaseDate: "2026-02-05",
    duration: "2h 10m",
  },
  {
    id: 9,
    title: "Starfall",
    poster: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=400&h=600&fit=crop",
    genre: ["Sci-Fi", "Adventure"],
    language: "English",
    rating: 8.9,
    releaseDate: "2026-02-12",
    duration: "2h 35m",
  },
  {
    id: 10,
    title: "The Quiet Storm",
    poster: "https://images.unsplash.com/photo-1524712245354-2c4e5e7121c0?w=400&h=600&fit=crop",
    genre: ["Drama", "Thriller"],
    language: "Hindi",
    rating: 6.9,
    releaseDate: "2026-01-25",
    duration: "1h 48m",
  },
  {
    id: 11,
    title: "Aurora Rising",
    poster: "https://images.unsplash.com/photo-1509281373149-e957c6296406?w=400&h=600&fit=crop",
    genre: ["Fantasy", "Adventure"],
    language: "English",
    rating: 8.3,
    releaseDate: "2026-02-08",
    duration: "2h 22m",
  },
  {
    id: 12,
    title: "Circuit Breaker",
    poster: "https://images.unsplash.com/photo-1535016120720-40c646be5580?w=400&h=600&fit=crop",
    genre: ["Action", "Sci-Fi"],
    language: "Japanese",
    rating: 7.5,
    releaseDate: "2026-01-30",
    duration: "2h 00m",
  },
];

export const allGenres = ["Action", "Adventure", "Comedy", "Drama", "Fantasy", "Horror", "Mystery", "Romance", "Sci-Fi", "Thriller"];
export const allLanguages = ["English", "Hindi", "Tamil", "Korean", "Japanese"];
