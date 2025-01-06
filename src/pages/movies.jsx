import React, { useState, useEffect } from "react";
import { MOVIES } from "../mocks/movies"; // 영화 데이터 import
import styled from 'styled-components';

// Styled Components

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    setMovies(MOVIES.results); // 영화 데이터를 MOVIES에서 가져오기
  }, []);

  return (
    <MovieList>
      {movies.map((movie) => (
        <MovieCard key={movie.id}>
          <MoviePoster
            src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
            alt={movie.title}
          />
          <Overlay></Overlay>
          <MovieTitle>{movie.title}</MovieTitle> {/* 제목 추가 */}
          <MovieReleaseDate>{movie.release_date}</MovieReleaseDate> {/* 개봉일 추가 */}
          
        </MovieCard>
      ))}
    </MovieList>
  );
};

export default MoviesPage;