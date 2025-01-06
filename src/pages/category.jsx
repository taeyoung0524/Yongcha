import React from "react";
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { NowPlaying } from "../movies/now-playing";
import { Popular } from "../movies/popular";
import { TopRated } from "../movies/top-rated";
import { UpComing } from "../movies/up-coming";
import { MOVIES } from "../mocks/movies";


const Group = styled.div `
  display:flex;
  justify-content:space-between;
`

const TitleGroup = styled.h1`
  padding-bottom:20px;
  color:white;
`

const PhotoCard = styled.div `
  position:relative;
`

const PhotoGroup = styled.img `
  width:300px;
  border-radius:20px;
  height:150px;
  display:flex;

`

const OverlayText = styled.div `
  position:absolute;
  bottom:10px;
  left:12px;
  background-color:rgba(0,0,0,0.5);
  color:white;
  padding:5px 10px;
  border-radius:5px;
  font-size:16px;

`

const CategoryPage = () => {
  return (
    <div>
      <TitleGroup>카테고리 페이지</TitleGroup>
      <Group>
        <Link to='/now-playing'>
        <PhotoCard>
          <PhotoGroup
            src={'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNDA5MTlfMTEy%2FMDAxNzI2NzA5Mjc4MTgy.z6hXlJ0lVCtqGpLhklijp9gXdbHCcsPPnn_9WJ6WE3Mg.9ZF5kjHMPZKxpEHAsVwFbE3TeKTToEc91QNK6pxPVsQg.JPEG%2F1726709267234.jpg&type=sc960_832'}
            alt="카테고리 이미지"
          />
          <OverlayText>현재 상영중인</OverlayText>
        </PhotoCard>
        </Link>
        <Link to='/popular'>
        <PhotoCard>
          <PhotoGroup
            src={'https://search.pstatic.net/common/?src=http%3A%2F%2Fimgnews.naver.net%2Fimage%2F293%2F2019%2F07%2F18%2F0000024551_001_20190718172419508.jpeg&type=sc960_832'}
          />
          <OverlayText>인기있는</OverlayText>
        </PhotoCard>
        </Link>
        <Link to='/top-rated'>
        <PhotoCard>
          <PhotoGroup
            src={'https://search.pstatic.net/common/?src=http%3A%2F%2Fimgnews.naver.net%2Fimage%2F5337%2F2020%2F10%2F05%2F0000108761_001_20201005140102027.jpg&type=sc960_832'}
            alt="카테고리 이미지"
          />
          <OverlayText>높은 평가를 받은</OverlayText>
        </PhotoCard>
        </Link>
        <Link to='/up-coming'>
        <PhotoCard>
          <PhotoGroup
            src={'https://search.pstatic.net/common/?src=http%3A%2F%2Fpost.phinf.naver.net%2FMjAyMDExMThfMTA0%2FMDAxNjA1Njc4OTk5OTM3.xStePeLg4yFl6mUTBfiLFzaXl8tOvJeIWbZQtfaQE9Qg.BV7CF2oIpi9DeyAT4RwkjPX1dX_3oM3hqf1Eie-ps78g.PNG%2FInXvrbn0muogN_PyDsKZH_uyUipY.jpg&type=sc960_832'}
            alt="카테고리 이미지"
          />
          <OverlayText>개봉 예정중인</OverlayText>
        </PhotoCard>
        </Link>
        </Group>
    </div>
  );
};

export default CategoryPage;