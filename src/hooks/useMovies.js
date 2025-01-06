import { useState, useEffect } from 'react';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

const useMovies = (moviesData) => {
  const [movies, setMovies] = useState([]); // 영화 데이터 가져오기, 가져온 데이터를 상태로 설정 
  const [loading, setLoading] = useState(true);  // 로딩 상태
  const [error, setError] = useState(null);      // 에러 상태

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        // 데이터를 로딩하는 중이므로 로딩 상태를 true로 설정
        setLoading(true);
        setError(null); // 에러 초기화

        // 영화 데이터를 설정
        if (moviesData && moviesData.results) {
          setMovies(moviesData.results);
          // moviesData가 존재하고, 그 안에 results 필드가 있다면 이를 movies 상태에 설정
        }

      } catch (err) {
        // 에러가 발생하면 에러 상태 설정
        setError('Failed to fetch movies.');
      } finally {
        // 로딩이 끝났으므로 로딩 상태를 false로 설정
        setLoading(false);
      }
    };

    fetchMovies(); 
    // 비동기 함수 호출 -> js에서는 useEffect안에서 async 키워드를 직접 사용할 수 없다.
    // 비동기 함수는 useEffect 내부에서 따로 선언하고 호출해야 한다.

  }, [moviesData]);
  // useEffect가 두 번째 인자로 [moviesData]라는 배열을 받았음 
  // 이 배열에 있는 값(moviesData)이 변경될 때마다 useEffect 내부의 함수가 다시 실행된다

  return { movies, loading, error };
};

export default useMovies; 