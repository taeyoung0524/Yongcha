import React, {useState, useEffect, useCallback} from 'react';
import styled from 'styled-components';
import {useNavigate, useSearchParams} from 'react-router-dom';
import CardListSkeleton from '../components/card-list-skeleton';
import {debounce} from 'lodash';

const SearchBox = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius:11px;
  overflow:hidden;
  margin-bottom:20px;
`;

const SearchInput = styled.input`
  width: 100%;
  height:50px;
  padding: 10px;
  font-size: 16px;
  color: black;
  background-color: white;
  font-weight:bold;

  &::placeholder {
    color: #c9d1d9;
  }
`;

const SearchButton = styled.button`
  padding: 10px;
  background-color: #D91656;
  color: white;
  cursor: pointer;
  font-size: 16px;
  width:100px;
  height:50px;
  font-weight:bold;

  &:hover {
    background-color: #A31345;
  }
`;

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

const ErrorText = styled.h1 `
  display:flex;
  justify-content:center;
  font-size:40px;
`

const MovieGridContainer = styled.div `
  margin-top:30px;
  display:grid;
  grid-template-columns : repeat(auto-fit, minmax(200px,1fr));
  gap:8px;
`

const SearchPage = () => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState('');
  const [searchParams, setSearchParams] = useSearchParams({
    mq:''
  })

  const mq= searchParams.get('mq');
  const [movies,setMovies] = useState('');
  const [loading, setLoading]= useState(false);
  const [error,setError] = useState(null);

  const fetchMovies = async(mq) => {
    const url = `https://api.themoviedb.org/3/search/movie?query=${mq}&include_adult=false&language=ko&page=1&api_key=8146abd562f9b39920f3739b6fd60894`;
    setLoading(true);
    setError(null);

    try{
      const response = await fetch(url);
      const data = await response.json();
      setMovies(data.results || []);
    } catch(error){
      console.error('에러 발생 :', error);
      setError('데이터를 불러오는 중 오류가 발생했습니다.');
    } finally{
      setLoading(false);
    }
  };

  const debouncedFetchMovies = useCallback(
    debounce((mq) => {
      console.log('debouncedFetchMovies 호출:', mq); // 디바운스 호출 시점 확인
      fetchMovies(mq);
    }, 500),
    []
  );
  // debouncedFetchMovies 는 searchValue가 변경될 때마다 호출되지만, 입력이 500ms 동안 멈출 때만 실제로 API 요청을 보내도록 함 
  // 500ms 동안 다시 debouncedFetchMovies가 호출되면, 이전의 타이머를 취소하고 다시 500ms 타이머를 설정함
  // useCallback -> 컴포넌트가 다시 렌더링될 때마다 새로운 함수가 생성되는 것 방지 -> 함수가 메모리에 한 번만 생성되어 리렌더링 시에도 동일한 함수 유지 
  
  const onChangeSearchValue = (event)=> {
    setSearchValue(event.target.value);
    // setSearchValue로 searchValue 상태 업데이트 
    debouncedFetchMovies(event.target.value);
    // onChangeSearchValue 함수에서 debouncedFetchMovies를 호출하여 입력이 멈추면 자동으로 API 요청을 보내도록 했음 
    
  }

  const handleSearchMovie =() => {
    if(mq===searchValue) return;
    navigate(`/search?mq=${searchValue}`);
    fetchMovies(searchValue);
  }

  const handleSearchMovieWithKeyboard=(e) => {
    if(e.key ==='Enter'){
      handleSearchMovie();
    }
  };

  useEffect(() => {
    if(mq) {
      setSearchValue(mq);
      fetchMovies(mq);
    }
  },[mq]);



  return (
    <div>
      <SearchBox>
        <SearchInput 
          type="text"
          placeholder="영화 제목을 입력하세요." 
          value={searchValue} 
          onChange={onChangeSearchValue}
          onKeyDown={handleSearchMovieWithKeyboard}
        />
        <SearchButton onClick = {handleSearchMovie}>검색</SearchButton>
      </SearchBox>
      <div>
        {loading ? (
          <MovieGridContainer>
            <CardListSkeleton number={20}/>
          </MovieGridContainer>
        ) : error ? (
          <div>{error}</div>
        ) : movies.length > 0 ? (
          <MovieList>
            {movies.map((movie) => (
              <MovieCard key={movie.id}>
                <MoviePoster
                  src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                  alt={movie.title}
                />
                <Overlay></Overlay>
                <MovieTitle>{movie.title}</MovieTitle>
                <MovieReleaseDate>{movie.release_date}</MovieReleaseDate>
              </MovieCard>
            ))}
          </MovieList>
        ) : (
          searchValue && (
            <>
              <ErrorText>해당하는 검색어 "{searchValue}"에</ErrorText>
              <ErrorText>해당하는 데이터가 없습니다.</ErrorText>
            </>
          )
        )}
      </div>
    </div>

    );
  };

export default SearchPage;