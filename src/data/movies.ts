export interface Movie {
  id: number;
  title: string;
  poster: string;
  genre: string[];
  language: string;
  rating: number;
  releaseDate: string;
  duration: string;
  trailerUrl: string;
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
    trailerUrl: "https://www.youtube.com/watch?v=Way9Dexny3w",
  },
  {
    id: 2,
    title: "The Dark Knight",
    poster: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911BTUgMe1St0x2.jpg",
    genre: ["Action", "Drama"],
    language: "English",
    rating: 9.0,
    releaseDate: "2026-01-28",
    duration: "2h 32m",
    trailerUrl: "https://www.youtube.com/watch?v=EXeTwQWrcwY",
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
    trailerUrl: "https://www.youtube.com/watch?v=shW9i6k8cB0",
  },
  {
    id: 4,
    title: "Inception",
    poster: "https://image.tmdb.org/t/p/w500/ljsZTbVsrQSqNgWeRnEkS0NcTvo.jpg",
    genre: ["Action", "Sci-Fi"],
    language: "English",
    rating: 8.8,
    releaseDate: "2026-02-01",
    duration: "2h 28m",
    trailerUrl: "https://www.youtube.com/watch?v=YoHD9XEInc0",
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
    trailerUrl: "https://www.youtube.com/watch?v=qEVUtrk8_B4",
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
    trailerUrl: "https://www.youtube.com/watch?v=5xH0HfJHsaY",
  },
];

export const recommendedMovies: Movie[] = [
  {
    id: 7,
    title: "The Shawshank Redemption",
    poster: "https://image.tmdb.org/t/p/w500/9cjIGRQL1TFgMSgQ0cOaU86IBYG.jpg",
    genre: ["Drama"],
    language: "English",
    rating: 9.3,
    releaseDate: "2026-01-15",
    duration: "2h 22m",
    trailerUrl: "https://www.youtube.com/watch?v=PLl99DlL6b4",
  },
  {
    id: 8,
    title: "RRR",
    poster: "https://image.tmdb.org/t/p/w500/nEufeZYoDBPKIRBnIEfBNjRiGBb.jpg",
    genre: ["Action", "Drama"],
    language: "Hindi",
    rating: 8.0,
    releaseDate: "2026-02-05",
    duration: "3h 07m",
    trailerUrl: "https://www.youtube.com/watch?v=f_vbAtFSEc0",
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
    trailerUrl: "https://www.youtube.com/watch?v=zSWdZVtXT7E",
  },
  {
    id: 10,
    title: "Avengers: Endgame",
    poster: "https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg",
    genre: ["Action", "Sci-Fi"],
    language: "English",
    rating: 8.4,
    releaseDate: "2026-01-25",
    duration: "3h 01m",
    trailerUrl: "https://www.youtube.com/watch?v=TcMBFSGVi1c",
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
    trailerUrl: "https://www.youtube.com/watch?v=r5X-hFf6Bwo",
  },
  {
    id: 12,
    title: "Your Name",
    poster: "https://image.tmdb.org/t/p/w500/q719jXXEhI1ihZBCaxJOGEEbcsD.jpg",
    genre: ["Drama", "Fantasy"],
    language: "Japanese",
    rating: 8.4,
    releaseDate: "2026-01-30",
    duration: "1h 46m",
    trailerUrl: "https://www.youtube.com/watch?v=xU47nhruN-Q",
  },
];

export const allGenres = ["Action", "Adventure", "Comedy", "Drama", "Fantasy", "Horror", "Mystery", "Romance", "Sci-Fi", "Thriller"];
export const allLanguages = ["English", "Hindi", "Tamil", "Korean", "Japanese"];
