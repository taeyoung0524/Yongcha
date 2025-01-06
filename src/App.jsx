import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from './layout/root-layout.jsx'; // RootLayout 컴포넌트 import
import HomePage from './pages/home.jsx'; // HomePage 컴포넌트 import
import LoginPage from './pages/login.jsx';
import SearchPage from './pages/search.jsx';
import SignupPage from './pages/signup.jsx';
import CategoryPage from './pages/category.jsx';
import NowPlayingPage from './pages/now-playing.jsx';
import TopRatedPage from './pages/top-rated.jsx';
import UpComingPage from './pages/up-coming.jsx';
import PopularPage from './pages/popular.jsx';
import MovieDetail from './pages/MovieDetail';
import NotFound from "./pages/not-found";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

// 라우터 설정
const router = createBrowserRouter([
  {
    path: '/', // 루트 경로 (홈페이지)
    element: <RootLayout />, // 모든 페이지를 감싸는 레이아웃 컴포넌트
    errorElement:<NotFound/>,
    children: [
      { index:true, element: <HomePage /> }, // 홈 페이지
      { path: '/login', element: <LoginPage /> },
      { path: '/search', element: <SearchPage /> },
      { path: '/signup', element: <SignupPage /> },
      { path: '/category', element: <CategoryPage />},
      { path: '/now-playing',element: <NowPlayingPage/>},
      { path: '/popular', element:<PopularPage/>},
      { path: '/up-coming', element:<UpComingPage/>},
      { path: '/top-rated', element:<TopRatedPage/>},
      { path: '/movies/:movieId', element:<MovieDetail/>}
    ],
  },
]);

const queryClient = new QueryClient()

function App() {
  return ( 
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router}/>
      <ReactQueryDevtools initialIsOpen={false}/>
    </QueryClientProvider>
  )
}

export default App;
