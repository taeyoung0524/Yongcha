import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';

// Styled Components for Navbar
const NavbarContainer = styled.nav`
  background-color: #333;
  color: white;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center; /* 세로 가운데 정렬 */
`;

const ButtonGroup = styled.div
  `display: flex;
  gap: 10px; /* 버튼 간의 간격 */
  margin-left: auto; /* 버튼을 오른쪽 끝으로 밀기 */
`;

const StyledButton = styled.button
 `background-color: #D91656;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #A31345;
  }
`;

const Navbar = () => {
  const[isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태 확인 
  const [nickname,setNickname] = useState(''); // 닉네임 상태 추가
  const navigate= useNavigate();

  const updateLoginStatus=()=>{
    // 로컬 스토리지에 accessToken이 있으면 로그인 상태로 설정 
    const accessToken = localStorage.getItem("accessToken");
    setIsLoggedIn(!!accessToken);
    // !!은 JavaScript에서 값을 boolean으로 변환해주는 방식이다. accessToken에 값이 존재하면 true
  
    if(accessToken){
      fetch("http://localhost:3000/user/me", {
        method:"GET",
        headers: {
          "Authorization": `Bearer ${accessToken}`,
          "Content-Type" : "application/json"
        }
      })
        .then(response=>response.json())
        .then(data=>{
          //이메일에서 '@' 앞 부분을 닉네임으로 추출
          const email = data.email;
          const nickname = email.split('@')[0];
          setNickname(nickname);
        })
        .catch(error=>console.error("유저 정보 불러오기 실패:",error));
    } 
    else{
      setNickname(''); // 닉네임 ' '으로 설정
    }
  };

  useEffect(() => {
    updateLoginStatus(); // 함수 호출

    window.addEventListener("loginStatusChanged",updateLoginStatus);
  
    return () =>window.removeEventListener("loginStatusChanged",updateLoginStatus);
  },[]);



  const handleLogout=() => {
    // 로그아웃 시 로컬 스토리지에서 토큰 제거 
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setIsLoggedIn(false); // 로그인 상태 업데이트 
    setNickname(''); // 로그아웃 시 닉네임 초기화   
    navigate('/login'); // 로그인 페이지로 이동
    window.dispatchEvent(new Event("loginStatusChanged"));
  };
  
  const handleLogin = (accessToken, refreshToken) => {
    localStorage.setItem("accessToken",accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    window.dispatchEvent(new Event("loginStatusChanged"));
    navigate('/');
  };

  return (
    <NavbarContainer>
      <Link to="/" style={{ color: '#D91656', textDecoration: 'none', fontWeight: 'bold'}}>YONGCHA</Link>
      <ButtonGroup>
        {isLoggedIn? (
          <>
            <span style={{color:'white', marginRight:'10px'}}>{nickname}님, 반갑습니다.</span>
            <StyledButton onClick={handleLogout}>로그아웃</StyledButton>
          </>
        ):(
          <>
            <Link to="/login" style={{ color: 'white', textDecoration: 'none' }}>
              <StyledButton>로그인</StyledButton>
            </Link>
            <Link to="/signup" style={{ color: 'white', textDecoration: 'none' }}>
              <StyledButton>회원가입</StyledButton>
            </Link>
          </>
        )}
      </ButtonGroup>
    </NavbarContainer>
  );
};

export default Navbar;