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
    title: "Dune: Part Two",
    poster: "https://image.tmdb.org/t/p/w500/8b8R8l88Qje9dn9OE8PY05Nez7S.jpg",
    genre: ["Sci-Fi", "Adventure"],
    language: "English",
    rating: 9.1,
    releaseDate: "2026-02-14",
    duration: "2h 45m",
  },
  {
    id: 2,
    title: "Oppenheimer",
    poster: "https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg",
    genre: ["Drama", "Thriller"],
    language: "English",
    rating: 8.4,
    releaseDate: "2026-01-28",
    duration: "3h 00m",
  },
  {
    id: 3,
    title: "Spider-Man: Across the Spider-Verse",
    poster: "https://image.tmdb.org/t/p/w500/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg",
    genre: ["Action", "Sci-Fi"],
    language: "English",
    rating: 8.7,
    releaseDate: "2026-02-07",
    duration: "2h 20m",
  },
  {
    id: 4,
    title: "Animal",
    poster: "https://image.tmdb.org/t/p/w500/hr9rjRMuNGCa0En1gBqJGKo5lU5.jpg",
    genre: ["Action", "Drama"],
    language: "Hindi",
    rating: 7.8,
    releaseDate: "2026-02-01",
    duration: "3h 21m",
  },
  {
    id: 5,
    title: "John Wick: Chapter 4",
    poster: "https://image.tmdb.org/t/p/w500/vZloFAK7NmvMGKE7LsyBGSbwWfP.jpg",
    genre: ["Action", "Thriller"],
    language: "English",
    rating: 7.9,
    releaseDate: "2026-01-20",
    duration: "2h 49m",
  },
  {
    id: 6,
    title: "Parasite",
    poster: "https://image.tmdb.org/t/p/w500/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg",
    genre: ["Thriller", "Drama"],
    language: "Korean",
    rating: 9.0,
    releaseDate: "2026-02-10",
    duration: "2h 12m",
  },
];

export const recommendedMovies: Movie[] = [
  {
    id: 7,
    title: "The Conjuring",
    poster: "https://image.tmdb.org/t/p/w500/wVYREutTvI2tmxr6ujrHT704wGF.jpg",
    genre: ["Horror", "Mystery"],
    language: "English",
    rating: 7.6,
    releaseDate: "2026-01-15",
    duration: "1h 52m",
  },
  {
    id: 8,
    title: "Jailer",
    poster: "https://image.tmdb.org/t/p/w500/hTmPkv69WkBJhsOSa0gBQb32hOG.jpg",
    genre: ["Comedy", "Action"],
    language: "Tamil",
    rating: 7.4,
    releaseDate: "2026-02-05",
    duration: "2h 48m",
  },
  {
    id: 9,
    title: "Interstellar",
    poster: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
    genre: ["Sci-Fi", "Adventure"],
    language: "English",
    rating: 8.9,
    releaseDate: "2026-02-12",
    duration: "2h 49m",
  },
  {
    id: 10,
    title: "Jawan",
    poster: "https://image.tmdb.org/t/p/w500/jFt1gS4BGHlK8xt76Y81Alp4dbt.jpg",
    genre: ["Action", "Thriller"],
    language: "Hindi",
    rating: 7.2,
    releaseDate: "2026-01-25",
    duration: "2h 49m",
  },
  {
    id: 11,
    title: "The Lord of the Rings: The Return of the King",
    poster: "https://image.tmdb.org/t/p/w500/rCzpDGLbOoPwLjy3OAm5NUPOTrC.jpg",
    genre: ["Fantasy", "Adventure"],
    language: "English",
    rating: 8.9,
    releaseDate: "2026-02-08",
    duration: "3h 21m",
  },
  {
    id: 12,
    title: "Ghost in the Shell",
    poster: "https://image.tmdb.org/t/p/w500/9gC88zYUBbuGgi7cvNlIiIVR01y.jpg",
    genre: ["Action", "Sci-Fi"],
    language: "Japanese",
    rating: 7.5,
    releaseDate: "2026-01-30",
    duration: "1h 23m",
  },
];

export const allGenres = ["Action", "Adventure", "Comedy", "Drama", "Fantasy", "Horror", "Mystery", "Romance", "Sci-Fi", "Thriller"];
export const allLanguages = ["English", "Hindi", "Tamil", "Korean", "Japanese"];
