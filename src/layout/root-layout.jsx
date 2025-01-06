import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar"; // Navbar 컴포넌트 import
import Sidebar from "../components/sidebar"; // Sidebar 컴포넌트 import
import styled from 'styled-components';

// Styled Components
const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const MainContent = styled.div`
  display: flex;
  flex-grow: 1;
`;

const SidebarContainer = styled.div`
  width: 200px;
  background-color: #f4f4f4;
`;

const ContentContainer = styled.div`
  flex-grow: 1;
  padding: 20px;
`;

const RootLayout = () => {
  return (
    <LayoutContainer>
      <Navbar /> {/* 최상단에 네비게이션 바 */}
      <MainContent>
        <SidebarContainer>
          <Sidebar /> {/* 사이드바 */}
        </SidebarContainer>
        <ContentContainer>
          <Outlet /> {/* 현재 경로에 해당하는 페이지가 이곳에 렌더링 됩니다 */}
        </ContentContainer>
      </MainContent>
    </LayoutContainer>
  );
};

export default RootLayout;
