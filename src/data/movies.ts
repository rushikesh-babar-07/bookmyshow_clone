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
    title: "Avengers: Endgame",
    poster: "https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg",
    genre: ["Action", "Sci-Fi"],
    language: "English",
    rating: 8.4,
    releaseDate: "2026-02-14",
    duration: "3h 01m",
    trailerUrl: "https://www.youtube.com/watch?v=TcMBFSGVi1c",
  },
  {
    id: 2,
    title: "Avengers: Infinity War",
    poster: "https://image.tmdb.org/t/p/w500/7WsyChQLEftFiDhRkZUHahFazEI.jpg",
    genre: ["Action", "Sci-Fi"],
    language: "English",
    rating: 8.4,
    releaseDate: "2026-01-28",
    duration: "2h 29m",
    trailerUrl: "https://www.youtube.com/watch?v=6ZfuNTqbHE8",
  },
  {
    id: 3,
    title: "Spider-Man: No Way Home",
    poster: "https://image.tmdb.org/t/p/w500/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg",
    genre: ["Action", "Adventure"],
    language: "English",
    rating: 8.2,
    releaseDate: "2026-02-07",
    duration: "2h 28m",
    trailerUrl: "https://www.youtube.com/watch?v=JfVOs4VSpmA",
  },
  {
    id: 4,
    title: "Black Panther",
    poster: "https://image.tmdb.org/t/p/w500/uxzzxijgPIY7slzFvMotPv8wjKA.jpg",
    genre: ["Action", "Adventure"],
    language: "English",
    rating: 7.3,
    releaseDate: "2026-02-01",
    duration: "2h 14m",
    trailerUrl: "https://www.youtube.com/watch?v=xjDjIWPwcPU",
  },
  {
    id: 5,
    title: "Guardians of the Galaxy Vol. 3",
    poster: "https://image.tmdb.org/t/p/w500/r2J02Z2OpNTctfOSN1Ydgii51I3.jpg",
    genre: ["Action", "Comedy"],
    language: "English",
    rating: 7.9,
    releaseDate: "2026-01-20",
    duration: "2h 30m",
    trailerUrl: "https://www.youtube.com/watch?v=u3V5KDHRQvk",
  },
  {
    id: 6,
    title: "Iron Man",
    poster: "https://image.tmdb.org/t/p/w500/78lPtwv72eTNqFW9COBYI0dWDJa.jpg",
    genre: ["Action", "Sci-Fi"],
    language: "English",
    rating: 7.9,
    releaseDate: "2026-02-10",
    duration: "2h 06m",
    trailerUrl: "https://www.youtube.com/watch?v=8ugaeA-nMTc",
  },
];

export const recommendedMovies: Movie[] = [
  {
    id: 7,
    title: "Thor: Ragnarok",
    poster: "https://image.tmdb.org/t/p/w500/rzRwTcFvttcN1ZpX2xv4j3tSdJu.jpg",
    genre: ["Action", "Comedy"],
    language: "English",
    rating: 7.9,
    releaseDate: "2026-01-15",
    duration: "2h 10m",
    trailerUrl: "https://www.youtube.com/watch?v=ue80QwXMRHg",
  },
  {
    id: 8,
    title: "Captain America: The Winter Soldier",
    poster: "https://image.tmdb.org/t/p/w500/tVFRpFw3xTedgPGqxW0AOv8Yp1I.jpg",
    genre: ["Action", "Thriller"],
    language: "English",
    rating: 7.7,
    releaseDate: "2026-02-05",
    duration: "2h 16m",
    trailerUrl: "https://www.youtube.com/watch?v=7SlILk2WMTI",
  },
  {
    id: 9,
    title: "Doctor Strange in the Multiverse of Madness",
    poster: "https://image.tmdb.org/t/p/w500/9Gtg2DzBhmYamXBS1hKAhiwbBKS.jpg",
    genre: ["Action", "Fantasy"],
    language: "English",
    rating: 6.9,
    releaseDate: "2026-02-12",
    duration: "2h 06m",
    trailerUrl: "https://www.youtube.com/watch?v=aWzlQ2N6qqg",
  },
  {
    id: 10,
    title: "Captain America: Civil War",
    poster: "https://image.tmdb.org/t/p/w500/rAGiXaUfPzY7CDEyNKUofk3Kw2e.jpg",
    genre: ["Action", "Thriller"],
    language: "English",
    rating: 7.8,
    releaseDate: "2026-01-25",
    duration: "2h 27m",
    trailerUrl: "https://www.youtube.com/watch?v=dKrVegVI0Us",
  },
  {
    id: 11,
    title: "Guardians of the Galaxy",
    poster: "https://image.tmdb.org/t/p/w500/r7vmZjiyZw9rpJMQJdeasAliSfk.jpg",
    genre: ["Action", "Comedy"],
    language: "English",
    rating: 8.0,
    releaseDate: "2026-02-08",
    duration: "2h 01m",
    trailerUrl: "https://www.youtube.com/watch?v=d96cjJhvlMA",
  },
  {
    id: 12,
    title: "Spider-Man: Across the Spider-Verse",
    poster: "https://image.tmdb.org/t/p/w500/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg",
    genre: ["Action", "Sci-Fi"],
    language: "English",
    rating: 8.7,
    releaseDate: "2026-01-30",
    duration: "2h 20m",
    trailerUrl: "https://www.youtube.com/watch?v=shW9i6k8cB0",
  },
];

export const allGenres = ["Action", "Adventure", "Comedy", "Drama", "Fantasy", "Sci-Fi", "Thriller"];
export const allLanguages = ["English"];
