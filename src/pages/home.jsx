import React, { useState, useEffect } from "react";
import { MOVIES } from "../mocks/movies"; // 영화 데이터 import
import styled from 'styled-components';

// Styled Components
const MovieList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;

const MovieCard = styled.div`
  background-color: #4e4c4c;

  border-radius: 15px;
  width: 200px;

  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.05);
  }
`;

const MoviePoster = styled.img`
  width: 100%;
  height:282px;
  border-radius:15px;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: none;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 1.5rem;
  border-radius:15px;

  ${MovieCard}:hover & {
    display: flex;
  }
`;

const MovieTitle = styled.h3`
  color: white;
  font-size: 1rem;
  margin: 10px 0 5px 0;
  font-weight:bold;
  padding-left:5px;
`;

const MovieReleaseDate = styled.p`
  color: white;
  font-size: 0.8rem;
  margin: 0;
  font-weight:bold;
  padding: 0 0 5px 5px;
`;

const HomePage = () => {
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

export default HomePage;