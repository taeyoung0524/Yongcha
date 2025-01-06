import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import CardListSkeleton from '../components/card-list-skeleton';
import styled from 'styled-components';

const MovieGridContainer = styled.div `
  margin-top:30px;
  display:grid;
  grid-template-columns : repeat(auto-fit, minmax(200px,1fr));
  gap:8px;
`

const fetchMovie = async(movieId) => {
    const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=8146abd562f9b39920f3739b6fd60894&language=ko-KR`);
    if(!response.ok){
        throw new Error('Failed to fetch movie details');
    }
    return response.json();
};

const fetchCast = async(movieId)=> {
    const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=8146abd562f9b39920f3739b6fd60894&language=ko-KR`);
    if(!response.ok){
        throw new Error('Failed to fetch cast details');
    }
    return response.json();
}   

const MovieDetail=() =>{
    const {movieId} = useParams();

    const {data:movie, isLoading:movieLoading, isError: movieError} = useQuery({
        queryKey:['movie',movieId],
        queryFn: () => fetchMovie(movieId),
    });

    const {data:castData, isLoading: castLoading, isError:castError} = useQuery({
        queryKey:['cast',movieId],
        queryFn: () => fetchCast(movieId),
    });

    const cast = castData? castData.cast : [];

    if(movieLoading || castLoading){
        return (
            <MovieGridContainer>
                <CardListSkeleton number={20}/>
            </MovieGridContainer>
        )
    }

    if(movieError||castError){
        return <h1>Error loading data</h1>;
    }
    
    return (
        <div style = {{ color: 'white'}}>
            <div style={{ display: 'flex', gap: '20px' }}>
                <img 
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                style={{ width: '300px', height: '450px' }}
                />
                <div style={{color:"white"}}>
                    <h1 style={{color:"#D91656"}}>{movie.title}</h1>
                    <p>평균 평점 : {movie.vote_average}</p>
                    <p>개봉일 : {movie.release_date}</p>
                    <p>{movie.runtime}분</p>
                    <p>{movie.overview}</p>
                </div>
            </div>

            <div style={{ marginTop: '40px' }}>
                <h2 style={{marginBottom:"10px"}}>감독/출연</h2>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px'}}>
                    {cast.map((member)=> (
                        <div key={member.id} style={{ textAlign: 'center' }}>
                            <img 
                            src={`https://image.tmdb.org/t/p/w200${member.profile_path}`}
                            alt={member.name}
                            style={{ width: '120px', height: '120px', borderRadius: '50%', border:"4px solid white"}}
                            onError={(event) => event.target.src = 'https://via.placeholder.com/120?text=%20'}
                            />
                            <p>{member.name}</p>
                            <p>{member.character}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MovieDetail;