import React from "react";
import { MOVIES } from "./mocks/movies"; // 영화 데이터 import
import './App.css'; // CSS 파일 import (위의 CSS 코드가 여기에 포함되어야 함)

const MovieList = () => {
  const twoRowsOfMovies = MOVIES.results.slice(0, 20); // 영화 데이터 가져오기

  return (
    <div>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {twoRowsOfMovies.map((movie) => (
          <div key={movie.id} className="movie-container">
            <img
              className="movie-image"
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
            />
            <div className="overlay"></div> {/* 오버레이 추가 */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieList;