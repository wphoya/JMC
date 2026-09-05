import { HashRouter, Routes, Route } from 'react-router-dom'; // 💡 BrowserRouter 대신 HashRouter 사용
import UserPage from './pages/UserPage';
import AdminPage from './pages/AdminPage';

function App() {
  return (
    /* HashRouter를 쓰면 깃허브 하위 경로 꼬임 문제(basename)가 원천 차단됩니다. */
    <HashRouter>
      <Routes>
        {/* 일반 주소: https://github.io */}
        <Route path="/" element={<UserPage />} />
        
        {/* 관리자 주소: https://github.io#/admin */}
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </HashRouter>
  );
}

export default App;