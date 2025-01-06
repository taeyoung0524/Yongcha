import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { MovieCardList } from '../components/MovieCard';
import styled from 'styled-components';
import LoadingSpinner from '../components/loadingspinner';

const MovieGridContainer = styled.div`
  margin-top: 30px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 8px;
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items:center;
  gap: 10px;
  margin-top: 20px;
  font-weight:bold;
`;

const ButtonStyled = styled.button`
  background-color: ${(props) => (props.disabled ? 'white' : '#D91656')};
  color: ${(props) => (props.disabled ?  'black' : 'white')};
  padding:10px 20px 10px 20px;
  border-radius:10px;
  font-weight:bold;
`


const fetchMovies = async (page) => {
  const response = await fetch(`https://api.themoviedb.org/3/movie/upcoming?language=ko&page=${page}`, {
    headers: {
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4MTQ2YWJkNTYyZjliMzk5MjBmMzczOWI2ZmQ2MDg5NCIsIm5iZiI6MTczMTM4NjQ3OC43NDEzMDA2LCJzdWIiOiI2NzAyYzMyZTc4MzBjMTMwMWU3ZDQ2YjAiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.WqCEfVlKtMTDGnhtGjGX2jnw2KMh-dvCRtoRlRKq8vs', 
      accept: 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch movies');
  }

  const data = await response.json();
  return data.results;
};

const UpComingPage = () => {
  const [page, setPage] = useState(1); // 페이지 상태 초기값을 1로 설정

  const { data: movies, isLoading, isError } = useQuery({
    queryKey: ['upComingMovies', page], // 페이지별 데이터 캐시를 위해 queryKey에 페이지 번호 포함
    queryFn: () => fetchMovies(page),
    keepPreviousData: true, // 페이지 변경 시 이전 데이터를 유지
  });

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 1)); // 0페이지로 이동할 수 없게 설정
  };

  if (isLoading) {
    return (
      <MovieGridContainer>
        <LoadingSpinner />
      </MovieGridContainer>
    );
  }

  if (isError) {
    return <h1>Failed to fetch movies.</h1>;
  }

  return (
    <div>
      <MovieCardList movies={movies} />
      <PaginationContainer>
        <ButtonStyled onClick={handlePreviousPage} disabled={page === 1}>
          이전
        </ButtonStyled>
        <span>{page} 페이지</span>
        <ButtonStyled onClick={handleNextPage}>다음</ButtonStyled>
      </PaginationContainer>
    </div>
  );
};

export default UpComingPage;
