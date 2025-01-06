import React from 'react';
import styled from 'styled-components';
import {Link, useNavigate} from 'react-router-dom';

const MovieList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;

const MovieCardWrapper = styled.div`
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
  border-radius: 15px;
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

  ${MovieCardWrapper}:hover & {
    display: flex;
  }
`;

const MovieTitle = styled.h3`
  color: white;
  font-size: 1rem;
  margin: 5px 0 5px 0;
  padding-left:5px;
`;

const MovieReleaseDate = styled.p`
  color: white;
  font-size: 0.8rem;
  margin: 0;
  padding: 0 0 5px 5px;
  font-weight:bold;
`;

const MovieCard=({movie})=> {
  const navigate = useNavigate();

  const moveToDetailPage= () =>{
    navigate(`/movies/${movie.id}`);
  };
  
  return (
    <MovieCardWrapper>
        {/*Link를 사용해 상세 페이지로 이동*/}
        <Link to ={`/movies/${movie.id}`}>
        <MoviePoster 
        src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
        alt={movie.title}
        />
        <Overlay></Overlay>
        <MovieTitle>{movie.title}</MovieTitle>
        <MovieReleaseDate>{movie.release_date}</MovieReleaseDate>
        </Link>
    </MovieCardWrapper>
  );

};

const MovieCardList = ({ movies, loading, error }) => {
  if (loading) {
    return <div>Loading movies...</div>; // 로딩 중일 때 표시할 내용
  }

  if (error) {
    return <div>{error}</div>; // 에러 발생 시 표시할 내용
  }

  if (!movies || movies.length === 0) {
    return <div>No movies available</div>; // 영화 데이터가 없을 때
  }

  return (
    <MovieList>
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </MovieList>
  );
};


export {MovieCard,MovieCardList};